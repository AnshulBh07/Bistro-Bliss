import React from "react";
import styles from "../../../sass/testimonialsStyles.module.scss";
import { testimonialsList } from "../../../services/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import Slider from "infinite-react-carousel";

export const Testimonials: React.FC = () => {
  const settings = {
    dots: true,
    slidesToShow: 3,
    swipe: true,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>what our customers say</h1>

      <Slider {...settings} className={styles.slider_wrapper}>
        {testimonialsList.map((item, index) => {
          return <TestimonialCard key={index} data={item} />;
        })}
      </Slider>
    </section>
  );
};
