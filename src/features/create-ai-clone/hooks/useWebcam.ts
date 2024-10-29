import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

export const useWebcam = (onVideoRecorded: (blob: Blob) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  useEffect(() => {
    async function getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      const audioDevs = devices.filter(
        (device) => device.kind === "audioinput"
      );
      setVideoDevices(videoDevs);
      setAudioDevices(audioDevs);
      if (videoDevs.length) setSelectedVideoDevice(videoDevs[0].deviceId);
      if (audioDevs.length) setSelectedAudioDevice(audioDevs[0].deviceId);
    }
    getDevices();
  }, []);

  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
    setRecordedChunks([]);
    if (webcamRef.current) {
      const stream = webcamRef.current.video?.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setRecordedChunks]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      const chunks: Blob[] = [];

      // Create a new data handler for this stop session
      const handleData = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      // Create the stop handler
      const handleStop = () => {
        mediaRecorderRef.current?.removeEventListener(
          "dataavailable",
          handleData
        );
        const blob = new Blob(chunks, {
          type: "video/webm",
        });
        onVideoRecorded(blob);
      };

      // Add the handlers
      mediaRecorderRef.current.addEventListener("dataavailable", handleData);
      mediaRecorderRef.current.addEventListener("stop", handleStop, {
        once: true,
      });

      // Stop the recording
      mediaRecorderRef.current.stop();
    }
  }, [mediaRecorderRef, onVideoRecorded]);

  return {
    isWebcamReady,
    setIsWebcamReady,
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
    onVideoRecorded,
  };
};
