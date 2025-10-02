# flake8: noqa
from fastapi import FastAPI, File, UploadFile, Form
from io import BytesIO
import pandas as pd
from typing import Annotated


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id+8}

@app.post("/upload")
def upload(file: UploadFile = File(...)):
    contents = file.file.read()
    buffer = BytesIO(contents)
    df = pd.read_csv(buffer)
    
    buffer.close()
    file.file.close()
    return df.mean().to_dict()

@app.get("/files/")
async def create_file(
    file: Annotated[bytes, File()],
    fileb: Annotated[UploadFile, File()],
):
    return {
        "file_size": len(file),
        "fileb_content_type": fileb.content_type,
    }