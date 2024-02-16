import React from "react";
import styles from "../../sass/modalStyles.module.scss";
import { FilterModal } from "./FilterModal";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { MenuItemModal } from "./MenuItemModal";

export const Modal: React.FC = () => {
  const { showFilterModal } = useSelector((state: RootState) => state.filter);
  const { showMenuItemModal } = useSelector(
    (state: RootState) => state.menuItem
  );

  return (
    <div className={styles.container}>
      {showFilterModal && <FilterModal />}
      {showMenuItemModal && <MenuItemModal />}
    </div>
  );
};
