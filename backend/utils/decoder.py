import torch
import numpy as np
from config import settings

def load_charset():
    """
    Load character set from file or use default Myanmar Unicode block.
    
    Returns:
        list: List of characters in the charset
    """
    try:
        with open(settings.CHARSET_PATH, 'r', encoding='utf-8') as f:
            charset = [char.strip() for char in f.readlines() if char.strip()]
        return charset
    except Exception as e:
        print(f"Error loading charset: {e}")
        # Fallback to basic Myanmar Unicode block + digits
        return [chr(code) for code in range(0x1000, 0x109F + 1)] + [str(i) for i in range(10)]

def ctc_decode(log_probs, beam_size=5):
    """
    Decode CTC output using beam search.
    
    Args:
        log_probs: Tensor of log probabilities from the model [batch_size, seq_len, num_classes]
        beam_size: Beam size for beam search decoding
        
    Returns:
        str: Decoded text in Unicode
    """
    # Get character set
    charset = load_charset()
    
    # Move to CPU for decoding
    if log_probs.is_cuda:
        log_probs = log_probs.cpu()
    
    # Get predictions (batch size is expected to be 1 for API calls)
    log_probs = log_probs.detach().numpy()
    
    # For each sequence in the batch
    decoded_text = ""
    for sequence in log_probs:
        # Get most likely class at each timestep
        best_path = np.argmax(sequence, axis=1)
        
        # CTC decoding: merge repeated characters and remove blanks (0)
        merged = []
        for i, char_idx in enumerate(best_path):
            # Skip if it's a blank or a repeat
            if char_idx != 0 and (i == 0 or char_idx != best_path[i-1]):
                merged.append(char_idx - 1)  # -1 because 0 is reserved for blank
        
        # Convert indices to characters
        text = ''.join([charset[idx] if idx < len(charset) else '?' for idx in merged])
        decoded_text += text
    
    return decoded_text

def ctc_beam_search(log_probs, beam_size=5):
    """
    More advanced CTC decoding using beam search.
    This is a simplified implementation and can be extended with language model.
    
    Args:
        log_probs: Tensor of log probabilities from the model [batch_size, seq_len, num_classes]
        beam_size: Beam size for beam search decoding
        
    Returns:
        str: Decoded text in Unicode with highest probability
    """
    # Get character set
    charset = load_charset()
    blank_idx = 0  # CTC blank index
    
    # Move to CPU for decoding
    if log_probs.is_cuda:
        log_probs = log_probs.cpu()
    
    # Get predictions (batch size is expected to be 1 for API calls)
    log_probs = log_probs.detach().numpy()[0]  # Take first in batch
    
    # Initialize beam with empty string
    beam = [([], 0.0)]  # (sequence, log_probability)
    
    # For each timestep
    for t in range(log_probs.shape[0]):
        new_beam = []
        
        # For each hypothesis in beam
        for seq, score in beam:
            # For each possible character
            for c in range(len(charset) + 1):  # +1 for blank
                # Add log probability
                new_score = score + log_probs[t, c]
                
                # Create new sequence
                new_seq = seq.copy()
                
                # Apply CTC rules
                if c != blank_idx:  # Not blank
                    if len(seq) == 0 or c != seq[-1]:  # Not a repeat or first char
                        new_seq.append(c - 1)  # -1 because 0 is reserved for blank
                
                new_beam.append((new_seq, new_score))
        
        # Sort and keep top beam_size hypotheses
        new_beam.sort(key=lambda x: x[1], reverse=True)
        beam = new_beam[:beam_size]
    
    # Get best hypothesis
    best_seq, _ = beam[0]
    
    # Convert indices to characters
    text = ''.join([charset[idx] if idx < len(charset) else '?' for idx in best_seq])
    
    return text