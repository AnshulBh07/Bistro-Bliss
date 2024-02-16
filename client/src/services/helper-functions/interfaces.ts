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

// menu item modal data structure
export interface IMenuItemModalData {
  menuData: IMenuItem;
  showMenuItemModal: boolean;
  showQtyBar: boolean; //show quantity bar after clicking on add
}

// menu item data received from server
export interface IMenuItem {
  _id: string;
  title: string;
  category: string[];
  price: number;
  discount: string | null;
  description: string | null;
  image: string;
  rating: number;
  delivery_type: "fast" | "regular";
  cuisines: string[];
  veg: boolean;
  offer: string | null;
  created_at: string | null;
  updated_at: string | null;
  available: boolean;
}

export interface ICartItem {
  _id: string;
  title: string;
  category: string[];
  price: number;
  discount: string | null;
  description: string | null;
  image: string;
  rating: number;
  delivery_type: "fast" | "regular";
  cuisines: string[];
  veg: boolean;
  offer: string | null;
  created_at: string | null;
  updated_at: string | null;
  available: boolean;
  quantity: number;
}

export interface ICartModal {
  cartData: ICartItem[];
  showCartModal: boolean;
  cartTotal: number;
}
