import { ObjectId } from "mongodb";

// data definition for menu items
export interface IMenuItem {
  _id: ObjectId;
  title: string;
  category: string[];
  price: number;
  discount: number | null;
  description: string | null;
  image: string;
  rating: number;
  delivery_type: "fast" | "regular";
  cuisines: string[];
  veg: boolean;
  offer: string | null;
  available: boolean;
  created_at: Date;
  updated_at: Date;
}
