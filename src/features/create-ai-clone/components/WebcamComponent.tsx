import React from "react";
import Webcam from "react-webcam";
import DeviceSelector from "./DeviceSelector";
import { Loader2 } from "lucide-react";

interface WebcamComponentProps {
  onVideoRecorded: (blob: Blob) => void;
  isRecording: boolean;
  countdown: number | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  webcamRef: React.RefObject<Webcam>;
  isWebcamReady: boolean;
  setIsWebcamReady: (ready: boolean) => void;
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  selectedVideoDevice: string;
  selectedAudioDevice: string;
  setSelectedVideoDevice: (deviceId: string) => void;
  setSelectedAudioDevice: (deviceId: string) => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({
  webcamRef,
  isWebcamReady,
  countdown,
  isRecording,
  setIsWebcamReady,
  videoDevices,
  audioDevices,
  selectedVideoDevice,
  selectedAudioDevice,
  setSelectedVideoDevice,
  setSelectedAudioDevice,
}) => {
  return (
    <div className="relative">
      <div className="relative aspect-video">
        <Webcam
          audio={true}
          muted={true}
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

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <span className="text-7xl font-bold text-white">{countdown}</span>
          </div>
        )}

        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Recording in Progress
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
    </div>
  );
};

export default WebcamComponent;
