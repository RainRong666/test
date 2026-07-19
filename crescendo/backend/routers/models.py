from fastapi import APIRouter

from dto import ModelInfo, ModelsResponse

# 将所有模型端点分组到 /api/v1/models 下；tags 将它们分组到 Swagger UI 中。
router = APIRouter(prefix="/api/v1/models", tags=["models"])


# GET /api/v1/models — response_model 告知 FastAPI/OpenAPI 要记录什么 JSON 结构。
@router.get("", response_model=ModelsResponse)
def list_models():
    return ModelsResponse(
        models=[
            ModelInfo(id="demo-model", huggingface_id="demo/model"),
        ]
    )