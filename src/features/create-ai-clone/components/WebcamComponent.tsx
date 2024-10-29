import React, { useState } from "react";
import Webcam from "react-webcam";
import DeviceSelector from "./DeviceSelector";
import { useWebcam } from "../hooks/useWebcam";
import { Loader2 } from "lucide-react";

interface WebcamComponentProps {
  onVideoRecorded: (blob: Blob) => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = (props) => {
  const {
    webcamRef,
    isWebcamReady,
    setIsWebcamReady,
    isRecording,
    recordedChunks,
    videoDevices,
    audioDevices,
    selectedVideoDevice,
    selectedAudioDevice,
    setSelectedVideoDevice,
    setSelectedAudioDevice,
    handleStartRecording,
    handleStopRecording,
  } = useWebcam(props.onVideoRecorded);

  return (
    <div className="relative">
      <div className="relative aspect-video">
        <Webcam
          audio={true}
          ref={webcamRef}
          onUserMedia={() => setIsWebcamReady(true)}
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "user",
            deviceId: selectedVideoDevice,
          }}
          audioConstraints={{
            deviceId: selectedAudioDevice,
          }}
          className={`w-full rounded-lg ${!isWebcamReady ? "invisible" : ""}`}
        />
        {!isWebcamReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <DeviceSelector
          devices={videoDevices}
          selectedDevice={selectedVideoDevice}
          onSelectDevice={setSelectedVideoDevice}
          icon="camera"
        />
        <DeviceSelector
          devices={audioDevices}
          selectedDevice={selectedAudioDevice}
          onSelectDevice={setSelectedAudioDevice}
          icon="microphone"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={!isWebcamReady}
          className={`px-6 py-3 rounded-full text-sm font-medium ${
            isRecording
              ? "bg-red-500 text-white"
              : isWebcamReady
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-blue-500/50 text-white cursor-not-allowed"
          }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </div>
  );
};

export default WebcamComponent;
