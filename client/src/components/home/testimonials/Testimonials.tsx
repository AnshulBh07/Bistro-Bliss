import React from "react";
import styles from "../../../sass/testimonialsStyles.module.scss";
import { testimonialsList } from "../../../services/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Testimonials: React.FC = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>what our customers say</h1>

      {/* <Slider {...settings} className={styles.slider_wrapper}>
        {testimonialsList.map((item, index) => {
          return <TestimonialCard key={index} data={item} />;
        })}
      </Slider> */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {testimonialsList.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <TestimonialCard data={item} key={index} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
