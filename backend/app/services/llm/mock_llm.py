from app.services.llm.base import BaseLLMProvider


class MockLLMProvider(BaseLLMProvider):
    def generate_explanation(self, analysis_result: dict) -> dict:
        scores = analysis_result.get("scores", {})
        matched_skills = analysis_result.get("matched_skills", [])
        missing_skills = analysis_result.get("missing_skills", [])
        critical_missing_skills = analysis_result.get("critical_missing_skills", [])
        suggestions = analysis_result.get("suggestions", [])

        overall_score = scores.get("overall_score", 0)
        fit_label = scores.get("fit_label", "Unknown")

        summary = (
            f"This resume appears to be a {fit_label.lower()} for the target job, "
            f"with an overall compatibility score of {overall_score}%. "
            f"The profile shows alignment in some important areas, but there are still gaps "
            f"that should be addressed before applying more confidently."
        )

        strengths = []
        if matched_skills:
            strengths.append(
                f"The resume already matches several job-relevant skills, such as {', '.join(matched_skills[:5])}."
            )
        if scores.get("semantic_score", 0) >= 60:
            strengths.append(
                "The resume language is reasonably aligned with the wording and context of the job description."
            )
        if scores.get("skill_support_score", 0) >= 60:
            strengths.append(
                "Some matched skills are supported by meaningful evidence from projects or experience."
            )

        weaknesses = []
        if critical_missing_skills:
            weaknesses.append(
                f"The biggest concern is missing required skills, especially {', '.join(critical_missing_skills[:5])}."
            )
        if missing_skills:
            weaknesses.append(
                f"There are still noticeable missing skills, including {', '.join(missing_skills[:5])}."
            )
        if scores.get("skill_support_score", 0) < 60:
            weaknesses.append(
                "Some matched skills are not strongly supported by action-based evidence in the resume."
            )

        recommendations = suggestions[:3] if suggestions else [
            "Tailor the resume more directly to the job description.",
            "Add clearer evidence for key tools and skills.",
            "Improve alignment between projects and job requirements."
        ]

        return {
            "fit_summary": summary,
            "strengths": strengths[:3],
            "weaknesses": weaknesses[:3],
            "llm_recommendations": recommendations[:3],
            "provider": "mock"
        }