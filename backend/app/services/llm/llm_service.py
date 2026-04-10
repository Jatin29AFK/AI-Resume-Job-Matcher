import os
from app.services.llm.mock_llm import MockLLMProvider
from app.services.llm.gemini_llm import GeminiLLMProvider


def get_llm_provider():
    provider_name = os.getenv("LLM_PROVIDER", "mock").lower()

    if provider_name == "gemini":
        return GeminiLLMProvider()

    if provider_name == "mock":
        return MockLLMProvider()

    return MockLLMProvider()