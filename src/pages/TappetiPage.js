import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TappetiPage.css';

const TappetiPage = () => {
  const { t } = useTranslation();
  const tappetiImages = [
    'https://picsum.photos/seed/tappeti1/800/600',
    'https://picsum.photos/seed/tappeti2/800/600',
    'https://picsum.photos/seed/tappeti3/800/600',
    'https://picsum.photos/seed/tappeti4/800/600',
    'https://picsum.photos/seed/tappeti5/800/600',
  ];

  return (
    <div className="tappeti-page">
      <h1 className="tappeti-title">{t('tappetiPage.title')}</h1>
      <div className="swiper-container">
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
              <img src={src} alt={`Tappeti Carpet ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TappetiPage;
