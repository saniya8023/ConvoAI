import logging

import httpx

from config.settings import settings
from prompts.mentors import get_system_prompt

logger = logging.getLogger("convoai.gemini")

GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta"


class GeminiServiceError(Exception):
    """Raised when the Gemini API call fails or returns an unusable response."""


async def generate_mentor_reply(mentor_id: str, message: str) -> str:
    """Call Gemini Flash with the given mentor's system prompt and return the reply text."""
    if not settings.gemini_api_key:
        raise GeminiServiceError("GEMINI_API_KEY is not configured on the server.")

    system_prompt = get_system_prompt(mentor_id)
    url = f"{GEMINI_API_BASE}/models/{settings.gemini_model}:generateContent"

    payload = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"role": "user", "parts": [{"text": message}]}],
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