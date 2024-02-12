import React from "react";
import styles from "../../../sass/testimonialCardStyles.module.scss";
import { testimonialItem } from "../../../services/data/testimonials";

interface IProps {
  data: testimonialItem;
}

export const TestimonialCard: React.FC<IProps> = ({ data }: IProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.quote}>{`"${data.quote}"`}</p>
      <p className={styles.desc}>{data.description}</p>

      <div className={styles.details}>
        <hr className={styles.separator} />

        <div className={styles.personal_info}>
          <div className={styles.img_container}>
            <img
              src={data.profileImg}
              alt="profile pic"
              className={styles.pic}
            />
          </div>
          <div className={styles.personal_details}>
            <p className={styles.name}>{data.name}</p>
            <p className={styles.location}>{data.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
