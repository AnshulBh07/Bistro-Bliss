import React, { useEffect, useState } from "react";
import styles from "../../sass/filterBandStyles.module.scss";
import { FiFilter } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { applied } from "../../services/helper-functions/interfaces";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import {
  allCategories,
  cost42List,
  cuisinesList,
  deliveryTime,
  exploreList,
  foodTypeList,
  offersList,
  paramsList,
  ratings,
  sortTypes,
  typeList,
} from "../../services/data/filterData";

export const FilterBand: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const filterState = useSelector((state: RootState) => state.filter);
  const dispatch: AppDispatch = useDispatch();
  const { appliedFilters } = filterState;

  // function that returns string value for each selected filter
  const getStringValue = (category: number, index: number) => {
    switch (category) {
      case 0:
        return sortTypes[index];
      case 1:
        return deliveryTime[index];
      case 2:
        return cuisinesList[index];
      case 3:
        return exploreList[index];
      case 4:
        return ratings[index];
      case 5:
        return foodTypeList[index];
      case 6:
        return offersList[index];
      case 7:
        return cost42List[index];
      case 8:
        return typeList[index];
      default:
        return "not found";
    }
  };

  const handleRemoveFilterTagClick = (item: applied) => {
    dispatch({
      type: "filter/remove",
      payload: { category: item.category, index: item.index },
    });

    // reset search params based on item passed in handler, can't do it based on state
    // because the state is old/stale
    searchParams.forEach((value, key) => {
      // if the key value is same as the category of param to be removed
      if (key === paramsList[item.category]) {
        // if the value for this key includes , then it is an array
        if (value.includes(".") && key !== "rating") {
          // convert value back to array, remove the value that was selected and form string
          // for value again, lastly set the string again
          const itemVal = allCategories.get(item.category)![item.index];
          const arr = value.split(".");

          arr.splice(arr.indexOf(String(itemVal)), 1);
          console.log(arr);

          let tempStr = "";
          for (let i = 0; i < arr.length; i++) {
            tempStr += arr[i] + ".";
          }
          tempStr = tempStr.slice(0, tempStr.length - 1);

          searchParams.set(key, tempStr);
          setSearchParams(searchParams);
        }
        // if it doesn't, simply delete the param
        else {
          searchParams.delete(key);
          setSearchParams(searchParams);
        }
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filterState));
  }, [filterState]);

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

            {/* {popularSearches.map((item, index) => {
              return (
                <button key={index} className={styles.popular_searches}>
                  {item}
                </button>
              );
            })} */}
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

                  searchParams.set("type", searchParams.get("type")!);
                  setSearchParams(searchParams);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // delete prev params first
                  paramsList.forEach((item) => {
                    searchParams.delete(item);
                    setSearchParams(searchParams);
                  });

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
                  <button
                    className={styles.filter_btn}
                    key={index}
                    onClick={() => handleRemoveFilterTagClick(item)}
                  >
                    <p>{getStringValue(item.category, item.index)}</p>
                    <CgClose className={styles.icon} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
