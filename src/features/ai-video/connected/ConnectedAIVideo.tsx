'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clapperboard } from 'lucide-react';
import RecordConsentVideo from '../components/RecordConsentVideo';
import ConfirmConsentVideo from '../components/ConfirmConsentVideo';

enum Step {
  Record,
  Confirm,
  Complete
}

const ConnectedAIVideo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Record);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const handleVideoRecorded = (blob: Blob) => {
    setVideoBlob(blob);
    setCurrentStep(Step.Confirm);
  };

  const handleConfirm = () => {
    setCurrentStep(Step.Complete);
    // Here you would typically send the video to your backend
  };

  const handleRecordAgain = () => {
    setCurrentStep(Step.Record);
    setVideoBlob(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-2">
          <Clapperboard className="w-6 h-6" />
          <h1 className="text-2xl font-semibold">AI Video</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Train Scripe to generate professional videos for your personal branding.
        </p>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center">
                Create a video to train the AI
                <span className="ml-2 px-2 py-0.5 text-xs font-sembold text-primary-foreground bg-primary rounded-full">
                  Pro
                </span>
              </CardTitle>
            </div>
            <CardDescription className="mt-1">
              Scripe can generate professional personal branding videos for you. All you need to do is to record a video and Scripe will do the rest.
            </CardDescription>
          </CardHeader>
          {currentStep === Step.Record && (
            <RecordConsentVideo onVideoRecorded={handleVideoRecorded} />
          )}
          {currentStep === Step.Confirm && videoBlob && (
            <ConfirmConsentVideo
              videoBlob={videoBlob}
              onConfirm={handleConfirm}
              onRecordAgain={handleRecordAgain}
            />
          )}
          {currentStep === Step.Complete && (
            <div className="p-6">
              <p>Thank you for submitting your consent video. We'll process it shortly.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ConnectedAIVideo;
