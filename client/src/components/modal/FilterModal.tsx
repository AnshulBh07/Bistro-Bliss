import React from "react";
import styles from "../../sass/filterModalStyles.module.scss";
import {
  categories,
  cost42List,
  cuisinesList,
  deliveryTime,
  exploreList,
  foodTypeList,
  offersList,
  ratings,
  sortTypes,
  typeList,
  paramsList,
} from "../../services/data/filterData";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSearchParams } from "react-router-dom";
import { RadioList } from "./RadioList";
import { CheckBoxList } from "./CheckBoxList";

export const FilterModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.filter);
  const { category, showButtons } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(cuisines);
  // console.log(offers);
  // console.log(explore);
  // logic to handle clear button click
  const handleClearClick = () => {
    // clear filter state
    dispatch({ type: "filter/clear" });

    // clear search params
    for (let i = 0; i < paramsList.length; i++) {
      searchParams.delete(paramsList[i]);
    }

    setSearchParams(searchParams);
  };

  // logic to set all the filters in search params after apply click
  const handleApplyClick = () => {
    dispatch({ type: "filter/show" });
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
        style={{ height: showButtons ? "72%" : "" }}
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
                      dispatch({ type: "filter/category", payload: index })
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

      {showButtons && (
        <div className={styles.apply_wrapper}>
          <button className={styles.clear_btn} onClick={handleClearClick}>
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
