from fastapi import FastAPI, Request, Depends, Response
from fastapi.responses import JSONResponse
from typing import Dict, Union
import sys
from models.users import Tutorial
from fastapi.middleware.cors import CORSMiddleware

# connect to Database
from mongoengine import connect
if connect(db="testFast", host="localhost", port=27017):
    print("Connected to the database")

# Add the parent directory to the sys.path
sys.path.append("..")

from middleware.middle import hello_world_middleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Apply the middleware dependency to the specific route
@app.get("/api", dependencies=[Depends(hello_world_middleware)])
async def hello_world(name: Union[str, None] = None):
    return {"message": f"Hello World, {name}"}


@app.get("/api/python")
async def hello_name():
    # Convert MongoEngine documents to a list of dictionaries
   for tutor in Tutorial.objects:
    print(tutor.name)

    tutorial: Tutorial = Tutorial.objects()
    print(tutorial.to_json())

    return JSONResponse(content={"name": "Ola"}, status_code=200)

@app.post("/api/senduser")
async def send_user(body: Dict[str, str]):
    print(body)
    saveBody = Tutorial(**body)
    saveBody.save()
    print(saveBody)
    if saveBody:
        return JSONResponse(
            content={"message": "Data saved successfully"},
            status_code=201
        )
