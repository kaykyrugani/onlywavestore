import React, { useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { Upload as UploadIcon, Delete as DeleteIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import VideoPreviewModal from './VideoPreviewModal';
import './VideoUploader.css';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm'];

const VideoUploader = ({ value, onChange, onRemove }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Validação de tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Formato de vídeo não suportado. Use MP4 ou WebM.');
      return;
    }

    // Validação de tamanho
    if (file.size > MAX_FILE_SIZE) {
      toast.error('O vídeo deve ter no máximo 20MB.');
      return;
    }

    // Criar URL do vídeo
    const videoUrl = URL.createObjectURL(file);
    onChange(videoUrl);
  };

  const handleRemove = () => {
    if (value) {
      URL.revokeObjectURL(value);
    }
    onRemove();
  };

  return (
    <div className="video-uploader">
      {value ? (
        <div className="video-uploader__preview">
          <video
            src={value}
            className="video-uploader__video"
            onClick={() => setPreviewOpen(true)}
          />
          <div className="video-uploader__actions">
            <IconButton
              className="video-uploader__play-button"
              onClick={() => setPreviewOpen(true)}
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              className="video-uploader__remove-button"
              onClick={handleRemove}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="video-uploader__upload">
          <input
            type="file"
            accept="video/mp4,video/webm"
            onChange={handleFileChange}
            className="video-uploader__input"
            id="video-upload"
          />
          <label htmlFor="video-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadIcon />}
              className="video-uploader__button"
            >
              Upload de Vídeo
            </Button>
          </label>
          <Typography variant="caption" className="video-uploader__hint">
            Formatos aceitos: MP4, WebM (máx. 20MB)
          </Typography>
        </div>
      )}

      <VideoPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        videoUrl={value}
      />
    </div>
  );
};

export default VideoUploader; 