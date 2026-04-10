from app.services.llm.llm_service import get_llm_provider
from app.services.llm.mock_llm import MockLLMProvider
from app.services.parser import extract_resume_text
from app.services.preprocess import clean_text, lemmatize_text
from app.services.extractor import (
    extract_skills_from_text,
    categorize_extracted_skills,
    extract_skills_from_sections,
)
from app.services.section_parser import split_resume_into_sections
from app.services.jd_parser import parse_jd_requirements
from app.services.matcher_engine import (
    exact_skill_match,
    missing_skill_match,
    fuzzy_skill_match,
    semantic_text_similarity,
    detect_critical_missing_skills,
    detect_preferred_missing_skills,
)
from app.services.evidence_validator import (
    validate_matched_skills_evidence,
    summarize_evidence_strength,
)
from app.services.experience_estimator import (
    estimate_total_experience_years,
    compare_with_jd_experience_requirement,
)
from app.services.scorer import calculate_match_score
from app.services.suggester import generate_resume_suggestions


def analyze_resume_against_jd(file_path: str, filename: str, job_description: str) -> dict:
    resume_text = extract_resume_text(file_path, filename)
    resume_sections = split_resume_into_sections(resume_text)

    cleaned_resume = clean_text(resume_text)
    cleaned_jd = clean_text(job_description)

    lemmatized_resume = lemmatize_text(cleaned_resume)
    lemmatized_jd = lemmatize_text(cleaned_jd)

    resume_skills = extract_skills_from_text(cleaned_resume)

    jd_info = parse_jd_requirements(job_description)
    required_skills = jd_info["required_skills"]
    preferred_skills = jd_info["preferred_skills"]
    general_skills = jd_info["general_skills"]
    jd_skills = jd_info["all_jd_skills"]
    experience_requirements = jd_info["experience_requirements"]
    education_requirements = jd_info["education_requirements"]

    categorized_resume_skills = categorize_extracted_skills(resume_skills)
    categorized_jd_skills = categorize_extracted_skills(jd_skills)

    cleaned_section_map = {
        section: clean_text(text)
        for section, text in resume_sections.items()
    }
    section_skill_map = extract_skills_from_sections(cleaned_section_map)

    matched_skills = exact_skill_match(resume_skills, jd_skills)
    missing_skills = missing_skill_match(resume_skills, jd_skills)
    fuzzy_matches = fuzzy_skill_match(resume_skills, jd_skills)

    semantic_score = semantic_text_similarity(lemmatized_resume, lemmatized_jd)

    critical_missing_skills = detect_critical_missing_skills(required_skills, missing_skills)
    preferred_missing_skills = detect_preferred_missing_skills(preferred_skills, missing_skills)

    skill_evidence_map = validate_matched_skills_evidence(matched_skills, resume_sections)
    evidence_summary = summarize_evidence_strength(skill_evidence_map)

    experience_text = resume_sections.get("experience", "")
    experience_estimate = estimate_total_experience_years(experience_text)
    experience_comparison = compare_with_jd_experience_requirement(
        estimated_resume_years=experience_estimate["estimated_years"],
        min_required_years=experience_requirements.get("min_years_experience")
    )

    scores = calculate_match_score(
        matched_skills=matched_skills,
        semantic_score=semantic_score,
        section_skill_map=section_skill_map,
        required_skills=required_skills,
        preferred_skills=preferred_skills,
        general_skills=general_skills,
        critical_missing_skills=critical_missing_skills,
        skill_support_score=evidence_summary["skill_support_score"],
    )

    suggestions = generate_resume_suggestions(
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        critical_missing_skills=critical_missing_skills,
        preferred_missing_skills=preferred_missing_skills,
        scores=scores,
        section_skill_map=section_skill_map,
        experience_requirements=experience_requirements,
        education_requirements=education_requirements,
        evidence_summary=evidence_summary,
        experience_comparison=experience_comparison,
    )

    llm_provider = get_llm_provider()
    llm_explanation = None
    try:
        llm_provider = get_llm_provider()
        llm_explanation = llm_provider.generate_explanation({
            "filename": filename,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "critical_missing_skills": critical_missing_skills,
            "preferred_missing_skills": preferred_missing_skills,
            "scores": scores,
            "jd_requirements": {
                "required_skills": required_skills,
                "preferred_skills": preferred_skills,
                "general_skills": general_skills,
                "experience_requirements": experience_requirements,
                "education_requirements": education_requirements,
            },
            "suggestions": suggestions,
        })
    except Exception:
        fallback_provider = MockLLMProvider()
        llm_explanation = fallback_provider.generate_explanation({
            "filename": filename,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "critical_missing_skills": critical_missing_skills,
            "preferred_missing_skills": preferred_missing_skills,
            "scores": scores,
            "jd_requirements": {
                "required_skills": required_skills,
                "preferred_skills": preferred_skills,
                "general_skills": general_skills,
                "experience_requirements": experience_requirements,
                "education_requirements": education_requirements,
            },
            "suggestions": suggestions,
        })

    return {
        "filename": filename,
        "resume_sections": resume_sections,
        "section_skill_map": section_skill_map,
        "resume_skills": resume_skills,
        "jd_requirements": {
            "required_skills": required_skills,
            "preferred_skills": preferred_skills,
            "general_skills": general_skills,
            "experience_requirements": experience_requirements,
            "education_requirements": education_requirements,
        },
        "categorized_resume_skills": categorized_resume_skills,
        "categorized_jd_skills": categorized_jd_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "critical_missing_skills": critical_missing_skills,
        "preferred_missing_skills": preferred_missing_skills,
        "fuzzy_matches": fuzzy_matches,
        "skill_evidence_map": skill_evidence_map,
        "evidence_summary": evidence_summary,
        "experience_estimate": experience_estimate,
        "experience_comparison": experience_comparison,
        "scores": scores,
        "suggestions": suggestions,
        "llm_explanation": llm_explanation,
    }