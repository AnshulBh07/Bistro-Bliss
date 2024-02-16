import { ICartItem, ICartModal } from "../services/helper-functions/interfaces";

const val: ICartModal | null = JSON.parse(localStorage.getItem("cart")!);

const initialState: ICartModal = val
  ? val
  : {
      cartData: new Array<ICartItem>(),
      showCartModal: false,
      cartTotal: 0,
    };

type actionType = { type: string; payload?: ICartItem };

export const cartReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "cart/show":
      return { ...state, showCartModal: true };
    case "cart/hide":
      return { ...state, showCartModal: false };
    case "cart/add":
      return {
        ...state,
        cartData: [...state.cartData, action.payload!],
        cartTotal: state.cartTotal + action.payload!.price,
      };
    case "cart/incQty":
      return {
        ...state,
        cartData: state.cartData.map((item) => {
          if (item._id === action.payload?._id) {
            // now to avoid state mutation create a new object and return that as item
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        }),
        cartTotal: state.cartTotal + action.payload!.price,
      };
    case "cart/decQty":
      return {
        ...state,
        cartData: state.cartData.map((item) => {
          if (item._id === action.payload?._id) {
            // now to avoid state mutation create a new object and return that as item
            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        }),
        cartTotal: state.cartTotal - action.payload!.price,
      };
    case "cart/delete":
      return {
        ...state,
        cartData: state.cartData.filter((item) => {
          return item._id !== action.payload?._id;
        }),
        cartTotal:
          state.cartTotal - action.payload!.quantity * action.payload!.price,
      };
    default:
      return state;
  }
};
