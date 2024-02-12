import React from "react";
import styles from "../../sass/supportedAppsStyles.module.scss";
import UberEats from "../../assets/images/ubereats_logo.png";
import Grubhub from "../../assets/images/grubhub_logo.png";
import Postmates from "../../assets/images/posymates_logo.png";
import Foodpanda from "../../assets/images/foodpanda_logo.png";
import Zomato from "../../assets/images/zomato_logo.png";
import HealthifyMe from "../../assets/images/healthifyme_logo.png";
import Curefoods from "../../assets/images/curefoods_logo.png";
import Petpuja from "../../assets/images/petpuja_logo.png";
import Swiggy from "../../assets/images/swiggy_logo.png";

export const SupportedApps: React.FC = () => {
  const apps = [
    Zomato,
    Swiggy,
    UberEats,
    Grubhub,
    Postmates,
    Curefoods,
    HealthifyMe,
    Petpuja,
    Foodpanda,
  ];

  return (
    <section className={styles.container}>
      <div className={styles.text}>
        <h1>You can order through apps</h1>
        <p>
          You can order through any of these apps. Please note that the offers
          on products might change depending on what app you use.
        </p>
      </div>

      <div className={styles.logo_wrapper}>
        {apps.map((item, index) => {
          return (
            <div
              className={styles.logo_container}
              key={index}
              style={{ width: index >= 3 && index <= 5 ? "15rem" : "13rem" }}
            >
              <img src={item} alt="app logo" className={styles.logo_img} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
