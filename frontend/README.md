# Myanmar Handwriting OCR - Frontend

A modern web application for Optical Character Recognition (OCR) of handwritten Burmese text, built with Next.js, React 19, and Tailwind CSS.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Features

- **Image Upload**: Drag-and-drop or file selection for handwritten Burmese text images
- **OCR Processing**: Sends images to backend API for text recognition
- **Real-time Feedback**: Loading states and error handling
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatically adapts to system preferences
- **Image Optimization**: Compresses and optimizes images before processing

## 🔧 Tech Stack

- **Framework**: Next.js with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **TypeScript**: For type safety

## 📁 Project Structure

```
frontend/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/     # React components
│   │   ├── ui/        # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── .env.local         # Environment variables
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🔒 Security Features

- Image validation (type and size)
- Secure API communication
- Prepared for future JWT authentication
- Environment variable configuration

## 🔮 Future Enhancements

- User authentication system
- OCR history tracking
- User dashboard
- Advanced image preprocessing options
- Batch processing of multiple images
- Mobile application

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
