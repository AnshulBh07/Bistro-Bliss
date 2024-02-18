import axios from "axios";
import { IMenuItem, paramsObjectType } from "./interfaces";

// async function to fetch menu items
export const fetchMenuItems = async (
  signal: AbortSignal,
  pageNum: number,
  paramsObject: paramsObjectType
) => {
  try {
    const response = await axios({
      signal: signal,
      method: "get",
      url: "http://localhost:3001/menu_items",
      params: {
        page: pageNum,
        sort: paramsObject.sort,
        delivery: paramsObject.delivery,
        cuisines: paramsObject.cuisines,
        explore: paramsObject.explore,
        rating: paramsObject.rating,
      },
    });

    const results: IMenuItem[] = response.data;

    return results;
  } catch (err) {
    console.log(err);
  }
};
