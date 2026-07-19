from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.models import router as models_router
from routers.attacks import router as attacks_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RAG Prompt Optimizer API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(models_router)
app.include_router(attacks_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to our RAG Prompt Optimizer API!"}


@app.get("/health")
def health_check():
    return {"status": "ok"}