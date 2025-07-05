'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// This is a placeholder dashboard for future implementation
// It will be enhanced with user authentication and OCR history tracking
export default function Dashboard() {
  // Placeholder data for demonstration
  const recentOCRs = [
    { id: '1', date: '2023-10-15', text: 'မြန်မာစာ နမူနာ ၁', confidence: 92 },
    { id: '2', date: '2023-10-14', text: 'မြန်မာစာ နမူနာ ၂', confidence: 88 },
    { id: '3', date: '2023-10-12', text: 'မြန်မာစာ နမူနာ ၃', confidence: 95 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <div>
              <Button variant="primary">
                New OCR Scan
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Scans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">24</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">All time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">91%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Across all scans</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">3</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Scans this week</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent OCR Scans</CardTitle>
              <CardDescription>Your most recent text recognition results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Date</th>
                      <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Text</th>
                      <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Confidence</th>
                      <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOCRs.map((ocr) => (
                      <tr key={ocr.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{ocr.date}</td>
                        <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{ocr.text}</td>
                        <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{ocr.confidence}%</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Copy
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              This is a placeholder dashboard for future implementation.
              <br />
              User authentication and OCR history tracking will be added in upcoming versions.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}