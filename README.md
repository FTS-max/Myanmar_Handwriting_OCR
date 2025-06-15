# 🇲🇲 Myanmar Handwriting OCR

## Project Summary

**Myanmar Handwriting OCR** is an AI-based Optical Character Recognition system designed to detect and transcribe handwritten Burmese (Myanmar) text from images. Built using advanced deep learning models (CNN + CRNN + CTC), this project aims to accelerate the digitization of handwritten records for Myanmar’s public and private sectors.

## Key Features

- **Automatic Extraction:** Accurately recognizes handwritten Burmese characters and numbers from scanned images or photos.
- **Unicode Output:** Delivers output as searchable and editable Unicode Burmese text.
- **API-Ready:** Designed for easy integration with government systems, school databases, and custom OCR dashboards via API.
- **Flexible Integration:** Supports future connections with various frontends or third-party systems.

## Machine Learning Pipeline

| Step | Technique                                               | Description                                                             |
|------|--------------------------------------------------------|-------------------------------------------------------------------------|
| 1️⃣   | **CNN (Convolutional Neural Network)**                 | Extracts features from raw handwritten images                            |
| 2️⃣   | **CRNN (Convolutional Recurrent Neural Network)**      | Processes character sequences and handwriting flow                       |
| 3️⃣   | **CTC Decoder (Connectionist Temporal Classification)**| Decodes text sequences without needing explicit character segmentation   |

## Input & Output

- **Input:** Images containing handwritten Burmese (e.g., NRC cards, school forms, notes)
- **Output:** Unicode Burmese text (e.g., မောင် ခေါင်, ၈/တနင်္သာရီ(N)၁၂၃၄၅၆)

## Image Preprocessing Workflow

1. **Grayscale Conversion:** Reduces color noise by converting images to grayscale.
2. **Resize & Normalize:** Standardizes image size and pixel values.
3. **Padding:** Adds white margins to center the text for variable aspect ratios.
4. **Tensor Transformation:** Converts images to PyTorch tensors.
5. **Inference:** Processes images through the trained CNN+CRNN model.
6. **CTC Decoding:** Extracts the predicted sequence of characters.
7. **Unicode Output:** Returns the result as a Unicode Burmese string via the API.

## Backend Overview (Python)

- **Framework:** FastAPI
- **Core Libraries:**
  - `torch`, `torchvision` for model inference
  - `opencv-python` for image processing
  - `numpy` for array operations
  - `fastapi`, `uvicorn` for API service
- **Model:** Trained PyTorch model (CNN+CRNN with CTC loss)

## Security & Data Protection

- Only accepts image files (`image/*` MIME types)
- Ready for JWT-based authentication and HTTPS deployment
- Future plans for encrypted database support (PostgreSQL/MongoDB)

## API Usage

- **POST** `/ocr`
  - **Body:** Multipart form data (`image`)
  - **Response:** `{ "text": "မြန်မာ့အရေးရာ" }`

## (Optional) Frontend

- Built with Next.js & Tailwind CSS
- Allows image upload and displays extracted Unicode text
- Responsive, clean UI with custom-built components

## Sample Use Cases

| Sector           | Example Use                                      |
|------------------|--------------------------------------------------|
| Government       | NRC card/census digitization                     |
| Education        | Student records and exam papers digitization      |
| Archives         | Preserving historical handwritten documents       |
| Business/Finance | Automating form and receipt data entry           |

## Roadmap

- [ ] User login and dashboard
- [ ] User-specific OCR history
- [ ] Export results (CSV/database)
- [ ] Text correction with LLMs or Burmese spellcheckers
- [ ] Mobile-first image capture support

---
