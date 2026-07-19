import logging
from typing import Sequence

import httpx

from config.settings import settings
from models.schemas import ChatHistoryMessage
from prompts.mentors import get_mentor_display_name, get_system_prompt

logger = logging.getLogger("convoai.gemini")

GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta"

SHARED_CONTEXT_NOTE_TEMPLATE = (
    "\n\nYou are one mentor among several in ConvoAI's shared Conversation "
    "Hall. The conversation history you're given may include turns from "
    "other mentors, each prefixed with their name in brackets, e.g. "
    "\"[Therapist]: ...\". Use that full history for context so the user "
    "never has to repeat themselves, but always reply only as yourself, "
    "{mentor_name}, in your own voice and area of expertise — never speak "
    "for another mentor."
)


class GeminiServiceError(Exception):
    """Raised when the Gemini API call fails or returns an unusable response."""


def _build_contents(
    message: str, history: Sequence[ChatHistoryMessage]
) -> list[dict]:
    """Turn shared conversation history into Gemini's alternating contents list.

    User turns map to Gemini's "user" role as-is. Mentor turns (which may
    have come from a different mentor than the one answering now) map to
    Gemini's "model" role, prefixed with the speaking mentor's name so the
    current mentor can tell who said what.
    """
    contents: list[dict] = []
    for turn in history:
        if turn.role == "user":
            contents.append({"role": "user", "parts": [{"text": turn.content}]})
        else:
            speaker = get_mentor_display_name(turn.mentor)
            contents.append(
                {"role": "model", "parts": [{"text": f"[{speaker}]: {turn.content}"}]}
            )

    contents.append({"role": "user", "parts": [{"text": message}]})
    return contents


async def generate_mentor_reply(
    mentor_id: str,
    message: str,
    history: Sequence[ChatHistoryMessage] | None = None,
) -> str:
    """Call Gemini Flash with the given mentor's system prompt and return the reply text.

    `history` is the shared, cross-mentor conversation so far (oldest
    first). Passing it lets every mentor stay aware of what the user asked
    other mentors and how they replied, without the user repeating themselves.
    """
    if not settings.gemini_api_key:
        raise GeminiServiceError("GEMINI_API_KEY is not configured on the server.")

    system_prompt = get_system_prompt(mentor_id) + SHARED_CONTEXT_NOTE_TEMPLATE.format(
        mentor_name=get_mentor_display_name(mentor_id)
    )
    url = f"{GEMINI_API_BASE}/models/{settings.gemini_model}:generateContent"

    payload = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": _build_contents(message, history or []),
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                url,
                params={"key": settings.gemini_api_key},
                json=payload,
            )
    except httpx.RequestError as exc:
        # This fires when no HTTP response was ever received — a
        # connection-layer failure (DNS, TLS handshake, connection refused,
        # or timeout) rather than anything Gemini returned. Logging the
        # concrete exception type/message here (instead of a generic string)
        # is what tells you which of those it is.
        logger.exception(
            "Gemini request failed before any response was received (%s)",
            type(exc).__name__,
        )
        raise GeminiServiceError(
            f"Could not reach Gemini API ({type(exc).__name__}): {exc}"
        ) from exc

    if response.status_code != 200:
        logger.error(
            "Gemini API returned %s: %s", response.status_code, response.text
        )
        raise GeminiServiceError(
            f"Gemini API returned {response.status_code}: {response.text}"
        )

    data = response.json()

    try:
        candidates = data["candidates"]
        parts = candidates[0]["content"]["parts"]
        text = "".join(part.get("text", "") for part in parts).strip()
    except (KeyError, IndexError) as exc:
        logger.exception("Gemini API returned an unexpected response shape: %s", data)
        raise GeminiServiceError(
            "Gemini API returned an unexpected response shape."
        ) from exc

    if not text:
        raise GeminiServiceError("Gemini API returned an empty response.")

    return text