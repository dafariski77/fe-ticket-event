import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";

import { useState } from "react";
import SwiperCore, { Autoplay, Pagination } from "swiper";

SwiperCore.use([Pagination]);

const SampleComponent = () => {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        slidesPerView={1.5}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
      >
        <SwiperSlide>
          <div className="slide">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">Slide 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">Slide 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">Slide 4</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SampleComponent;
