import os
import json
from google import genai
from app.services.llm.base import BaseLLMProvider
from app.services.llm.prompt_builder import build_resume_match_prompt


class GeminiLLMProvider(BaseLLMProvider):
    def __init__(self) -> None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not set.")

        self.model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        self.client = genai.Client(api_key=api_key)

    def generate_explanation(self, analysis_result: dict) -> dict:
        prompt = build_resume_match_prompt(analysis_result)

        schema_instruction = """
Return valid JSON only with this exact shape:
{
  "fit_summary": "string",
  "strengths": ["string", "string", "string"],
  "weaknesses": ["string", "string", "string"],
  "llm_recommendations": ["string", "string", "string"],
  "provider": "gemini"
}
""".strip()

        full_prompt = f"{prompt}\n\n{schema_instruction}"

        response = self.client.models.generate_content(
            model=self.model,
            contents=full_prompt,
        )

        text = (response.text or "").strip()

        try:
            parsed = json.loads(text)
        except json.JSONDecodeError:
            parsed = {
                "fit_summary": "The resume has been analyzed, but the explanation layer could not return fully structured output.",
                "strengths": [],
                "weaknesses": [],
                "llm_recommendations": analysis_result.get("suggestions", [])[:3],
                "provider": "gemini",
            }

        parsed["provider"] = "gemini"
        return parsed