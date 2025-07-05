import React from 'react';
import { OCRResponse } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface OCRResultProps {
  result: OCRResponse;
  onReset: () => void;
}

export const OCRResult: React.FC<OCRResultProps> = ({ result, onReset }) => {
  // Function to copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.text);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>OCR Result</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              aria-label="Copy to clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onReset}
              aria-label="Try another image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Another
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Display the OCR text result */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Detected Text
            </h4>
            <div className="min-h-[100px] text-lg font-myanmar break-words">
              {result.text}
            </div>
          </div>

          {/* Display confidence score if available */}
          {result.confidence !== undefined && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                Confidence:
              </span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 max-w-xs">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(result.confidence * 100)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};