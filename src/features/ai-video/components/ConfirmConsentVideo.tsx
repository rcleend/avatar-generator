'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface ConfirmConsentVideoProps {
  videoBlob: Blob;
  onConfirm: () => void;
  onRecordAgain: () => void;
}

const ConfirmConsentVideo: React.FC<ConfirmConsentVideoProps> = ({ videoBlob, onConfirm, onRecordAgain }) => {
  const [requirements, setRequirements] = useState({
    clearVoice: false,
    headInFocus: false,
    noHandsBlocking: false,
    clothesNotBlending: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(videoBlob);
    }
    return () => {
      if (videoRef.current) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, [videoBlob]);

  const allChecked = Object.values(requirements).every(Boolean);

  const handleCheckboxChange = (requirement: keyof typeof requirements) => {
    setRequirements(prev => ({ ...prev, [requirement]: !prev[requirement] }));
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setIsLoading(false);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video loading error:', e);
    setIsLoading(false);
    setError('Failed to load video. Please try recording again.');
  };

  return (
    <CardContent className="space-y-4">
      <video 
        ref={videoRef}
        controls 
        className="w-full rounded-lg" 
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        preload="metadata"
        playsInline
      />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Confirm these consent video requirements</h3>
        <div className="grid grid-cols-2 gap-2">
          <Checkbox
            id="clearVoice"
            checked={requirements.clearVoice}
            onCheckedChange={() => handleCheckboxChange('clearVoice')}
          />
          <label htmlFor="clearVoice" className="text-sm">Clear voice without background noise</label>
          
          <Checkbox
            id="headInFocus"
            checked={requirements.headInFocus}
            onCheckedChange={() => handleCheckboxChange('headInFocus')}
          />
          <label htmlFor="headInFocus" className="text-sm">Head and upper body in clear focus</label>
          
          <Checkbox
            id="noHandsBlocking"
            checked={requirements.noHandsBlocking}
            onCheckedChange={() => handleCheckboxChange('noHandsBlocking')}
          />
          <label htmlFor="noHandsBlocking" className="text-sm">No hands or accessories blocking your face</label>
          
          <Checkbox
            id="clothesNotBlending"
            checked={requirements.clothesNotBlending}
            onCheckedChange={() => handleCheckboxChange('clothesNotBlending')}
          />
          <label htmlFor="clothesNotBlending" className="text-sm">Clothes not blending with background</label>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onRecordAgain}>Record Again</Button>
        <Button onClick={onConfirm} disabled={!allChecked}>Confirm</Button>
      </div>
    </CardContent>
  );
};

export default ConfirmConsentVideo;
