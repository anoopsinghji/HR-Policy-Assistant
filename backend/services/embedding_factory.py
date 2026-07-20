from langchain_openai import OpenAIEmbeddings

from core.config import DEFAULT_EMBEDDING_MODEL
from core.config import OPENROUTER_API_BASE_URL


def create_embedding_model(api_key: str):

    return OpenAIEmbeddings(
        model=DEFAULT_EMBEDDING_MODEL,
        api_key=api_key,
        base_url=OPENROUTER_API_BASE_URL,
    )