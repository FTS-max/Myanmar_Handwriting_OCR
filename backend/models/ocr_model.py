import torch
import torch.nn as nn
import torch.nn.functional as F
import os

from config import settings

class CNNFeatureExtractor(nn.Module):
    """CNN-based feature extractor for the OCR model"""
    
    def __init__(self, input_channels=1, output_channels=512):
        super(CNNFeatureExtractor, self).__init__()
        
        # CNN layers for feature extraction
        self.conv1 = nn.Conv2d(input_channels, 64, kernel_size=3, stride=1, padding=1)
        self.pool1 = nn.MaxPool2d(kernel_size=2, stride=2)
        self.conv2 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
        self.pool2 = nn.MaxPool2d(kernel_size=2, stride=2)
        self.conv3 = nn.Conv2d(128, 256, kernel_size=3, stride=1, padding=1)
        self.bn3 = nn.BatchNorm2d(256)
        self.conv4 = nn.Conv2d(256, 256, kernel_size=3, stride=1, padding=1)
        self.pool4 = nn.MaxPool2d(kernel_size=(2, 1), stride=(2, 1))  # Preserve width for sequence
        self.conv5 = nn.Conv2d(256, 512, kernel_size=3, stride=1, padding=1)
        self.bn5 = nn.BatchNorm2d(512)
        self.conv6 = nn.Conv2d(512, output_channels, kernel_size=3, stride=1, padding=1)
        self.pool6 = nn.MaxPool2d(kernel_size=(2, 1), stride=(2, 1))  # Preserve width for sequence
        self.dropout = nn.Dropout(settings.DROPOUT)
    
    def forward(self, x):
        # Apply CNN layers
        x = F.relu(self.conv1(x))
        x = self.pool1(x)
        x = F.relu(self.conv2(x))
        x = self.pool2(x)
        x = F.relu(self.bn3(self.conv3(x)))
        x = F.relu(self.conv4(x))
        x = self.pool4(x)
        x = F.relu(self.bn5(self.conv5(x)))
        x = F.relu(self.conv6(x))
        x = self.pool6(x)
        x = self.dropout(x)
        
        # Reshape for sequence model: [batch, channels, height, width] -> [batch, width, channels*height]
        batch_size, channels, height, width = x.size()
        x = x.permute(0, 3, 1, 2)  # [batch, width, channels, height]
        x = x.reshape(batch_size, width, channels * height)  # [batch, width, channels*height]
        
        return x

class BidirectionalLSTM(nn.Module):
    """Bidirectional LSTM for sequence modeling"""
    
    def __init__(self, input_size, hidden_size, output_size):
        super(BidirectionalLSTM, self).__init__()
        
        self.rnn = nn.LSTM(input_size, hidden_size, bidirectional=True, batch_first=True)
        self.linear = nn.Linear(hidden_size * 2, output_size)  # *2 for bidirectional
    
    def forward(self, x):
        outputs, _ = self.rnn(x)
        outputs = self.linear(outputs)
        return outputs

class OCRModel(nn.Module):
    """Complete OCR model with CNN feature extractor and Bidirectional LSTM"""
    
    def __init__(self):
        super(OCRModel, self).__init__()
        
        # Load character set
        self.charset = self._load_charset()
        self.num_classes = len(self.charset) + 1  # +1 for blank (CTC requirement)
        
        # CNN feature extractor
        self.cnn = CNNFeatureExtractor(input_channels=1, output_channels=settings.CNN_OUTPUT_CHANNELS)
        
        # Calculate CNN output size
        cnn_output_size = settings.CNN_OUTPUT_CHANNELS * (settings.IMG_HEIGHT // 8)  # After 3 pooling layers with stride 2
        
        # Bidirectional LSTM layers
        self.lstm1 = BidirectionalLSTM(cnn_output_size, settings.LSTM_HIDDEN_SIZE, settings.LSTM_HIDDEN_SIZE)
        self.lstm2 = BidirectionalLSTM(settings.LSTM_HIDDEN_SIZE, settings.LSTM_HIDDEN_SIZE, self.num_classes)
        
        # Load pre-trained weights if available
        self._load_weights()
    
    def forward(self, x):
        # Extract features using CNN
        features = self.cnn(x)
        
        # Process sequence with LSTM layers
        seq = self.lstm1(features)
        seq = self.lstm2(seq)
        
        # Apply log_softmax for CTC loss
        log_probs = F.log_softmax(seq, dim=2)
        
        return log_probs
    
    def _load_charset(self):
        """Load character set from file"""
        try:
            if os.path.exists(settings.CHARSET_PATH):
                with open(settings.CHARSET_PATH, 'r', encoding='utf-8') as f:
                    charset = [char.strip() for char in f.readlines() if char.strip()]
                print(f"Loaded {len(charset)} characters from charset file")
                return charset
            else:
                # Default Myanmar Unicode block (basic set) if charset file not found
                print("Charset file not found, using default Myanmar Unicode block")
                # Basic Myanmar Unicode block (U+1000 to U+109F) + digits
                charset = [chr(code) for code in range(0x1000, 0x109F + 1)] + [str(i) for i in range(10)]
                return charset
        except Exception as e:
            print(f"Error loading charset: {e}")
            # Fallback to basic set
            return [chr(code) for code in range(0x1000, 0x109F + 1)] + [str(i) for i in range(10)]
    
    def _load_weights(self):
        """Load pre-trained weights if available"""
        try:
            if os.path.exists(settings.MODEL_PATH):
                self.load_state_dict(torch.load(settings.MODEL_PATH, map_location=torch.device('cpu')))
                print("Model weights loaded successfully")
            else:
                print("No pre-trained weights found, using random initialization")
        except Exception as e:
            print(f"Error loading model weights: {e}")