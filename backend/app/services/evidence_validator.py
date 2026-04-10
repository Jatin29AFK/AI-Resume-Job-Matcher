import re


ACTION_WORDS = [
    "built", "developed", "designed", "implemented", "created", "deployed",
    "optimized", "integrated", "trained", "evaluated", "analyzed", "improved",
    "automated", "worked", "used", "led", "delivered"
]


def split_into_sentences(text: str) -> list[str]:
    """
    Basic sentence/bullet splitting.
    """
    chunks = re.split(r"[.\n•\-]+", text)
    return [chunk.strip() for chunk in chunks if chunk.strip()]


def find_skill_evidence(skill: str, resume_sections: dict[str, str]) -> dict:
    """
    Find where a skill appears and whether it has action-oriented evidence.
    """
    evidence = {
        "skill": skill,
        "mentioned_in": [],
        "supporting_lines": [],
        "has_action_evidence": False,
        "evidence_strength": "weak"
    }

    for section_name, section_text in resume_sections.items():
        lines = split_into_sentences(section_text)

        for line in lines:
            lower_line = line.lower()
            if skill.lower() in lower_line:
                if section_name not in evidence["mentioned_in"]:
                    evidence["mentioned_in"].append(section_name)

                evidence["supporting_lines"].append(line)

                if any(action in lower_line for action in ACTION_WORDS):
                    evidence["has_action_evidence"] = True

    mentioned_in = set(evidence["mentioned_in"])

    if evidence["has_action_evidence"] and (
        "experience" in mentioned_in or "projects" in mentioned_in
    ):
        evidence["evidence_strength"] = "strong"
    elif "skills" in mentioned_in and (
        "experience" in mentioned_in or "projects" in mentioned_in
    ):
        evidence["evidence_strength"] = "medium"
    elif mentioned_in:
        evidence["evidence_strength"] = "weak"

    return evidence


def validate_matched_skills_evidence(
    matched_skills: list[str],
    resume_sections: dict[str, str]
) -> dict[str, dict]:
    """
    Validate evidence quality for each matched skill.
    """
    results = {}

    for skill in matched_skills:
        results[skill] = find_skill_evidence(skill, resume_sections)

    return results


def summarize_evidence_strength(skill_evidence_map: dict[str, dict]) -> dict:
    strong = []
    medium = []
    weak = []

    for skill, info in skill_evidence_map.items():
        strength = info.get("evidence_strength", "weak")
        if strength == "strong":
            strong.append(skill)
        elif strength == "medium":
            medium.append(skill)
        else:
            weak.append(skill)

    total = len(skill_evidence_map)
    support_score = 0.0
    if total:
        support_score = (
            (len(strong) * 1.0) +
            (len(medium) * 0.6) +
            (len(weak) * 0.2)
        ) / total

    return {
        "strong_evidence_skills": sorted(strong),
        "medium_evidence_skills": sorted(medium),
        "weak_evidence_skills": sorted(weak),
        "skill_support_score": round(support_score * 100, 2)
    }