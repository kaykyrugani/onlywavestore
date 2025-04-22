import React, { useState } from 'react';
import { Dialog, IconButton, Box } from '@mui/material';
import { Close as CloseIcon, ZoomIn, ZoomOut } from '@mui/icons-material';
import './ImagePreviewModal.css';

const ImagePreviewModal = ({ open, onClose, imageUrl }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(1, Math.min(3, prev + delta)));
    }
  };

  const handleClose = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'transparent',
          boxShadow: 'none',
          overflow: 'hidden'
        }
      }}
    >
      <Box className="image-preview-modal">
        <IconButton
          className="image-preview-modal__close"
          onClick={handleClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <Box className="image-preview-modal__toolbar">
          <IconButton onClick={handleZoomIn} disabled={scale >= 3}>
            <ZoomIn />
          </IconButton>
          <IconButton onClick={handleZoomOut} disabled={scale <= 1}>
            <ZoomOut />
          </IconButton>
        </Box>

        <Box
          className="image-preview-modal__content"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ImagePreviewModal; 