import { ICartData } from "./interfaces";

export const isPresentInCart: (arr: ICartData[], id: string) => boolean = (
  cartData: ICartData[],
  id: string
) => {
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i]._id === id) return true;
  }
  return false;
};
