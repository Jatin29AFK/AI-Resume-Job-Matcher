from app.utils.constants import SKILL_CATEGORIES, SKILL_ALIASES


def get_all_skills() -> list[str]:
    all_skills = []
    for category_skills in SKILL_CATEGORIES.values():
        all_skills.extend(category_skills)
    return sorted(set(all_skills))


def normalize_skill(skill: str) -> str:
    skill = skill.lower().strip()
    return SKILL_ALIASES.get(skill, skill)


def extract_skills_from_text(text: str) -> list[str]:
    """
    Extract skills from text using categorized skill dictionary.
    Normalize skill aliases and return unique matched skills.
    """
    text = text.lower()
    found_skills = set()

    for skill in get_all_skills():
        if skill.lower() in text:
            found_skills.add(normalize_skill(skill))

    for alias, canonical in SKILL_ALIASES.items():
        if alias in text:
            found_skills.add(canonical)

    return sorted(found_skills)


def categorize_extracted_skills(skills: list[str]) -> dict:
    categorized = {category: [] for category in SKILL_CATEGORIES}

    for skill in skills:
        normalized = normalize_skill(skill)
        for category, category_skills in SKILL_CATEGORIES.items():
            normalized_category_skills = [normalize_skill(s) for s in category_skills]
            if normalized in normalized_category_skills:
                categorized[category].append(normalized)

    for category in categorized:
        categorized[category] = sorted(set(categorized[category]))

    return categorized

def extract_skills_from_sections(sections: dict[str, str]) -> dict[str, list[str]]:
    """
    Extract skills section-wise from parsed resume sections.
    """
    section_skills = {}

    for section_name, section_text in sections.items():
        extracted = extract_skills_from_text(section_text)
        section_skills[section_name] = extracted

    return section_skills