from langchain_openai import ChatOpenAI

from core.config import OPENROUTER_API_BASE_URL


def create_llm(api_key: str, model_name: str):

    return ChatOpenAI(
        model=model_name,
        temperature=0,
        api_key=api_key,
        base_url=OPENROUTER_API_BASE_URL,
    )