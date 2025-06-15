---

## 🇲🇲 Myanmar Handwriting OCR

### 📌 Project Overview

**Myanmar Handwriting OCR** is an AI-powered Optical Character Recognition system that detects and transcribes handwritten Burmese text from images. It leverages deep learning techniques (CNN + CRNN + CTC decoding) to convert real-world handwritten forms such as NRCs, school documents, and handwritten names into **machine-readable Unicode text**.

This system is designed for use in **digitization projects**, **government forms processing**, and **educational data collection** — helping Myanmar organizations move from paper to digital with greater speed and accuracy.

---

### 🎯 Project Goals

* ✅ Automatically extract **handwritten Burmese characters and numbers** from scanned images or photos.
* ✅ Output **Unicode text** that is searchable, editable, and storable.
* ✅ Enable future integration into **government systems, school databases, and OCR dashboards**.
* ✅ Support **custom API integration** with a frontend or other systems.

---

### 🧠 ML Techniques Used

| Step | Technique                                               | Description                                                             |
| ---- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1️⃣  | **CNN (Convolutional Neural Network)**                  | For image feature extraction from raw handwriting input                 |
| 2️⃣  | **CRNN (Convolutional Recurrent Neural Network)**       | To understand sequence of characters (like handwriting flow)            |
| 3️⃣  | **CTC Decoder (Connectionist Temporal Classification)** | For sequence alignment and text decoding without character segmentation |

---

### 🖼️ Input & Output

* **Input:** Image file containing handwritten Burmese text (e.g., scanned NRC, school forms, notes)
* **Output:** Unicode Burmese text (e.g., မောင် ခေါင်, ၈/တနင်္သာရီ(N)၁၂၃၄၅၆)

---

### 🔬 Image Preprocessing Pipeline

1. 📷 **Convert to Grayscale** — Reduce noise from RGB channels.
2. 📏 **Resize & Normalize** — Scale images to consistent shape and normalize pixel values.
3. ⬜ **Pad** — Add white padding to center text if image aspect ratio varies.
4. 🔢 **Tensor Transformation** — Convert image to PyTorch tensor format.
5. 🧠 **Inference** — Feed image into trained CNN+CRNN model.
6. 🧾 **CTC Decode** — Extract predicted character sequence.
7. 🧾 **Return Unicode** — Serve output as a Unicode Burmese string via API.

---

### 🏗️ Backend (Python)

* **Framework:** FastAPI
* **Libraries:**

  * `torch`, `torchvision` — model loading and inference
  * `opencv-python` — image preprocessing
  * `numpy` — array manipulation
  * `fastapi`, `uvicorn` — API layer for OCR service
* **Model:** Trained PyTorch model (CNN+CRNN with CTC loss)

---

### 🔐 Security & Data Protection

* Only accepts image uploads with `image/*` MIME type
* Can integrate **JWT authentication** for future user control
* API prepared for **HTTPS deployment**
* Future integration with **encrypted database** (PostgreSQL or MongoDB)

---

### 📦 API Endpoint

* **POST** `/ocr`

  * **Body:** Multipart form data (`image`)
  * **Response:** `{ "text": "မြန်မာ့အရေးရာ" }`

---

### 🖥️ (Optional) Frontend (Next.js + Tailwind CSS)

* Upload handwritten image
* View extracted Unicode text
* Clean, modern, and responsive UI
* Custom components only (no UI libraries)

---

### 💼 Use Cases

| Sector           | Example Use                                     |
| ---------------- | ----------------------------------------------- |
| Government       | Scanning NRC cards, census records              |
| Education        | Digitizing student records, handwritten reports |
| Archives         | Historical handwritten document preservation    |
| Business/Finance | Forms processing (loans, receipts, etc.)        |

---

### 📌 Future Plans

* [ ] Add **user login and dashboard**
* [ ] Track **OCR history per user**
* [ ] Export results to CSV or database
* [ ] **Text correction** using LLMs (OpenRouter or Burmese spellcheckers)
* [ ] Mobile-first support for image capture

---
