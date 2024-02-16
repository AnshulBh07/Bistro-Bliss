export const categories: string[] = [
  "sort",
  "delivery time",
  "cuisines",
  "explore",
  "ratings",
  "veg/non-veg",
  "offers",
  "cost for two",
  "type",
];

export const sortTypes: string[] = [
  "relevance",
  "delivery time",
  "rating",
  "cost low to high",
  "cost high to low",
];
export const sortMap = new Map<number, string>([
  [0, "relevance"],
  [1, "delivery"],
  [2, "rating"],
  [3, "low-high"],
  [4, "high-low"],
]);

export const deliveryTime: string[] = ["Fast delivery", "Regular"];
export const deliveryMap = new Map<number, string>([
  [0, "fast"],
  [1, "regular"],
]);

export const cuisinesList: string[] = [
  "afghani",
  "american",
  "arabian",
  "bakery",
  "barbecue",
  "beverages",
  "biryani",
  "burgers",
  "cafe",
  "chat",
  "chinese",
  "continental",
  "desserts",
  "fast food",
  "grill",
  "healthy food",
  "home food",
  "ice cream",
  "ice cream cakes",
  "indian",
  "italian",
  "italian-American",
  "Jain",
  "juices",
  "Kebabs",
  "keto",
  "Mexican",
  "momos",
  "mughal",
  "north indian",
  "pastas",
  "pizzas",
  "punjabi",
  "rolls & wraps",
  "salads",
  "snacks",
  "south indian",
  "street food",
  "street",
  "tandoor",
  "thalis",
  "waffle",
];

export const exploreList: string[] = ["new", "most ordered", "hot right now"];
export const exploreMap = new Map<number, string>([
  [0, "new"],
  [1, "popular"],
  [2, "latest"],
]);

export const ratings: string[] = ["rating 4.5+", "rating 4.0+", "rating 3.5+"];
export const ratingMap = new Map<number, number>([
  [0, 4.5],
  [1, 4.0],
  [2, 3.5],
]);

export const foodTypeList: string[] = ["non veg", "pure veg"];

// make veg and non-veg manually
export const offersList: string[] = ["offers"];

export const cost42List: string[] = [
  "Rs. 300 - Rs. 600",
  "greater than Rs. 600",
  "less than Rs. 300",
];

export const typeList: string[] = [
  "breakfast",
  "dinner",
  "lunch",
  "starter",
  "rice",
  "dessert",
  "main dishes",
  "drinks",
  "snacks",
  "soups",
  "salads",
];

export const paramsList: string[] = [
  "sort",
  "delivery",
  "cuisine",
  "explore",
  "ratings",
  "veg",
  "offer",
  "cost",
  "type",
];

export const allCategories = new Map<number, string[]>([
  [0, sortTypes],
  [1, deliveryTime],
  [2, cuisinesList],
  [3, exploreList],
  [4, ratings],
  [5, foodTypeList],
  [6, offersList],
  [7, cost42List],
  [8, typeList],
]);
