'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function SubscriptionSlider() {
  const subscriptionPlans = [
    {
      id: 1,
      title: 'Basic Plan',
      price: '$9.99/mo',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      features: ['10 Projects', '5GB Storage', 'Basic Support']
    },
    {
      id: 2,
      title: 'Pro Plan',
      price: '$29.99/mo',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      features: ['Unlimited Projects', '50GB Storage', 'Priority Support']
    },
    {
      id: 3,
      title: 'Enterprise Plan',
      price: '$99.99/mo',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      features: ['Unlimited Everything', '500GB Storage', '24/7 Support']
    },
    {
      id: 4,
      title: 'Starter Plan',
      price: '$4.99/mo',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      features: ['5 Projects', '2GB Storage', 'Email Support']
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
    

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        navigation={true}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          },
         
        }}
        className="subscription-swiper"
      >
        {subscriptionPlans.map((plan) => (
          <SwiperSlide key={plan.id}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="relative  overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .subscription-swiper {
          padding: 20px 10px 50px;
        }
        
        .subscription-swiper .swiper-button-next,
        .subscription-swiper .swiper-button-prev {
          color: #2563eb;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .subscription-swiper .swiper-button-next:after,
        .subscription-swiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        
        .subscription-swiper .swiper-pagination-bullet {
          background: #2563eb;
          opacity: 0.5;
        }
        
        .subscription-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}