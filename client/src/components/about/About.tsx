import React, { useEffect } from "react";
import styles from "../../sass/aboutStyles.module.scss";
import { HomeBriefAbout } from "../home/brief-about/HomeBriefAbout";
import { Testimonials } from "../home/testimonials/Testimonials";
import { Video } from "./Video";
import { Stats } from "./Stats";

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.container}>
      <HomeBriefAbout />
      <Video />
      <Stats />
      <Testimonials />
    </div>
  );
};
