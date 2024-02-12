import React from "react";
import { cardItem } from "../../../services/data/miniMenu";
import styles from "../../../sass/menuCardStyles.module.scss";
import { Link } from "react-router-dom";

// data is not the only prop being passed, we can also have other props to a component ,
// create an interface that contains the props passed
interface IProps {
  category: cardItem;
  key: number;
  cardRef: React.RefObject<HTMLDivElement>;
}

export const BrowseMenuCard: React.FC<IProps> = ({
  category,
  cardRef,
}: IProps) => {
  return (
    <div className={styles.container} ref={cardRef}>
      <div className={styles.icon_title}>
        <div className={styles.icon_container}>{category.icon}</div>

        <p className={styles.title}>{category.title}</p>
      </div>

      <p className={styles.desc}>{category.description}</p>

      <Link to={category.link} className={styles.link}>
        Explore now
      </Link>
    </div>
  );
};
