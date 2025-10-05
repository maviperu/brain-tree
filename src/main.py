# flake8: noqa
from fastapi import FastAPI, File, UploadFile, Form
from io import BytesIO
import pandas as pd
from typing import Annotated
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse 
from typing import List


app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id+8}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    # contents = file.file.read()
    # buffer = BytesIO(contents)
    # df = pd.read_csv(buffer)
    # buffer.close()
    # file.file.close()
    # # return df.mean().to_dict()
    return {"theta":314, "alpha":325, "beta":2}
    # return {"filename": file.filename}

# @app.post("/submit")
# def submit(
#     name: str = Form(...),
#     point: float = Form(...),
#     is_accepted: bool = Form(...),
#     files: List[UploadFile] = File(...),
#     ):
#     # one_file = files[0]
#     # contents = one_file.file.read()
#     # buffer = BytesIO(contents)
#     # df = pd.read_csv(buffer)
#     return {
#         "JSON Payload": {"name": name, "point": point, "is_accepted": is_accepted},
#         "Filenames": [file.filename for file in files], #"means" : df.mean().to_dict(),
#         "Power": {"theta":314, "alpha":325, "beta":2}

#     }

app.mount("/", StaticFiles(directory="static",html = True), name="static")





# @app.post("/files")
# async def create_file(
#     file: Annotated[bytes, File()],
#     fileb: Annotated[UploadFile, File()],
# ):
#     return {
#         "file_size": len(file),
#         "fileb_content_type": fileb.content_type,
#     }