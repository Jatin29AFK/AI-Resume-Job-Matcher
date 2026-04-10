from abc import ABC, abstractmethod


class BaseLLMProvider(ABC):
    @abstractmethod
    def generate_explanation(self, analysis_result: dict) -> dict:
        """
        Takes deterministic analysis output and returns explanation fields.
        """
        pass