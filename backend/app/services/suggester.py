def generate_resume_suggestions(
    matched_skills: list[str],
    missing_skills: list[str],
    critical_missing_skills: list[str],
    preferred_missing_skills: list[str],
    scores: dict,
    section_skill_map: dict[str, list[str]],
    experience_requirements: dict,
    education_requirements: list[str],
    evidence_summary: dict,
    experience_comparison: dict
) -> list[str]:
    suggestions = []

    skills_section_skills = section_skill_map.get("skills", [])
    experience_section_skills = section_skill_map.get("experience", [])
    project_section_skills = section_skill_map.get("projects", [])

    if critical_missing_skills:
        suggestions.append(
            "The biggest gap is in required skills. Add or highlight these only if you genuinely have them: "
            + ", ".join(critical_missing_skills)
        )

    if preferred_missing_skills:
        suggestions.append(
            "These preferred skills could further improve your fit: "
            + ", ".join(preferred_missing_skills[:6])
        )

    weak_evidence_skills = evidence_summary.get("weak_evidence_skills", [])
    if weak_evidence_skills:
        suggestions.append(
            "Some matched skills are weakly supported. Add stronger project or experience bullets for: "
            + ", ".join(weak_evidence_skills[:6])
        )

    strong_evidence_skills = evidence_summary.get("strong_evidence_skills", [])
    if strong_evidence_skills:
        suggestions.append(
            "Your strongest supported skills appear to be: "
            + ", ".join(strong_evidence_skills[:6])
            + ". Keep these prominent in your resume."
        )

    if matched_skills and not skills_section_skills:
        suggestions.append(
            "Add a dedicated Skills section to improve ATS readability and recruiter clarity."
        )

    if scores["required_skill_score"] < 60:
        suggestions.append(
            "Your required-skill coverage is still weak. Tailor your resume more directly toward must-have qualifications."
        )

    if scores["section_evidence_score"] < 50:
        suggestions.append(
            "Your resume needs stronger cross-section evidence. Show important skills inside both Projects and Experience, not only in Skills."
        )

    if scores["skill_support_score"] < 50:
        suggestions.append(
            "Your matched skills are not strongly backed by action-oriented evidence. Rewrite bullets using verbs, tools, and measurable outcomes."
        )

    if scores["semantic_score"] < 60:
        suggestions.append(
            "Your wording is not closely aligned with the JD. Rewrite bullets using the same role terminology and technical language."
        )

    min_years = experience_requirements.get("min_years_experience")
    if min_years is not None:
        suggestions.append(
            f"The JD mentions about {min_years}+ years of experience. Make sure your timeline and role duration are clearly visible."
        )

    if experience_comparison.get("meets_requirement") is False:
        suggestions.append(
            "Your estimated experience may be below the JD requirement. Emphasize directly relevant work, internships, and strong project depth."
        )

    if education_requirements:
        suggestions.append(
            "The JD includes education signals such as: "
            + ", ".join(education_requirements[:5])
            + ". Ensure your education section is clearly formatted and easy to find."
        )

    if scores["overall_score"] < 50:
        suggestions.append(
            "This currently looks like a lower fit. Improve it with stronger required-skill alignment, proof-based bullets, and more targeted role keywords."
        )

    if not suggestions:
        suggestions.append(
            "Your profile appears well aligned. Improve further by sharpening impact bullets and keeping strong evidence near the top of the resume."
        )

    return suggestions