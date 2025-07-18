import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageCarousel.css';

const ImageCarousel = ({ folder }) => {
  const swiperRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: false // Ensure it always goes forward
        } : false}
        pagination={{ clickable: true }}
        navigation={hasMoreThanOneImage}
        className="image-carousel-swiper"
      >
        {images.map((image, index) => {
          // Extract file name without extension
          const fileName = image.split('/').pop().replace(/\.[^/.]+$/, '');
          return (
            <SwiperSlide key={index}>
              <img src={image} alt={`Carousel slide ${index + 1}`} />
              <div className="carousel-image-description">
                {fileName}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
