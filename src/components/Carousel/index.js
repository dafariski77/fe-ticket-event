import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";

import { useState } from "react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import Image from "next/image";

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
          <Image
            src={"/img/persaja.jpg"}
            alt="event 1"
            height={400}
            width={800}
            className="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img/swara.jpg"}
            alt="event 1"
            height={400}
            width={800}
            className="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img/inquisitiv.png"}
            alt="event 1"
            height={400}
            width={800}
            className="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img/summer music.jpg"}
            alt="event 1"
            height={400}
            width={800}
            className="slide"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SampleComponent;
