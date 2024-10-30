"use client";

import React, { useState, useCallback } from "react";
import { CardContent } from "@/components/ui/card";
import WebcamComponent from "./WebcamComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebcam } from "../hooks/useWebcam";
import { Timer, AlertCircle, Video, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface RecordTrainingVideoProps {
  onVideoRecorded: (videoBlob: Blob) => void;
}

const RecordTrainingVideo: React.FC<RecordTrainingVideoProps> = ({
  onVideoRecorded,
}) => {
  const {
    isRecording,
    isWebcamReady,
    countdown,
    webcamRef,
    videoDevices,
    audioDevices,
    selectedVideoDevice,
    selectedAudioDevice,
    setSelectedVideoDevice,
    setSelectedAudioDevice,
    setIsWebcamReady,
    handleStartRecording,
    handleStopRecording,
  } = useWebcam(onVideoRecorded);

  return (
    <CardContent className="space-y-6">
      {/* Script Section */}
      <div className="space-y-4">
        <ScrollArea className="h-[200px] w-full rounded-xl border bg-muted/50 p-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2 italic">
                &lt;Keep lips closed and look into the camera for 1 second&gt;
              </p>
              <p className="text-sm">
                I, [Your Name], am currently speaking and give consent to Tavus
                to create an AI clone of me by using the audio and video samples
                I provide. I understand that this AI clone can be used to create
                videos that look and sound like me.
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 italic">
                &lt;Start with a big smile. This script is for replicas that
                have a narrator-like tone. Keep your head steady, speak clearly
                as if talking to a group of friends, and smile occasionally&gt;
              </p>
              <p className="text-sm">
                Once upon a time, a very important invention was made: the
                toothbrush. This story is about how the toothbrush became
                something we use every day to keep our teeth clean.
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 italic">
                &lt;close your lips&gt;
              </p>
              <p className="text-sm">
                A long, long time ago, around 3000 BC, people in ancient places
                like Babylon and Egypt used sticks with frayed ends called 'chew
                sticks' to clean their teeth. These sticks helped people take
                care of their teeth, even in those old days.
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 italic">
                &lt;close your lips&gt;
              </p>
              <p className="text-sm">
                Later, in China during the Tang Dynasty, the first toothbrush
                with bristles was invented. They used stiff hairs from pigs and
                attached them to bamboo or bone handles. This new brush made
                cleaning teeth even better.
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 italic">
                &lt;close your lips&gt;
              </p>
              <p className="text-sm">
                In the 17th century, people from Europe found out about the
                Chinese bristle toothbrush. Then, in 1780, an Englishman named
                William made the first toothbrush that was sold in stores. His
                toothbrush had a handle made of cow bone and bristles made of
                pig hair.
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 italic">
                &lt;close your lips&gt;
              </p>
              <p className="text-sm">
                In the 1930s, a big change happened. A company called Dupont
                made bristles out of nylon instead of animal hair. These nylon
                bristles were cleaner and lasted longer. Then, in 1954, the
                first electric toothbrush was made in Switzerland. This electric
                toothbrush made cleaning teeth easier and more fun.
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 italic">
                &lt;close your lips&gt;
              </p>
              <p className="text-sm">
                Today, toothbrushes come in many shapes and sizes. Some even
                have smart technology to help us brush better. From ancient chew
                sticks to modern electric brushes, the toothbrush has come a
                long way to help us keep our teeth healthy and strong.
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Webcam Preview */}
      <div className="relative rounded-xl overflow-hidden border bg-muted/50">
        <WebcamComponent
          onVideoRecorded={onVideoRecorded}
          isRecording={isRecording}
          countdown={countdown}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          webcamRef={webcamRef}
          isWebcamReady={isWebcamReady}
          setIsWebcamReady={setIsWebcamReady}
          videoDevices={videoDevices}
          audioDevices={audioDevices}
          selectedVideoDevice={selectedVideoDevice}
          selectedAudioDevice={selectedAudioDevice}
          setSelectedVideoDevice={setSelectedVideoDevice}
          setSelectedAudioDevice={setSelectedAudioDevice}
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={!isWebcamReady || countdown !== null}
          className={cn(
            "px-8 py-3 rounded-full text-sm font-medium transition-all shadow-lg",
            isRecording
              ? "bg-red-500 text-white hover:bg-red-600"
              : isWebcamReady && countdown === null
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-primary/50 text-primary-foreground cursor-not-allowed"
          )}
        >
          {countdown !== null
            ? `Starting in ${countdown}...`
            : isRecording
            ? "Stop Recording"
            : "Start Recording"}
        </button>
      </div>
    </CardContent>
  );
};

export default RecordTrainingVideo;
