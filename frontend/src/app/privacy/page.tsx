import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              How we handle your data
            </p>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  This Privacy Policy outlines how Myanmar Handwriting OCR ("we", "our", or "us") collects, uses, and protects your information when you use our OCR service. 
                  We are committed to ensuring the privacy and security of your data.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    When you use our OCR service, we may collect the following types of information:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Images:</strong> The images you upload for OCR processing.</li>
                    <li><strong>OCR Results:</strong> The text extracted from your images.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our service, including access times and pages viewed.</li>
                    <li><strong>Device Information:</strong> Information about the device you use to access our service, including browser type and operating system.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use the information we collect for the following purposes:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>To provide and maintain our OCR service</li>
                  <li>To improve our OCR algorithms and accuracy</li>
                  <li>To analyze usage patterns and optimize user experience</li>
                  <li>To detect and prevent technical issues or security breaches</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  We implement appropriate security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. 
                  However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  In the current version of our service, we do not store your uploaded images or OCR results beyond the duration of your session. 
                  Once you close the browser or navigate away from our service, your data is automatically deleted from our servers.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  In future versions with user accounts, we will retain your data for as long as your account is active or as needed to provide you with our services. 
                  You will have the option to delete your data at any time.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. 
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at privacy@myanmarocr.example.com.
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