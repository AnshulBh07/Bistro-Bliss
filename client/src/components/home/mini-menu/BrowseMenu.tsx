import React, { useRef } from "react";
import { menuCategories } from "../../../services/data/miniMenu";
import { BrowseMenuCard } from "./BrowseMenuCard";
import styles from "../../../sass/miniMenuStyles.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export const BrowseMenu: React.FC = () => {
  // let's use a ref to contain slider wrapper and manipulate scroll on click
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleNextClick: () => void = () => {
    const element = wrapperRef.current;
    const child = cardRef.current;
    const offset = child!.clientWidth + 16 * 2;

    element?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handlePrevClick: () => void = () => {
    const element = wrapperRef.current;
    const child = cardRef.current;
    const offset = child!.clientWidth + 16 * 2;

    element?.scrollBy({ left: -offset, behavior: "smooth" });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>browse our menu</h2>

      <div className={styles.container_slider}>
        <div className={styles.slider_wrapper} ref={wrapperRef}>
          {menuCategories.map((item, index) => {
            return (
              <BrowseMenuCard category={item} key={index} cardRef={cardRef} />
            );
          })}
        </div>

        {/* creating buttons */}
        <button className={styles.btnPrev} onClick={handlePrevClick}>
          <IoIosArrowBack className={styles.icon} />
        </button>
        <button className={styles.btnNext} onClick={handleNextClick}>
          <IoIosArrowForward className={styles.icon} />
        </button>
      </div>
    </section>
  );
};
