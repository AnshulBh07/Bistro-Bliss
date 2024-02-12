import { applied } from "../../reducers/filterReducer";

// this function is only useful for radio options, used to check whether the appliedFilters array already includes some item from category
export const appliedIncludes = (filters: applied[], category: number) => {
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].category === category) return true;
  }

  return false;
};
