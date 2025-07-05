# Myanmar Handwriting OCR API

A FastAPI-based backend system that provides an API to process scanned or photographed handwritten Burmese text using a machine learning OCR model. The system preprocesses input images, runs inference using a CNN+CRNN architecture, and returns decoded Unicode Burmese text.

## Features

- Image preprocessing pipeline for handwritten Burmese text
- OCR model with CNN + Bidirectional LSTM + CTC architecture
- REST API for text recognition from images
- Support for confidence scores

## Tech Stack

- **Language**: Python 3.10+
- **Framework**: FastAPI
- **OCR Framework**: PyTorch (with CNN + BiLSTM + CTC)
- **Image Processing**: OpenCV, Pillow
- **Serving**: Uvicorn

## Project Structure

```
backend/
├── config.py             # Configuration settings
├── main.py               # FastAPI application
├── models/
│   ├── __init__.py
│   ├── charset.txt       # Burmese character set
│   ├── ocr_model.py      # OCR model architecture
│   └── weights/          # Directory for model weights (not included)
├── utils/
│   ├── __init__.py
│   ├── decoder.py        # CTC decoder
│   └── preprocessing.py  # Image preprocessing
└── requirements.txt      # Dependencies
```

## Installation

1. Clone the repository

2. Create a virtual environment and activate it:

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a directory for model weights:

```bash
mkdir -p models/weights
```

5. Place your trained model weights in the `models/weights` directory as `ocr_model.pth`

## Usage

### Starting the API server

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### API Endpoints

#### Health Check

```
GET /
```

Returns a simple message indicating the API is running.

#### OCR Recognition

```
POST /ocr/
```

Parameters:
- `file`: The image file containing handwritten Burmese text (form-data)
- `confidence`: Boolean flag to include confidence scores (optional, default: false)

Example response:

```json
{
  "text": "မြန်မာစာ",
  "confidence": 0.95
}
```

### Interactive API Documentation

FastAPI provides automatic interactive API documentation:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Model Training

The OCR model requires training on a dataset of handwritten Burmese text. You can either:

1. Train from scratch using a custom dataset
2. Fine-tune from a pre-trained model on printed OCR datasets

Place the trained model weights in the `models/weights` directory as `ocr_model.pth`.

## License

MIT