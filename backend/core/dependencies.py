from fastapi import HTTPException

from core.pipeline import RAGPipeline


def get_pipeline(api_key: str, model_name: str):

    return RAGPipeline(api_key, model_name)


def resolve_api_key(authorization: str | None, api_key: str | None = None):

    if api_key:
        token = api_key.strip()

        if token:
            return token

        raise HTTPException(
            status_code=400,
            detail="Please enter your OpenRouter API Key."
        )

    if not authorization:
        raise HTTPException(
            status_code=400,
            detail="Please enter your OpenRouter API Key."
        )

    prefix = "Bearer "

    if not authorization.startswith(prefix):
        raise HTTPException(
            status_code=400,
            detail="Invalid Authorization header. Use Bearer token format."
        )

    token = authorization[len(prefix):].strip()

    if not token:
        raise HTTPException(
            status_code=400,
            detail="Please enter your OpenRouter API Key."
        )

    return token