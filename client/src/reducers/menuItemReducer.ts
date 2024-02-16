import {
  IMenuItem,
  IMenuItemModalData,
} from "../services/helper-functions/interfaces";

const initialState: IMenuItemModalData = {
  menuData: {
    _id: "",
    title: "",
    category: new Array<string>(),
    price: -1,
    discount: null,
    description: null,
    image: "",
    rating: -1,
    delivery_type: "fast",
    cuisines: new Array<string>(),
    veg: true,
    offer: null,
    created_at: null,
    updated_at: null,
    available: true,
  },
  showMenuItemModal: false,
  showQtyBar: false,
};

type actionType = { type: string; payload?: IMenuItem };

export const menuItemReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "menuItemModal/show":
      return {
        ...state,
        showMenuItemModal: !state.showMenuItemModal,
        menuData: {
          ...initialState,
          _id: action.payload!._id,
          title: action.payload!.title,
          category: initialState.menuData.category.concat(
            action.payload!.category
          ),
          price: action.payload!.price,
          discount: action.payload!.discount,
          description: action.payload!.description,
          image: action.payload!.image,
          rating: action.payload!.rating,
          delivery_type: action.payload!.delivery_type,
          cuisines: initialState.menuData.cuisines.concat(
            action.payload!.cuisines
          ),
          veg: action.payload!.veg,
          offer: action.payload!.offer,
          created_at: action.payload!.created_at,
          updated_at: action.payload!.updated_at,
        },
      };
    case "menuItemModal/add":
      return { ...state, showQtyBar: !state.showQtyBar };
    default:
      return state;
  }
};
