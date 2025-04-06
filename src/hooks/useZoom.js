import { useState, useRef, useCallback } from 'react';

const useZoom = ({ zoomLevel = 2.5, animationDuration = 300, onZoomChange }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleZoomActivate = useCallback((e) => {
    if (!isZoomed) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setZoomPosition({ x, y });
      setIsZoomed(true);
      onZoomChange?.(true);
    }
  }, [isZoomed, onZoomChange]);

  const handleZoomDeactivate = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      onZoomChange?.(false);
    }
  }, [isZoomed, onZoomChange]);

  const handleMouseMove = useCallback((e) => {
    if (isZoomed && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setZoomPosition({ x, y });
    }
  }, [isZoomed]);

  return {
    isZoomed,
    zoomPosition,
    containerRef,
    imageRef,
    handleZoomActivate,
    handleZoomDeactivate,
    handleMouseMove,
    zoomLevel,
    animationDuration
  };
};

export default useZoom; 