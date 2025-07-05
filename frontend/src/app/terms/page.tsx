import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Please read these terms carefully before using our service
            </p>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  By accessing or using the Myanmar Handwriting OCR service, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our service.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Myanmar Handwriting OCR provides optical character recognition services for Burmese handwritten text. 
                  The service allows users to upload images containing handwritten Burmese text and receive digitized text output.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>3. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    When using our service, you agree to:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Provide accurate information when required</li>
                    <li>Use the service only for lawful purposes</li>
                    <li>Not upload content that infringes on intellectual property rights</li>
                    <li>Not upload content that contains malware or harmful code</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>4. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  All content, features, and functionality of our service, including but not limited to text, graphics, logos, and code, 
                  are owned by Myanmar Handwriting OCR and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>5. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Myanmar Handwriting OCR provides the service on an "as is" and "as available" basis. 
                  We do not guarantee the accuracy, completeness, or reliability of OCR results. 
                  We are not liable for any damages arising from your use of or inability to use our service.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>6. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  We reserve the right to modify these Terms of Service at any time. 
                  We will notify users of any significant changes by posting the new Terms on this page. 
                  Your continued use of the service after such modifications constitutes your acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>7. Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  These Terms shall be governed by and construed in accordance with the laws of Myanmar, 
                  without regard to its conflict of law provisions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>8. Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have any questions about these Terms, please contact us at terms@myanmarocr.example.com.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}