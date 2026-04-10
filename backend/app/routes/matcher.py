import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.models.schemas import MatchAnalysisResponse
from app.services.analyzer import analyze_resume_against_jd

router = APIRouter(prefix="/matcher", tags=["Matcher"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=MatchAnalysisResponse)
async def upload_resume_and_jd(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:
        if not resume.filename:
            raise HTTPException(status_code=400, detail="Resume file must have a valid filename.")

        allowed_extensions = (".pdf", ".docx")
        if not resume.filename.lower().endswith(allowed_extensions):
            raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

        safe_filename = f"{uuid.uuid4()}_{resume.filename}"
        file_path = os.path.join(UPLOAD_DIR, safe_filename)

        with open(file_path, "wb") as f:
            content = await resume.read()
            f.write(content)

        result = analyze_resume_against_jd(
            file_path=file_path,
            filename=resume.filename,
            job_description=job_description
        )

        return result

    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")