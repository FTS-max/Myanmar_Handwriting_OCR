import argparse
import torch
from PIL import Image
import matplotlib.pyplot as plt

from models.ocr_model import OCRModel
from utils.preprocessing import preprocess_image
from utils.decoder import ctc_decode

def test_ocr(image_path):
    """Test OCR functionality with a sample image"""
    try:
        # Load image
        image = Image.open(image_path)
        
        # Display original image
        plt.figure(figsize=(10, 5))
        plt.subplot(1, 2, 1)
        plt.imshow(image)
        plt.title("Original Image")
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Display preprocessed image
        plt.subplot(1, 2, 2)
        plt.imshow(processed_image[0], cmap='gray')
        plt.title("Preprocessed Image")
        plt.tight_layout()
        plt.show()
        
        # Initialize model
        model = OCRModel()
        model.eval()
        
        # Convert to tensor
        image_tensor = torch.FloatTensor(processed_image).unsqueeze(0)  # Add batch dimension
        
        # Run inference
        with torch.no_grad():
            outputs = model(image_tensor)
            
        # Decode predictions
        decoded_text = ctc_decode(outputs)
        
        print(f"Recognized text: {decoded_text}")
        
        # Calculate confidence
        probs = torch.softmax(outputs, dim=2)
        confidence_score = float(torch.mean(torch.max(probs, dim=2)[0]).item())
        print(f"Confidence score: {confidence_score:.4f}")
        
        return decoded_text, confidence_score
        
    except Exception as e:
        print(f"Error: {e}")
        return None, 0.0

def main():
    parser = argparse.ArgumentParser(description="Test Myanmar Handwriting OCR")
    parser.add_argument("image_path", help="Path to the image file")
    args = parser.parse_args()
    
    test_ocr(args.image_path)

if __name__ == "__main__":
    main()