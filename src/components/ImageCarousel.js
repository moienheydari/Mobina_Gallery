import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageCarousel.css';

const ImageCarousel = ({ folder }) => {
  const swiperRef = useRef(null);
  const overlayImageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overlayImage, setOverlayImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    let imagePaths = [];

    try {
      if (folder === 'homepage') {
        imagePaths = importAll(require.context('../images/carousel/homepage', false, /\.(png|jpe?g|svg|webp)$/));
      } else if (folder === 'kilim') {
        imagePaths = importAll(require.context('../images/carousel/kilim', false, /\.(png|jpe?g|svg|webp)$/));
      } else if (folder === 'tappeti/antique') {
        imagePaths = importAll(require.context('../images/carousel/tappeti/antique', false, /\.(png|jpe?g|svg|webp)$/));
      } else if (folder === 'tappeti/modern') {
        imagePaths = importAll(require.context('../images/carousel/tappeti/modern', false, /\.(png|jpe?g|svg|webp)$/));
      }
    } catch (error) {
      console.log(`Image directory for '${folder}' is empty or does not exist. This is okay.`);
      setLoading(false);
      return;
    }

    if (imagePaths.length === 0) {
      setLoading(false);
      return;
    }

    const imagePromises = imagePaths.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImages(imagePaths);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to preload images", err);
        setLoading(false); // Still show content even if preloading fails
      });

  }, [folder]);

  // Overlay functions
  const openOverlay = useCallback((imageSrc) => {
    setOverlayImage(imageSrc);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    // Pause carousel autoplay
    if (swiperRef.current && swiperRef.current.swiper.autoplay) {
      swiperRef.current.swiper.autoplay.stop();
    }
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    // Resume carousel autoplay
    if (swiperRef.current && swiperRef.current.swiper.autoplay) {
      swiperRef.current.swiper.autoplay.start();
    }
    document.body.style.overflow = 'auto'; // Restore body scroll
  }, []);

  const handleZoomChange = useCallback((newZoom) => {
    setZoomLevel(Math.max(0.5, Math.min(5, newZoom)));
    // Reset position when zooming out completely
    if (newZoom <= 1) {
      setImagePosition({ x: 0, y: 0 });
    }
  }, []);

  const handleWheel = useCallback((e) => {
    if (!overlayImage) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    handleZoomChange(zoomLevel + delta);
  }, [overlayImage, zoomLevel, handleZoomChange]);

  const handleMouseDown = useCallback((e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  }, [zoomLevel, imagePosition]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events for mobile
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1 && zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - imagePosition.x,
        y: e.touches[0].clientY - imagePosition.y
      });
    }
  }, [zoomLevel, imagePosition]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      e.preventDefault();
      setImagePosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart, zoomLevel]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!loading && swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="carousel-placeholder">
        <p>Loading images...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="carousel-placeholder">
        <p>The "{folder}" carousel is ready.</p>
        <p>Please upload your images to the <code>src/images/carousel/{folder}</code> directory to see them here.</p>
      </div>
    );
  }

  const hasMoreThanOneImage = images.length > 1;

  return (
    <div className="image-carousel-wrapper">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={1} // Reduced from 30
        slidesPerView={'auto'}
        centeredSlides={true}
        loop={false} // Disable the buggy built-in loop
        on={{ // Implement manual looping
          reachEnd: (swiper) => {
            if (hasMoreThanOneImage) {
              swiper.slideTo(0, 0); // Jump to the beginning silently
            }
          }
        }}
        autoplay={hasMoreThanOneImage ? {
          delay: 2000,
          disableOnInteraction: false,
          reverseDirection: false // Ensure it always goes forward
        } : false}
        pagination={{ clickable: true }}
        navigation={hasMoreThanOneImage}
        className="image-carousel-swiper"
      >
        {images.map((image, index) => {
          // Extract file name without extension
          const fileName = image.split('/').pop().replace(/\.[^/.]+$/, '').replace(/\.[^/.]+$/, '');
          return (
            <SwiperSlide key={index}>
              <img 
                src={image} 
                alt={`Carousel slide ${index + 1}`} 
                onClick={() => openOverlay(image)}
                style={{ cursor: 'pointer' }}
              />
              <div className="carousel-image-description">
                {fileName}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      
      {/* Image Overlay */}
      {overlayImage && (
        <div 
          className="image-overlay"
          onClick={(e) => {
            if (e.target.classList.contains('image-overlay')) {
              closeOverlay();
            }
          }}
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="overlay-close-btn" onClick={closeOverlay}>
            ×
          </button>
          
          <div className="zoom-controls">
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="zoom-slider"
            />
            <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
          </div>
          
          <img
            ref={overlayImageRef}
            src={overlayImage}
            alt="Zoomed image"
            className="overlay-image"
            style={{
              transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
