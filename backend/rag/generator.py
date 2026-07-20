from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from core.config import OPENROUTER_API_BASE_URL


def create_llm(api_key: str, model_name: str):

    return ChatOpenAI(
        model=model_name,
        temperature=0,
        api_key=api_key,
        base_url=OPENROUTER_API_BASE_URL,
    )


def get_llm(api_key: str, model_name: str):

    return create_llm(api_key, model_name)


def get_prompt():

    return ChatPromptTemplate.from_template(
        """
You are an HR assistant.

Answer ONLY using the provided company policy context.

Use the chat history only to understand references in the user's question, such as "that", "it", "this policy", or follow-up questions. Do not invent policy details from chat history.

If the answer is not present in the company policy context, say:

"I could not find this information in the company policy."

Chat history:
{chat_history}

Company policy context:
{context}

Question:
{question}
"""
    )


def get_question_rewrite_prompt():

    return ChatPromptTemplate.from_template(
        """
Rewrite the user's latest question as a standalone search query for retrieving HR policy text.

Use the chat history to resolve references like "that", "same", "it", "they", or "this".
Keep the rewritten question concise and faithful to the user's intent.
Do not answer the question.

Chat history:
{chat_history}

Latest question:
{question}

Standalone search query:
"""
    )
