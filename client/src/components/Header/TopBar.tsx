import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import styles from "../../sass/topBarStyles.module.scss";
import { social } from "../../services/data/links";

interface IProps {
  barRef: React.MutableRefObject<HTMLDivElement | null>;
}

const TopBar: React.FC<IProps> = ({ barRef }: IProps) => {
  type eventHandler = () => void;

  const handlePhoneClick: eventHandler = () => {
    location.href = "tel:4148570107";
  };

  const handleMailClick: eventHandler = () => {
    location.href = "mailto:yummy@bistrobliss.com";
  };

  return (
    <div className={styles.container} ref={barRef}>
      {/* phone and email */}
      <div className={styles.phone_email}>
        <div onClick={handlePhoneClick} className={styles.phone}>
          <FiPhoneCall className={styles.icon} /> <p>(414) 857 - 0107</p>
        </div>
        <div onClick={handleMailClick} className={styles.email}>
          <LuMail className={styles.icon} /> <p>yummy@bistrobliss</p>
        </div>
      </div>

      {/* social media icons */}
      <div className={styles.icons}>
        {social.map((item, index) => {
          return (
            <button
              className={styles.btn_icon}
              key={index}
              onClick={() => window.open(item.link)}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopBar;
