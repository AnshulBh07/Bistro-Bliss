import React, { useEffect, useState } from "react";
import styles from "../../sass/filterBandStyles.module.scss";
import { FiFilter } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { CgClose } from "react-icons/cg";
import { applied } from "../../services/helper-functions/interfaces";
import { useSearchParams } from "react-router-dom";
import { Modal } from "../modal/Modal";

export const FilterBand: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filter);
  const { showMenuItemModal } = useSelector(
    (state: RootState) => state.menuItem
  );
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { appliedFilters, showFilterModal } = filterState;
  console.log(appliedFilters);

  // now the most important task is to persist filter state in local storage so that it retains when the page loads
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filterState));
  }, [filterState]);

  let popularSearches: string[];
  popularSearches = ["breakfast", "main dishes", "wine", "ratatouille"];
  popularSearches.unshift("all");

  // only take the top 5
  popularSearches = popularSearches.slice(0, 5);

  const handleRemoveFilterTagClick = (category: number, index: number) => {
    // we have radio buttons and checkboxes call dispatch accordingly
    if (
      category === 0 ||
      category === 1 ||
      category === 4 ||
      category === 5 ||
      category === 7 ||
      category === 8
    ) {
      dispatch({
        type: "filter/radioRemove",
        payload: { category: category, value: index },
      });
    }
    // else it's a checkbox, remove depending on the category
    else {
      if (category === 2) {
        dispatch({
          type: "filter/cuisineRemove",
          payload: { category: category, value: index },
        });
      }
      if (category === 3) {
        dispatch({
          type: "filter/exploreRemove",
          payload: { category: category, value: index },
        });
      }
      if (category === 6) {
        dispatch({
          type: "filter/offerRemove",
          payload: { category: category, value: index },
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        {/* put in certain buttons */}
        <div className={styles.top}>
          <div className={styles.buttons_wrapper}>
            <button
              className={styles.filterBtn}
              onClick={() => dispatch({ type: "filter/show" })}
            >
              <p>Filter</p>
              <FiFilter className={styles.filter_icon} />
            </button>

            {popularSearches.map((item, index) => {
              return (
                <button key={index} className={styles.popular_searches}>
                  {item}
                </button>
              );
            })}
          </div>

          <label htmlFor="search" className={styles.search_bar}>
            <input
              type="text"
              name="search"
              placeholder="search keyword"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);

                if (e.target.value.length! === 0) {
                  searchParams.delete("key");
                  setSearchParams(searchParams);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchParams.set("key", searchKey);
                  setSearchParams(searchParams);
                }
              }}
            />
            <button className={styles.searchBtn}>
              <FaMagnifyingGlass className={styles.search_icon} />
            </button>
          </label>
        </div>

        {/* a band just under filter and popular searches that includes all the search params i.e. applied filters and search words */}
        {appliedFilters.length > 0 && (
          <div className={styles.bottom}>
            <p className={styles.header}>applied filters</p>

            <div className={styles.applied_wrapper}>
              {appliedFilters.map((item: applied, index: number) => {
                return (
                  <button className={styles.filter_btn} key={index}>
                    <p>{item.value}</p>
                    <CgClose
                      className={styles.icon}
                      onClick={() =>
                        handleRemoveFilterTagClick(item.category, item.index)
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {(showFilterModal || showMenuItemModal) && <Modal />}
    </React.Fragment>
  );
};
