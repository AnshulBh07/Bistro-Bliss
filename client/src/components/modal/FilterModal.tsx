import React from "react";
import styles from "../../sass/filterModalStyles.module.scss";
import {
  allCategories,
  categories,
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
import { AiOutlineClose } from "react-icons/ai";
import { RadioList } from "./RadioList";
import { CheckBoxList } from "./CheckBoxList";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const FilterModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { category, appliedFilters } = useSelector(
    (state: RootState) => state.filter
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handleApplyClick = () => {
    dispatch({ type: "filter/show" });

    // create an array where we will form the query parameter for each param value
    // this needs to be done because some params are combination of multiple values
    // e.g. cuisines param
    // each index in this array represent category parallel to paramsList
    const helperArr = new Array<string>(9).fill("");

    for (let i = 0; i < appliedFilters.length; i++) {
      const categoryIndex = appliedFilters[i].category;
      const valueIndex = appliedFilters[i].index;
      const value = allCategories.get(categoryIndex)![valueIndex];

      if (value !== null) {
        helperArr[categoryIndex] += value + ".";
      }
    }

    // trim to remove the last ,
    for (let i = 0; i < 9; i++) {
      helperArr[i] = helperArr[i].slice(0, helperArr[i].length - 1);
    }

    // now set these values as params
    for (let i = 0; i < 9; i++) {
      if (helperArr[i] !== "") {
        searchParams.set(paramsList[i], helperArr[i]);
        setSearchParams(searchParams);
      }
    }
  };

  const handleCloseClick = () => {
    dispatch({ type: "filter/clear" });

    // clear all search params
    for (let i = 0; i < paramsList.length; i++) {
      searchParams.delete(paramsList[i]);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Filter</h2>
        <button
          className={styles.close_btn}
          onClick={() => dispatch({ type: "filter/show" })}
        >
          <AiOutlineClose className={styles.icon} />
        </button>
      </div>

      <div
        className={styles.wrapper}
        style={{ height: appliedFilters.length > 0 ? "72%" : "" }}
      >
        {/* left category panel */}
        <div className={styles.category_wrapper}>
          <ul className={styles.category_list}>
            {categories.map((item, index) => {
              return (
                <li key={index}>
                  <div
                    className={styles.tooltip}
                    style={{
                      backgroundColor: index === category ? "#ad343e" : "#fff",
                    }}
                  ></div>

                  <button
                    className={styles.categoryItem}
                    style={{
                      backgroundColor: index === category ? "#f9f9f7" : "",
                    }}
                    onClick={() =>
                      dispatch({
                        type: "filter/setCategory",
                        payload: { category: index },
                      })
                    }
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* right choices panel for particular category*/}
        {/* for sorting */}
        {category == 0 && (
          <RadioList
            optionArray={sortTypes}
            category={category}
            title={"sort by"}
          />
        )}

        {/* for  delivery time*/}
        {category === 1 && (
          <RadioList
            optionArray={deliveryTime}
            category={category}
            title={"deliver by"}
          />
        )}

        {/* for cuisines */}
        {category === 2 && (
          <CheckBoxList
            optionArray={cuisinesList}
            category={category}
            title="cuisines"
          />
        )}

        {/* for explore */}
        {category === 3 && (
          <CheckBoxList
            optionArray={exploreList}
            category={category}
            title="explore by"
          />
        )}

        {/* for ratings */}
        {category == 4 && (
          <RadioList
            optionArray={ratings}
            category={category}
            title={"ratings"}
          />
        )}

        {/* for veg and non veg */}
        {category == 5 && (
          <RadioList
            optionArray={foodTypeList}
            category={category}
            title="Veg/Non-Veg"
          />
        )}

        {/* for cost 4 2 */}
        {category == 7 && (
          <RadioList
            optionArray={cost42List}
            category={category}
            title="price for two"
          />
        )}

        {/* for offers */}
        {category === 6 && (
          <CheckBoxList
            optionArray={offersList}
            category={category}
            title="offers"
          />
        )}

        {/* food type */}
        {category == 8 && (
          <RadioList
            optionArray={typeList}
            category={category}
            title="food type"
          />
        )}
      </div>

      {appliedFilters.length > 0 && (
        <div className={styles.apply_wrapper}>
          <button className={styles.clear_btn} onClick={handleCloseClick}>
            clear filters
          </button>
          <button className={styles.apply_btn} onClick={handleApplyClick}>
            apply
          </button>
        </div>
      )}
    </div>
  );
};
