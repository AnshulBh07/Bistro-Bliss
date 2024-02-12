import React from "react";
import styles from "../../sass/radioListStyles.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { GiCheckMark } from "react-icons/gi";

interface IProps {
  optionArray: string[];
  category: number;
  title: string;
}

export const CheckBoxList: React.FC<IProps> = ({
  optionArray,
  category,
  title,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { cuisines, explore, offers } = useSelector(
    (state: RootState) => state.filter
  );

  const handleCheckboxOptionSelect = (category: number, value: number) => {
    dispatch({ type: "filter/showBtns" });
    // if the index is already present in set then delete it
    // just create two different dispatches for when the value is included and when it isn't
    if (category === 2) {
      if (cuisines.includes(value))
        dispatch({
          type: "filter/cuisineRemove",
          payload: { category: category, value: value },
        });
      else
        dispatch({
          type: "filter/cuisineAdd",
          payload: { category: category, value: value },
        });
    }

    if (category === 3) {
      if (explore.includes(value)) {
        dispatch({
          type: "filter/exploreRemove",
          payload: { category: category, value: value },
        });
      } else
        dispatch({
          type: "filter/exploreAdd",
          payload: { category: category, value: value },
        });
    }

    if (category === 6) {
      if (offers.includes(value)) {
        dispatch({
          type: "filter/offerRemove",
          payload: { category: category, value: value },
        });
      } else
        dispatch({
          type: "filter/offerAdd",
          payload: { category: category, value: value },
        });
    }
  };

  let checkArr: number[];

  switch (category) {
    case 2:
      checkArr = cuisines;
      break;
    case 3:
      checkArr = explore;
      break;
    case 6:
      checkArr = offers;
      break;
    default:
      break;
  }

  return (
    <div className={styles.options}>
      <p>{title}</p>

      {optionArray.map((item, index) => {
        return (
          <label
            htmlFor={`${title}-type-${index + 1}`}
            key={index}
            className={styles.option_wrapper}
          >
            <input
              type="checkbox"
              name={`${title}-type-${index + 1}`}
              id={`${title}-type-${index + 1}`}
              onChange={() => handleCheckboxOptionSelect(category, index)}
            />
            {/* custom checkbox */}
            <div
              className={styles.checkbox}
              style={
                checkArr.includes(index)
                  ? {
                      backgroundColor: "#ad343e",
                      border: "2px solid #ad343e",
                    }
                  : {}
              }
            >
              <GiCheckMark className={styles.check} />
            </div>
            {item}
          </label>
        );
      })}
    </div>
  );
};
