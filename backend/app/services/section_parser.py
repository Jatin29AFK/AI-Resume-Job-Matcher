import re


SECTION_PATTERNS = {
    "skills": [
        r"\bskills\b",
        r"\btechnical skills\b",
        r"\bcore competencies\b",
        r"\btech stack\b"
    ],
    "experience": [
        r"\bexperience\b",
        r"\bwork experience\b",
        r"\bprofessional experience\b",
        r"\bemployment history\b"
    ],
    "projects": [
        r"\bprojects\b",
        r"\bpersonal projects\b",
        r"\bacademic projects\b"
    ],
    "education": [
        r"\beducation\b",
        r"\bacademic background\b",
        r"\bqualifications\b"
    ],
    "certifications": [
        r"\bcertifications\b",
        r"\bcertificates\b",
        r"\blicenses\b"
    ],
    "summary": [
        r"\bsummary\b",
        r"\bprofessional summary\b",
        r"\bprofile\b",
        r"\bobjective\b"
    ]
}


def normalize_line(line: str) -> str:
    return re.sub(r"\s+", " ", line.strip().lower())


def detect_section_name(line: str) -> str | None:
    normalized = normalize_line(line)

    for section, patterns in SECTION_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, normalized):
                return section

    return None


def split_resume_into_sections(text: str) -> dict[str, str]:
    """
    Split resume text into likely sections using heading detection.
    """
    lines = text.splitlines()
    sections = {}
    current_section = "other"
    buffer = []

    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            continue

        detected_section = detect_section_name(line)

        if detected_section:
            if buffer:
                existing_text = sections.get(current_section, "")
                combined = (existing_text + "\n" + "\n".join(buffer)).strip()
                sections[current_section] = combined
                buffer = []

            current_section = detected_section
        else:
            buffer.append(line)

    if buffer:
        existing_text = sections.get(current_section, "")
        combined = (existing_text + "\n" + "\n".join(buffer)).strip()
        sections[current_section] = combined

    return sections