import { ICartItem } from "./interfaces";

export const isPresentInCart: (arr: ICartItem[], id: string) => boolean = (
  cartData: ICartItem[],
  id: string
) => {
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i]._id === id) return true;
  }
  return false;
};
