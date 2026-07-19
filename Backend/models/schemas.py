from typing import Literal, Optional

from pydantic import BaseModel, Field

MentorId = Literal["career-mentor", "therapist", "startup-advisor", "study-coach"]


class HealthResponse(BaseModel):
    status: str = Field(examples=["ok"])
    app: str
    version: str
    environment: str


class ChatHistoryMessage(BaseModel):
    """A single turn in the shared Conversation Hall history.

    `mentor` identifies which mentor authored a "mentor" turn (None for
    "user" turns) so the model can be told who said what.
    """

    mentor: Optional[MentorId] = None
    role: Literal["user", "mentor"]
    content: str = Field(min_length=1)


class ChatRequest(BaseModel):
    mentor: MentorId
    message: str = Field(min_length=1)
    # Full shared conversation so far (across all mentors), oldest first.
    # Does not include `message` itself.
    history: list[ChatHistoryMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str