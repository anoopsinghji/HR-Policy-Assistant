from pydantic import BaseModel
from pydantic import Field


class ChatHistoryMessage(BaseModel):

    role: str

    message: str


class ChatRequest(BaseModel):

    question: str

    history: list[ChatHistoryMessage] = Field(default_factory=list)

    api_key: str | None = None

    model: str | None = None


class ChatResponse(BaseModel):

    answer: str

    sources: list[str]
