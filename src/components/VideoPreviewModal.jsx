import React from 'react';
import { Dialog, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './VideoPreviewModal.css';

const VideoPreviewModal = ({ open, onClose, videoUrl }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      className="video-preview-modal"
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
    >
      <div className="video-preview-modal__content">
        <IconButton
          onClick={onClose}
          className="video-preview-modal__close-button"
        >
          <CloseIcon />
        </IconButton>
        <div className="video-preview-modal__video-container">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="video-preview-modal__video"
          >
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        </div>
      </div>
    </Dialog>
  );
};

export default VideoPreviewModal; 