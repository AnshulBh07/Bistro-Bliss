import React, { useEffect } from "react";
import { Hero } from "./hero/Hero";
import styles from "../../sass/homeStyles.module.scss";
import { BrowseMenu } from "./mini-menu/BrowseMenu";
import { HomeBriefAbout } from "./brief-about/HomeBriefAbout";
import { Services } from "./our-services/Services";
import { HomeDelivery } from "./delivery/HomeDelivery";
import { Testimonials } from "./testimonials/Testimonials";

export const Home: React.FC = () => {
  // useEffect to scroll to the top if the component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.container}>
      <Hero />
      <BrowseMenu />
      <HomeBriefAbout />
      <Services />
      <HomeDelivery />
      <Testimonials />
    </div>
  );
};
