from typing import Literal

from pydantic import BaseModel, Field

MentorId = Literal["career-mentor", "therapist", "startup-advisor", "study-coach"]


class HealthResponse(BaseModel):
    status: str = Field(examples=["ok"])
    app: str
    version: str
    environment: str


class ChatRequest(BaseModel):
    mentor: MentorId
    message: str = Field(min_length=1)


class ChatResponse(BaseModel):
    reply: str