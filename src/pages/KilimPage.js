import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './KilimPage.css';
import SkeletonLoader from '../components/SkeletonLoader';
import ContactSnippet from '../components/ContactSnippet';

const kilimImages = [
  'https://picsum.photos/seed/kilim1/800/600',
  'https://picsum.photos/seed/kilim2/800/600',
  'https://picsum.photos/seed/kilim3/800/600',
  'https://picsum.photos/seed/kilim4/800/600',
  'https://picsum.photos/seed/kilim5/800/600',
];

const KilimPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagePromises = kilimImages.map((src) => {
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
        setLoading(false); // Still show the content even if images fail
      });
  }, []);

  return (
    <div className="kilim-page">
      <h1 className="kilim-title">{t('kilimPage.title')}</h1>
      <div className="swiper-container">
        {loading ? (
          <SkeletonLoader style={{ height: '500px' }} />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1.6}
            centeredSlides={true}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
          >
            {kilimImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={t('kilimPage.imageAlt', { number: index + 1 })} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <ContactSnippet />
    </div>
  );
};

export default KilimPage;
