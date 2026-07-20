from fastapi import APIRouter
from fastapi import File
from fastapi import Header
from fastapi import HTTPException
from fastapi import UploadFile

from core.dependencies import resolve_api_key
from schemas.upload import UploadDeleteResponse
from schemas.upload import UploadItem
from schemas.upload import UploadListResponse
from schemas.upload import UploadResponse
from services.upload_service import UploadService


router = APIRouter()


def _validate_filename(filename: str):

    if not filename or not filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )


@router.post(
    "/upload",
    response_model=UploadResponse
)
def upload_pdf(

    file: UploadFile = File(...),
    authorization: str | None = Header(default=None)

):

    _validate_filename(file.filename)

    user_api_key = resolve_api_key(authorization)

    service = UploadService(user_api_key)

    saved_pdf = service.save_pdf(file)

    chunks = service.index_pdf(saved_pdf)

    return UploadResponse(

        filename=file.filename,

        message="PDF uploaded and processed successfully",

        chunks=chunks

    )


@router.get(
    "/uploads",
    response_model=UploadListResponse
)
def list_uploads():

    files = UploadService().list_uploaded_pdfs()

    return UploadListResponse(
        files=[UploadItem(**item) for item in files]
    )


@router.delete(
    "/uploads/{filename}",
    response_model=UploadDeleteResponse
)
def delete_upload(

    filename: str,
    authorization: str | None = Header(default=None)

):

    _validate_filename(filename)

    user_api_key = resolve_api_key(authorization)

    service = UploadService(user_api_key)

    service.delete_pdf(filename)

    return UploadDeleteResponse(
        filename=filename,
        message="PDF deleted successfully"
    )


@router.post(
    "/uploads/rebuild",
    response_model=UploadResponse
)
def rebuild_index(
    authorization: str | None = Header(default=None)
):

    user_api_key = resolve_api_key(authorization)

    service = UploadService(user_api_key)

    chunks = service.rebuild_index()

    return UploadResponse(
        filename="rebuild",
        message="Knowledge base rebuilt successfully",
        chunks=chunks
    )