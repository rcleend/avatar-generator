import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

export const useWebcam = (onVideoRecorded: (blob: Blob) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>('');

  useEffect(() => {
    async function getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevs = devices.filter(device => device.kind === 'videoinput');
      const audioDevs = devices.filter(device => device.kind === 'audioinput');
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
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
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
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, {
          type: mediaRecorderRef.current?.mimeType || 'video/webm;codecs=vp8,opus'
        });
        onVideoRecorded(blob);
      };
    }
  }, [mediaRecorderRef, setIsRecording, recordedChunks, onVideoRecorded]);
  

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = 'consent-video.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return {
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
    onVideoRecorded,
  };
};
