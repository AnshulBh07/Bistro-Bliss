import React, { useEffect } from "react";
import styles from "../../sass/menuStyles.module.scss";
import { SupportedApps } from "./SupportedApps";
import { FilterBand } from "./FilterBand";
import { Modal } from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import {
  paramsList,
  sortMap,
  deliveryMap,
  cuisinesList,
  exploreList,
  ratingMap,
  offersList,
  typeList,
} from "../../services/data/filterData";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MenuItemCard } from "./MenuItemCard";

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterState = useSelector((state: RootState) => state.filter);

  const { showFilterModal, selected, cuisines, explore, offers } = filterState;
  console.log("rendering menu...");

  useEffect(() => {
    // now we have two types of inputs, radio input and checkbox
    // 1. checking for sort type
    if (selected[0] !== -1) {
      searchParams.set(paramsList[0], sortMap.get(selected[0])!);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[0]);
      setSearchParams(searchParams);
    }

    // 2. for delivery
    if (selected[1] !== -1) {
      searchParams.set(paramsList[1], deliveryMap.get(selected[1])!);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[1]);
      setSearchParams(searchParams);
    }

    // 3. for cuisines
    if (cuisines.length > 0) {
      // create a string of cuisines type separated by +
      let cuisineParam: string = "";

      for (let i = 0; i < cuisines.length; i++) {
        cuisineParam += cuisinesList[cuisines[i]] + "-";
      }

      cuisineParam = cuisineParam.slice(0, cuisineParam.length - 1);

      searchParams.set(paramsList[2], cuisineParam);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[2]);
      setSearchParams(searchParams);
    }

    // 4. for explore
    if (explore.length > 0) {
      let exploreParam: string = "";

      for (let i = 0; i < explore.length; i++) {
        exploreParam += exploreList[explore[i]] + "-";
      }

      exploreParam = exploreParam.slice(0, exploreParam.length - 1);

      searchParams.set(paramsList[3], exploreParam);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[3]);
      setSearchParams(searchParams);
    }

    // 5. ratings
    if (selected[4] !== -1) {
      searchParams.set(paramsList[4], String(ratingMap.get(selected[4])!));
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[4]);
      setSearchParams(searchParams);
    }

    // 6. veg or non veg
    if (selected[5] !== -1) {
      searchParams.set(paramsList[5], String(selected[5]));
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[5]);
      setSearchParams(searchParams);
    }

    // 7. offers
    if (offers.length > 0) {
      let offerParam: string = "";

      for (let i = 0; i < offers.length; i++) {
        offerParam += offersList[offers[i]] + "-";
      }

      offerParam = offerParam.slice(0, offerParam.length - 1);

      searchParams.set(paramsList[6], offerParam);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[6]);
      setSearchParams(searchParams);
    }

    // 8 cost for two
    // 9 for type
    if (selected[8] !== -1) {
      searchParams.set(paramsList[8], typeList[selected[8]]);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramsList[8]);
      setSearchParams(searchParams);
    }
  }, [cuisines, explore, offers, searchParams, selected, setSearchParams]);

  // now the most important task is to persist filter state in local storage so that it retains when the page loads
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filterState));
  }, [filterState]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>our menu</h1>
        <p>
          We consider all the drivers of change gives you the components you
          need to change to create what you truly want to happen.
        </p>

        <FilterBand />
      </section>

      {/* section for items grid */}
      <section className={styles.items}>
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
      </section>

      <SupportedApps />

      {showFilterModal && <Modal />}
    </div>
  );
};
