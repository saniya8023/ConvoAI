from fastapi import APIRouter, HTTPException

from models.schemas import ChatRequest, ChatResponse
from services.gemini_service import GeminiServiceError, generate_mentor_reply

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    try:
        reply = await generate_mentor_reply(
            payload.mentor, payload.message, payload.history
        )
    except GeminiServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    return ChatResponse(reply=reply)