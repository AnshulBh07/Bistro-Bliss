import { allCategories } from "../services/data/filterData";
import { IFilterData } from "../services/helper-functions/interfaces";
import { applied } from "../services/helper-functions/interfaces";

// check if we have a state present in local storage, if we do use that
const val: IFilterData | null = JSON.parse(localStorage.getItem("filters")!);

const initialState: IFilterData = val
  ? val
  : {
      showFilterModal: false,
      category: 0,
      appliedFilters: new Array<applied>(),
    };

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "filter/show":
      return { ...state, showFilterModal: !state.showFilterModal };
    case "filter/setCategory":
      return { ...state, category: action.payload.category };
    case "filter/radioAdd":
      // avoid state mutation and replace old radio selection
      return {
        ...state,
        // if applied filters already contains that category replace it, else add new
        appliedFilters:
          state.appliedFilters.findIndex((item) => {
            return item.category === action.payload.category;
          }) === -1
            ? [
                ...state.appliedFilters,
                {
                  category: action.payload.category,
                  index: action.payload.index,
                  value: allCategories.get(action.payload.category)![
                    action.payload.index
                  ],
                },
              ]
            : state.appliedFilters.map((item) => {
                const chosenCat: number = action.payload.category;
                const chosenIndex: number = action.payload.index;

                if (item.category === chosenCat)
                  return {
                    category: chosenCat,
                    index: chosenIndex,
                    value: allCategories.get(chosenCat)![chosenIndex],
                  };

                return item;
              }),
      };
    case "filter/checkboxAdd":
      return {
        ...state,
        // if the selected item is already in applied filters, remove it, otherwise add it
        appliedFilters:
          state.appliedFilters.findIndex((item) => {
            return (
              item.category === action.payload.category &&
              item.index === action.payload.index
            );
          }) === -1
            ? [
                ...state.appliedFilters,
                {
                  category: action.payload.category,
                  index: action.payload.index,
                  value: allCategories.get(action.payload.category)![
                    action.payload.index
                  ],
                },
              ]
            : state.appliedFilters.filter((item) => {
                if (item.category === action.payload.category) {
                  return item.index !== action.payload.index;
                }

                return true;
              }),
      };
    case "filter/remove":
      return {
        ...state,
        appliedFilters: state.appliedFilters.filter((item) => {
          if (item.category === action.payload.category) {
            return item.index !== action.payload.index;
          }

          return true;
        }),
      };
    case "filter/clear":
      return {
        showFilterModal: true,
        category: 0,
        appliedFilters: new Array<applied>(),
      };
    default:
      return state;
  }
};
