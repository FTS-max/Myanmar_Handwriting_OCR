import cv2
import numpy as np
from PIL import Image
import torch
from config import settings

def preprocess_image(image):
    """
    Preprocess an image for the OCR model.
    
    Args:
        image: PIL Image object
        
    Returns:
        numpy.ndarray: Preprocessed image ready for model input
    """
    # Convert PIL Image to numpy array
    img = np.array(image)
    
    # Convert to grayscale if needed
    if settings.GRAYSCALE and len(img.shape) == 3 and img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    elif len(img.shape) == 3 and img.shape[2] == 4:  # Handle RGBA
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2GRAY)
    
    # Apply adaptive thresholding to handle different lighting conditions
    # and improve contrast between text and background
    if len(img.shape) == 2:  # Only for grayscale images
        img = cv2.adaptiveThreshold(
            img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2
        )
    
    # Noise removal (optional)
    img = cv2.medianBlur(img, 3)
    
    # Resize while maintaining aspect ratio
    target_height = settings.IMG_HEIGHT
    h, w = img.shape[:2]
    aspect_ratio = w / h
    target_width = int(target_height * aspect_ratio)
    
    # Ensure width is reasonable (not too wide or too narrow)
    min_width = target_height  # At least square
    max_width = target_height * 10  # Not too wide
    target_width = max(min(target_width, max_width), min_width)
    
    img = cv2.resize(img, (target_width, target_height), interpolation=cv2.INTER_AREA)
    
    # Add padding to fixed width if needed
    if target_width < settings.IMG_WIDTH:
        pad_width = settings.IMG_WIDTH - target_width
        img = cv2.copyMakeBorder(
            img, 0, 0, 0, pad_width, cv2.BORDER_CONSTANT, value=0
        )
    elif target_width > settings.IMG_WIDTH:
        # If image is wider than max width, resize to max width
        img = cv2.resize(img, (settings.IMG_WIDTH, target_height), interpolation=cv2.INTER_AREA)
    
    # Normalize pixel values to [0, 1]
    img = img.astype(np.float32) / 255.0
    
    # Ensure proper shape for model input [C, H, W]
    if len(img.shape) == 2:
        img = np.expand_dims(img, axis=0)  # Add channel dimension
    
    return img

def prepare_batch(images):
    """
    Prepare a batch of images for the OCR model.
    
    Args:
        images: List of PIL Image objects
        
    Returns:
        torch.Tensor: Batch of preprocessed images
    """
    processed_images = [preprocess_image(img) for img in images]
    
    # Pad all images to the same width
    max_width = max(img.shape[2] for img in processed_images)
    padded_images = []
    
    for img in processed_images:
        pad_width = max_width - img.shape[2]
        if pad_width > 0:
            padded = np.pad(img, ((0, 0), (0, 0), (0, pad_width)), mode='constant')
            padded_images.append(padded)
        else:
            padded_images.append(img)
    
    # Convert to tensor
    batch = torch.FloatTensor(np.array(padded_images))
    
    return batch