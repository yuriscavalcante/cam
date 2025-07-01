'use client';

import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: 'environment' }, // força câmera traseira
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Erro ao acessar câmera:', error);
        alert('Erro ao acessar a câmera traseira. Verifique as permissões ou o suporte do navegador.');
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '1rem' }}
    >
      <Grid>
        <Typography variant="h5" color="secondary" align="center" gutterBottom>
          Visualização da Câmera Traseira
        </Typography>

        <Paper
          elevation={4}
          sx={{
            overflow: 'hidden',
            borderRadius: 3,
            border: '2px solid',
            borderColor: 'secondary.main',
            backgroundColor: '#000',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
