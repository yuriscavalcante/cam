'use client';

import React, { useEffect, useRef } from 'react';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true, // <--- permite qualquer câmera (frontal ou traseira)
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Erro ao acessar câmera:', error);
        alert('Erro ao acessar a câmera. Veja o console.');
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Câmera (genérica)</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: '100%',
          maxWidth: 600,
          border: '2px solid #ff5c00',
          borderRadius: 10,
          background: '#000',
        }}
      />
    </div>
  );
}
