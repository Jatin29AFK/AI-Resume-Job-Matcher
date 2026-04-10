from pydantic import BaseModel
from typing import Optional


class ExperienceRequirements(BaseModel):
    min_years_experience: Optional[int] = None


class JDRequirements(BaseModel):
    required_skills: list[str]
    preferred_skills: list[str]
    general_skills: list[str]
    experience_requirements: ExperienceRequirements
    education_requirements: list[str]


class EvidenceItem(BaseModel):
    skill: str
    mentioned_in: list[str]
    supporting_lines: list[str]
    has_action_evidence: bool
    evidence_strength: str


class EvidenceSummary(BaseModel):
    strong_evidence_skills: list[str]
    medium_evidence_skills: list[str]
    weak_evidence_skills: list[str]
    skill_support_score: float


class ExperienceEstimate(BaseModel):
    estimated_years: Optional[int] = None
    ranges_found: list[tuple[int, int]]
    note: str


class ExperienceComparison(BaseModel):
    meets_requirement: Optional[bool] = None
    gap_years: Optional[int] = None
    message: str


class MatchScores(BaseModel):
    required_skill_score: float
    preferred_skill_score: float
    general_skill_score: float
    weighted_skill_score: float
    semantic_score: float
    section_evidence_score: float
    skill_support_score: float
    critical_missing_penalty: float
    overall_score: float
    fit_label: str


class LLMExplanation(BaseModel):
    fit_summary: str
    strengths: list[str]
    weaknesses: list[str]
    llm_recommendations: list[str]
    provider: str


class MatchAnalysisResponse(BaseModel):
    filename: str
    resume_sections: dict[str, str]
    section_skill_map: dict[str, list[str]]
    resume_skills: list[str]
    jd_requirements: JDRequirements
    categorized_resume_skills: dict[str, list[str]]
    categorized_jd_skills: dict[str, list[str]]
    matched_skills: list[str]
    missing_skills: list[str]
    critical_missing_skills: list[str]
    preferred_missing_skills: list[str]
    fuzzy_matches: list[tuple[str, str, float]]
    skill_evidence_map: dict[str, EvidenceItem]
    evidence_summary: EvidenceSummary
    experience_estimate: ExperienceEstimate
    experience_comparison: ExperienceComparison
    scores: MatchScores
    suggestions: list[str]
    llm_explanation: Optional[LLMExplanation] = None


class ErrorResponse(BaseModel):
    detail: str