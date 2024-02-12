import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import styles from "../../../sass/contactBlockStyles.module.scss";

export const ContactBlock: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Come and visit us</p>

      <div className={styles.info}>
        <div className={styles.desc}>
          <FiPhoneCall className={styles.icon} /> (414) 857 - 0107
        </div>
        <div className={styles.desc}>
          <MdOutlineMailOutline className={styles.icon} />
          happytummy@restaurant.com
        </div>
        <div className={styles.desc}>
          <GrLocation
            className={styles.icon}
            style={{ height: "2rem", width: "2rem" }}
          />{" "}
          M-39, Shankar Market, Block M, Connaught Place, New Delhi, Delhi
          110001
        </div>
      </div>
    </div>
  );
};
