import React from 'react';
import { Button } from '@/components/ui/Button';

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  onRemove,
  className = '',
}) => {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {/* Image */}
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full h-auto object-contain max-h-[400px]"
      />
      
      {/* Remove button */}
      <Button
        variant="danger"
        size="sm"
        className="absolute top-2 right-2 opacity-80 hover:opacity-100"
        onClick={onRemove}
        aria-label="Remove image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
};