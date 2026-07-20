from fastapi import APIRouter
from fastapi import Header
from fastapi.responses import StreamingResponse

from core.dependencies import resolve_api_key
from schemas.chat import ChatRequest
from schemas.chat import ChatResponse
from services.rag_service import RAGService


router = APIRouter()


@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest,
    authorization: str | None = Header(default=None)
):

    try:

        api_key = resolve_api_key(
            authorization,
            request.api_key
        )

        model_name = request.model or "google/gemini-2.5-flash"

        rag = RAGService(
            api_key,
            model_name
        )

        return rag.ask(
            request.question,
            request.history
        )

    except Exception as error:
        print(f"Chat request failed: {error}")

        return ChatResponse(
            answer=(
                "I could not reach the AI service right now. "
                "Please check your internet connection, API key, or proxy settings, then try again."
            ),
            sources=[]
        )


@router.post("/chat/stream")
def stream_chat(
    request: ChatRequest,
    authorization: str | None = Header(default=None)
):

    api_key = resolve_api_key(
        authorization,
        request.api_key
    )

    model_name = request.model or "google/gemini-2.5-flash"

    rag = RAGService(
        api_key,
        model_name
    )

    return StreamingResponse(
        rag.stream_answer(
            request.question,
            request.history
        ),
        media_type="text/plain"
    )
