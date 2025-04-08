import { useState, useRef, useCallback, useEffect } from 'react';

const useZoom = ({ zoomLevel = 2.5, animationDuration = 300, onZoomChange }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const touchStartRef = useRef(null);

  // Limpa o zoom ao desmontar
  useEffect(() => {
    return () => {
      if (isZoomed) {
        handleZoomDeactivate();
      }
    };
  }, []);

  const calculateZoomPosition = useCallback((clientX, clientY) => {
    if (!containerRef.current) return { x: 50, y: 50 };
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    
    return { x, y };
  }, []);

  const handleZoomActivate = useCallback((e) => {
    if (!isZoomed && containerRef.current) {
      const position = calculateZoomPosition(e.clientX, e.clientY);
      setZoomPosition(position);
      setIsZoomed(true);
      onZoomChange?.(true);
    }
  }, [isZoomed, calculateZoomPosition, onZoomChange]);

  const handleZoomDeactivate = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      onZoomChange?.(false);
    }
  }, [isZoomed, onZoomChange]);

  const handleMouseMove = useCallback((e) => {
    if (isZoomed && containerRef.current) {
      const position = calculateZoomPosition(e.clientX, e.clientY);
      setZoomPosition(position);
    }
  }, [isZoomed, calculateZoomPosition]);

  // Suporte a gestos touch
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    };

    const distance = Math.sqrt(
      Math.pow(touchEnd.x - touchStartRef.current.x, 2) +
      Math.pow(touchEnd.y - touchStartRef.current.y, 2)
    );

    const duration = touchEnd.time - touchStartRef.current.time;

    // Se foi um toque rápido e curto (tap)
    if (distance < 10 && duration < 200) {
      if (isZoomed) {
        handleZoomDeactivate();
      } else {
        const position = calculateZoomPosition(touchEnd.x, touchEnd.y);
        setZoomPosition(position);
        setIsZoomed(true);
        onZoomChange?.(true);
      }
    }

    touchStartRef.current = null;
  }, [isZoomed, calculateZoomPosition, handleZoomDeactivate, onZoomChange]);

  // Adiciona e remove os event listeners de touch
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchEnd]);

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