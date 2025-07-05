import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Settings
    API_VERSION: str = "0.1.0"
    APP_NAME: str = "Myanmar Handwriting OCR API"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Model Settings
    MODEL_PATH: str = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models", "weights", "ocr_model.pth")
    CHARSET_PATH: str = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models", "charset.txt")
    
    # Image Processing Settings
    IMG_HEIGHT: int = 32  # Height to resize input images
    IMG_WIDTH: int = 128  # Width to resize input images (will be adjusted based on aspect ratio)
    GRAYSCALE: bool = True  # Convert to grayscale
    
    # Model Architecture Settings
    CNN_OUTPUT_CHANNELS: int = 512
    LSTM_HIDDEN_SIZE: int = 256
    LSTM_NUM_LAYERS: int = 2
    DROPOUT: float = 0.25
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()