// filter data structure
export type applied = { category: number; index: number; value: string };

export interface IFilterData {
  showFilterModal: boolean; // show filter modal or not
  category: number; // category chosen
  showButtons: boolean;
  selected: number[]; //holds the index of selected option for each category(for radio inputs only)
  cuisines: number[]; // a set of number that holds selected cuisine indexes
  explore: number[];
  offers: number[];
  appliedFilters: applied[]; //array for applied filters
}
