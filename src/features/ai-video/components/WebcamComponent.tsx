import React from 'react';
import Webcam from 'react-webcam';
import DeviceSelector from './DeviceSelector';
import { useWebcam } from '../hooks/useWebcam';

interface WebcamComponentProps {
  onVideoRecorded: (blob: Blob) => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = (props) => {
  const {
    webcamRef,
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
    handleDownload,
  } = useWebcam(props.onVideoRecorded);

  return (
    <div className="relative">
      <Webcam
        audio={true}
        ref={webcamRef}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: 'user',
          deviceId: selectedVideoDevice,
        }}
        audioConstraints={{
          deviceId: selectedAudioDevice,
        }}
        className="w-full rounded-lg"
      />
      {recordedChunks.length > 0 && (
        <button
          onClick={handleDownload}
          className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Download
        </button>
      )}
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
          className={`px-6 py-3 rounded-full text-sm font-medium ${
            isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
    </div>
  );
};

export default WebcamComponent;
