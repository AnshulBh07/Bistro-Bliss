import { allCategories, categories } from "../services/data/filterData";
import { appliedIncludes } from "../services/helper-functions/appliedRadioIncludes";
import { IFilterData } from "../services/helper-functions/interfaces";

// check if we have a state present in local storage, if we do use that
const val: IFilterData | null = JSON.parse(localStorage.getItem("filters")!);

const iniState = {
  showFilterModal: false,
  category: 0,
  selected: new Array(categories.length).fill(-1),
  showButtons: false,
  cuisines: [],
  explore: [],
  offers: [],
  appliedFilters: [],
};

const initialState: IFilterData = val ? val : iniState;

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "filter/show":
      return { ...state, showFilterModal: !state.showFilterModal };
    case "filter/category":
      return { ...state, category: action.payload };
    case "filter/radioSelect":
      // in order to change an array we will have to create a new one and reassign to old
      // use map function for that
      return {
        ...state,
        selected: state.selected.map((item, index) => {
          if (index === action.payload.category) {
            item = action.payload.index;
          }

          return item;
        }),
        // if the applied filters already include some other option for given category then delete the element of given category and insert new element, if the element is not present simply add it to array
        appliedFilters: appliedIncludes(
          state.appliedFilters,
          action.payload.category
        )
          ? [
              ...state.appliedFilters.filter((item) => {
                return item.category !== action.payload.category;
              }),
              {
                category: action.payload.category,
                index: action.payload.index,
                value: allCategories.get(action.payload.category)![
                  action.payload.index
                ],
              },
            ]
          : [
              ...state.appliedFilters,
              {
                category: action.payload.category,
                index: action.payload.index,
                value: allCategories.get(action.payload.category)![
                  action.payload.index
                ],
              },
            ],
      };
    case "filter/radioRemove":
      return {
        ...state,
        selected: state.selected.map((item, index) => {
          if (index === action.payload.category) item = -1;

          return item;
        }),
        // remove item with given category
        appliedFilters: state.appliedFilters.filter((item) => {
          return item.category !== action.payload.category;
        }),
      };
    case "filter/showBtns":
      return { ...state, showButtons: true };
    case "filter/clear":
      return {
        ...iniState,
        category: state.category,
        showFilterModal: true,
        showButtons: true,
      };
    case "filter/cuisineAdd":
      return {
        ...state,
        cuisines: [...state.cuisines, action.payload.value],
        // add to applied filters too
        appliedFilters: [
          ...state.appliedFilters,
          {
            category: action.payload.category,
            index: action.payload.value,
            value: allCategories.get(action.payload.category)![
              action.payload.value
            ],
          },
        ],
      };
    case "filter/cuisineRemove":
      return {
        ...state,
        cuisines: state.cuisines.filter((item) => {
          return item !== action.payload.value;
        }),
        // remove item with given category and index
        appliedFilters: state.appliedFilters.filter((item) => {
          if (item.category === item.category) {
            return item.index !== action.payload.value;
          }

          return true;
        }),
      };
    case "filter/offerAdd":
      return {
        ...state,
        offers: [...state.offers, action.payload.value],
        // add to applied filters too
        appliedFilters: [
          ...state.appliedFilters,
          {
            category: action.payload.category,
            index: action.payload.value,
            value: allCategories.get(action.payload.category)![
              action.payload.value
            ],
          },
        ],
      };
    case "filter/offerRemove":
      return {
        ...state,
        offers: state.offers.filter((item) => {
          return item !== action.payload.value;
        }),

        // remove item with given category and index
        appliedFilters: state.appliedFilters.filter((item) => {
          if (item.category === action.payload.category) {
            return item.index !== action.payload.value;
          }

          return true;
        }),
      };
    case "filter/exploreAdd":
      return {
        ...state,
        explore: [...state.explore, action.payload.value],
        // add to applied filters too
        appliedFilters: [
          ...state.appliedFilters,
          {
            category: action.payload.category,
            index: action.payload.value,
            value: allCategories.get(action.payload.category)![
              action.payload.value
            ],
          },
        ],
      };
    case "filter/exploreRemove":
      return {
        ...state,
        explore: state.explore.filter((item) => {
          return item !== action.payload.value;
        }),

        // remove item with given category and index
        appliedFilters: state.appliedFilters.filter((item) => {
          if (item.category === action.payload.category) {
            return item.index !== action.payload.value;
          }

          return true;
        }),
      };
    default:
      return state;
  }
};
