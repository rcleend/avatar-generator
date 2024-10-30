"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

export const useWebcam = (onVideoRecorded: (blob: Blob) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const getDevices = async () => {
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
    };

    getDevices();
  }, []);

  const handleDataAvailable = useCallback(({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!webcamRef.current?.video?.srcObject) return;

    setIsRecording(true);
    setRecordedChunks([]);

    const stream = webcamRef.current.video.srcObject as MediaStream;
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable]);

  const handleStartRecording = useCallback(() => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          startRecording();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  }, [startRecording]);

  const handleStopRecording = useCallback(async () => {
    if (!mediaRecorderRef.current) return;

    setIsRecording(false);
    const chunks: Blob[] = [];

    const handleData = ({ data }: BlobEvent) => {
      if (data.size > 0) {
        chunks.push(data);
      }
    };

    const handleStop = async () => {
      mediaRecorderRef.current?.removeEventListener(
        "dataavailable",
        handleData
      );
      const webmBlob = new Blob(chunks, { type: "video/webm" });

      try {
        onVideoRecorded(webmBlob);
      } catch (error) {
        console.error("Error converting video:", error);
        onVideoRecorded(webmBlob);
      }
    };

    mediaRecorderRef.current.addEventListener("dataavailable", handleData);
    mediaRecorderRef.current.addEventListener("stop", handleStop, {
      once: true,
    });
    mediaRecorderRef.current.stop();
  }, [onVideoRecorded]);

  return {
    isWebcamReady,
    setIsWebcamReady,
    webcamRef,
    isRecording,
    countdown,
    recordedChunks,
    videoDevices,
    audioDevices,
    selectedVideoDevice,
    selectedAudioDevice,
    setSelectedVideoDevice,
    setSelectedAudioDevice,
    handleStartRecording,
    handleStopRecording,
  };
};
