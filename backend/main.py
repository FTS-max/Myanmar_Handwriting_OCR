from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import numpy as np
import cv2
import torch
from PIL import Image
import io
from typing import Optional

from models.ocr_model import OCRModel
from utils.preprocessing import preprocess_image
from utils.decoder import ctc_decode
from config import settings

app = FastAPI(
    title="Myanmar Handwriting OCR API",
    description="API for recognizing handwritten Myanmar text from images",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize model
@app.on_event("startup")
async def startup_event():
    global model
    try:
        model = OCRModel()
        model.eval()
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")
        model = None

@app.get("/")
async def root():
    return {"message": "Myanmar Handwriting OCR API is running"}

@app.post("/ocr/")
async def recognize_text(file: UploadFile = File(...), confidence: Optional[bool] = False):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Check if file is an image
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File is not an image")
    
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Convert to tensor
        image_tensor = torch.FloatTensor(processed_image).unsqueeze(0)  # Add batch dimension
        
        # Run inference
        with torch.no_grad():
            outputs = model(image_tensor)
            
        # Decode predictions
        decoded_text = ctc_decode(outputs)
        
        result = {"text": decoded_text}
        
        # Include confidence scores if requested
        if confidence:
            # Calculate confidence scores (simplified version)
            probs = torch.softmax(outputs, dim=2)
            confidence_score = float(torch.mean(torch.max(probs, dim=2)[0]).item())
            result["confidence"] = confidence_score
            
        return JSONResponse(content=result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)