def build_resume_match_prompt(analysis_result: dict) -> str:
    scores = analysis_result.get("scores", {})
    matched_skills = analysis_result.get("matched_skills", [])
    missing_skills = analysis_result.get("missing_skills", [])
    critical_missing_skills = analysis_result.get("critical_missing_skills", [])
    preferred_missing_skills = analysis_result.get("preferred_missing_skills", [])
    suggestions = analysis_result.get("suggestions", [])
    jd_requirements = analysis_result.get("jd_requirements", {})

    return f"""
You are an AI career assistant.

You are given a grounded, deterministic resume-job match analysis.
You must explain it clearly without changing any score or inventing facts.

Rules:
- Use only the provided structured analysis.
- Do not hallucinate skills, experience, or education.
- Do not change scores.
- Keep the explanation practical and resume-focused.
- Prefer concise, professional language.

Structured Analysis:
Overall Score: {scores.get("overall_score")}
Fit Label: {scores.get("fit_label")}
Required Skill Score: {scores.get("required_skill_score")}
Preferred Skill Score: {scores.get("preferred_skill_score")}
Semantic Score: {scores.get("semantic_score")}
Skill Support Score: {scores.get("skill_support_score")}

Matched Skills: {matched_skills}
Missing Skills: {missing_skills}
Critical Missing Skills: {critical_missing_skills}
Preferred Missing Skills: {preferred_missing_skills}

Required Skills from JD: {jd_requirements.get("required_skills", [])}
Preferred Skills from JD: {jd_requirements.get("preferred_skills", [])}

System Suggestions: {suggestions}
""".strip()