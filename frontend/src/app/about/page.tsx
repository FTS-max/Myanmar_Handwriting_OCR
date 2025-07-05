import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              About Myanmar Handwriting OCR
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Learn more about our OCR technology and mission
            </p>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Myanmar Handwriting OCR aims to bridge the gap between handwritten Burmese text and digital content. 
                  Our mission is to make Burmese handwritten content more accessible, searchable, and usable in the digital age.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Our OCR system uses advanced deep learning techniques to recognize Burmese handwritten characters with high accuracy. 
                    The technology stack includes:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Frontend:</strong> Next.js with React 19, Tailwind CSS</li>
                    <li><strong>Backend:</strong> FastAPI (Python), with optimized image processing</li>
                    <li><strong>OCR Model:</strong> Convolutional Neural Network (CNN) + Bidirectional LSTM with CTC loss</li>
                    <li><strong>Character Recognition:</strong> Support for Burmese Unicode characters</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Image Upload:</strong> Users upload an image containing handwritten Burmese text.
                  </li>
                  <li>
                    <strong>Preprocessing:</strong> The image is preprocessed to enhance character recognition (grayscale conversion, noise removal, normalization).
                  </li>
                  <li>
                    <strong>Character Recognition:</strong> Our deep learning model analyzes the image and identifies individual characters.
                  </li>
                  <li>
                    <strong>Text Generation:</strong> The recognized characters are combined to form words and sentences in Unicode Burmese text.
                  </li>
                  <li>
                    <strong>Result Display:</strong> The digitized text is presented to the user, along with confidence scores.
                  </li>
                </ol>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Future Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We are continuously improving our OCR system with these planned features:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>User accounts for saving OCR history</li>
                  <li>Enhanced accuracy for difficult handwriting styles</li>
                  <li>Support for document layout analysis</li>
                  <li>Mobile application for on-the-go OCR</li>
                  <li>API access for developers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}