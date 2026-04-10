import re


MONTH_MAP = {
    "jan": 1, "january": 1,
    "feb": 2, "february": 2,
    "mar": 3, "march": 3,
    "apr": 4, "april": 4,
    "may": 5,
    "jun": 6, "june": 6,
    "jul": 7, "july": 7,
    "aug": 8, "august": 8,
    "sep": 9, "sept": 9, "september": 9,
    "oct": 10, "october": 10,
    "nov": 11, "november": 11,
    "dec": 12, "December": 12
}


def extract_year_ranges(text: str) -> list[tuple[int, int]]:
    """
    Extract year ranges like 2022-2024 or 2023 - Present.
    """
    ranges = []

    pattern = r"(20\d{2})\s*[-–]\s*(20\d{2}|present|current)"
    matches = re.findall(pattern, text.lower())

    current_year = 2026

    for start, end in matches:
        start_year = int(start)
        end_year = current_year if end in ["present", "current"] else int(end)
        if end_year >= start_year:
            ranges.append((start_year, end_year))

    return ranges


def estimate_total_experience_years(experience_text: str) -> dict:
    """
    Estimate rough total years from detected year ranges.
    This is heuristic, not exact.
    """
    ranges = extract_year_ranges(experience_text)

    if not ranges:
        return {
            "estimated_years": None,
            "ranges_found": [],
            "note": "Could not confidently estimate experience duration."
        }

    total_years = 0
    for start, end in ranges:
        total_years += (end - start)

    return {
        "estimated_years": total_years,
        "ranges_found": ranges,
        "note": "Experience estimate is heuristic and may overcount overlapping roles."
    }


def compare_with_jd_experience_requirement(
    estimated_resume_years: int | None,
    min_required_years: int | None
) -> dict:
    if min_required_years is None:
        return {
            "meets_requirement": None,
            "gap_years": None,
            "message": "No explicit minimum experience requirement found in the JD."
        }

    if estimated_resume_years is None:
        return {
            "meets_requirement": None,
            "gap_years": None,
            "message": "Could not confidently estimate experience from the resume."
        }

    gap = estimated_resume_years - min_required_years

    return {
        "meets_requirement": gap >= 0,
        "gap_years": gap,
        "message": (
            "Estimated resume experience appears to meet the JD requirement."
            if gap >= 0
            else "Estimated resume experience may be below the JD requirement."
        )
    }