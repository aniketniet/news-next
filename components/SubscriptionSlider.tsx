'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ScrollToTopLink } from './scroll-to-top-link';

export default function SubscriptionSlider() {
  const subscriptionPlans = [
    {
      id: 1,
      image: '/sub.png',
    },
    {
      id: 2,
      image: '/sub1.png',
    },
    {
      id: 3,
      image: '/sub2.png',
    },
    {
      id: 4,
      image: '/sub3.png',
    },
    {
      id: 5,
      image: '/sub4.png',
    },

  ];

  return (
    <div className="w-full">
     {/* Header with progress bar */}
      <div className="px-3 py-2 flex-shrink-0">
        <h3 className="font-semibold text-lg">Subscription</h3>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded">
          <div className="h-full bg-black rounded" style={{ width: "20%" }} />
        </div>
      </div>

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
            <div className=" overflow-hidden transform transition-all duration-300  h-[300px]">
              <ScrollToTopLink href="/subscription" title="Subscribe to our newsletter">
              <div className="relative h-full overflow-hidden">
                <img
                  src={plan.image}
                  alt="Subscribe to our newsletter"
                  className="w-full h-full object-contain"
                />
              </div>
              </ScrollToTopLink>
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
      `}
      </style>
    </div>
  );
}