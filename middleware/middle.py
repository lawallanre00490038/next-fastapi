from fastapi import FastAPI, Request, Depends
from typing import Union

# Define a dependency that acts like middleware
async def hello_world_middleware(request: Request):
    # Print "Hello World" before processing the request
    print("Hello World from the middleware")