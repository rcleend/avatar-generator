# AI Video Clone Generator

This is a [Next.js](https://nextjs.org) application that allows users to create and manage AI video clones using the Tavus API.

## Features

- Create AI video clones by recording training videos
- Manage existing AI clones
- Generate new videos using trained AI clones
- Dark mode interface
- Real-time video recording with webcam and microphone selection
- Multi-step workflows for both creation and editing

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

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
TAVUS_API_KEY=your_api_key_here
```

## Tech Stack

- **Framework**: Next.js 15.0
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: React Query
- **Video Processing**: FFmpeg
- **Font**: Geist (Sans & Mono)

## Key Features

### AI Clone Creation

- Record training videos with webcam
- Review and confirm recording quality
- Automatic upload and processing

### AI Clone Management

- View all created clones
- Monitor training progress
- Generate new videos using trained clones

### Video Generation

- Write custom scripts for your AI clone
- Generate new videos using your trained AI clone
- Download generated videos

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
