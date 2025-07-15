import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TappetiPage.css';
import SkeletonLoader from '../components/SkeletonLoader';

const tappetiImages = [
  'https://picsum.photos/seed/tappeti1/800/600',
  'https://picsum.photos/seed/tappeti2/800/600',
  'https://picsum.photos/seed/tappeti3/800/600',
  'https://picsum.photos/seed/tappeti4/800/600',
  'https://picsum.photos/seed/tappeti5/800/600',
];

const TappetiPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagePromises = tappetiImages.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Failed to load images", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="tappeti-page">
      <h1 className="tappeti-title">{t('tappetiPage.title')}</h1>
      <div className="swiper-container">
        {loading ? (
          <SkeletonLoader style={{ height: '500px' }} />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
          >
            {tappetiImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={t('tappetiPage.imageAlt', { number: index + 1 })} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default TappetiPage;
