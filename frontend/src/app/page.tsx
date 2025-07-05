'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileUpload } from '@/components/FileUpload';
import { ImagePreview } from '@/components/ImagePreview';
import { OCRResult } from '@/components/OCRResult';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOCR } from '@/hooks/useOCR';

export default function Home() {
  const {
    uploadState,
    result,
    error,
    imagePreview,
    isProcessing,
    handleImageUpload,
    resetState
  } = useOCR();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Myanmar Handwriting OCR
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Convert handwritten Burmese text to digital format instantly
            </p>
          </div>
          
          {/* OCR Process Section */}
          <div className="space-y-6">
            {/* Step 1: Upload Image (show when not processing or no result) */}
            {uploadState === 'idle' && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Handwritten Text</CardTitle>
                  <CardDescription>
                    Upload an image containing handwritten Burmese text
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload 
                    onFileSelected={handleImageUpload}
                    accept="image/jpeg,image/png,image/webp"
                    maxSize={5}
                  />
                </CardContent>
              </Card>
            )}
            
            {/* Step 2: Processing (show when uploading) */}
            {uploadState === 'uploading' && (
              <Card>
                <CardHeader>
                  <CardTitle>Processing Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center py-8">
                    <LoadingSpinner size="lg" className="mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Analyzing your handwritten text...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Step 3: Show Result (show when success) */}
            {uploadState === 'success' && result && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Preview */}
                  {imagePreview && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Original Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ImagePreview 
                          imageUrl={imagePreview} 
                          onRemove={resetState} 
                        />
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* OCR Result */}
                  <OCRResult result={result} onReset={resetState} />
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={resetState}
                    variant="outline"
                  >
                    Process Another Image
                  </Button>
                </div>
              </div>
            )}
            
            {/* Error State */}
            {uploadState === 'error' && error && (
              <div className="space-y-4">
                <ErrorMessage message={error} />
                <div className="flex justify-center">
                  <Button 
                    onClick={resetState}
                    variant="outline"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
