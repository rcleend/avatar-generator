'use client';

import React from 'react';
import { CardContent } from '@/components/ui/card';
import WebcamComponent from './WebcamComponent';

interface RecordConsentVideoProps {
  onVideoRecorded: (videoBlob: Blob) => void;
}

const RecordConsentVideo: React.FC<RecordConsentVideoProps> = ({ onVideoRecorded }) => {
  return (
    <CardContent className="space-y-4">
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Consent Script</h3>
        <p className="text-sm text-muted-foreground mb-2 italic">&lt;Keep lips closed and look into the camera for 1 second&gt;</p>
        <p className="text-sm">
          I, [Your Name], am currently speaking and give consent to Scripe to create an AI clone of me by using the
          audio and video samples I provide. I understand that this AI clone can be used to create videos that look and
          sound like me.
        </p>
      </div>
      <WebcamComponent onVideoRecorded={onVideoRecorded} />
    </CardContent>
  );
};

export default RecordConsentVideo;
