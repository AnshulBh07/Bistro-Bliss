import React from "react";
import styles from "../../../sass/testimonialsStyles.module.scss";
import { testimonialsList } from "../../../services/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

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
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{ delay: 4000 }}
        className={styles.slider_wrapper}
      >
        {testimonialsList.map((item, index) => {
          console.log(index);
          return (
            <SwiperSlide key={index}>
              <TestimonialCard data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
