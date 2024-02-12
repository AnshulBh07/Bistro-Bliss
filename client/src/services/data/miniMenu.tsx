import { FiCoffee } from "react-icons/fi";
import { LuCakeSlice } from "react-icons/lu";
import { BiBowlRice } from "react-icons/bi";
import { BiDrink } from "react-icons/bi";
import { CiFries } from "react-icons/ci";
import { TbSoup } from "react-icons/tb";
import { LuSalad } from "react-icons/lu";
import styles from "../../sass/menuCardStyles.module.scss";

export interface cardItem {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
}

export const menuCategories: cardItem[] = [
  {
    icon: <FiCoffee className={styles.icon} />,
    title: "breakfast",
    description:
      "Breakfast is everything. The beginning, the first thing. It is the mouthful that is the commitment to a new day.",
    link: "/menu?type=breakfast",
  },
  {
    icon: <LuCakeSlice className={styles.icon} />,
    title: "dessert",
    description:
      "Desserts are the fairy tales of the kitchen, a happily-ever-after to supper.",
    link: "/menu?type=dessert",
  },
  {
    icon: <BiBowlRice className={styles.icon} />,
    title: "Main Dishes",
    description:
      "Food, in the end, in our own tradition, is something holy. It's not about nutrients and calories. It's about sharing. It's about honesty. It's about identity.",
    link: "/menu?type=main-dish",
  },
  {
    icon: <BiDrink className={styles.icon} />,
    title: "Drinks",
    description:
      "It takes only one drink to get me drunk. The trouble is, I can’t remember if it’s the thirteenth or the fourteenth.",
    link: "/menu?type=drinks",
  },
  {
    icon: <CiFries className={styles.icon} />,
    title: "Snacks",
    description: "Whatever happens in your life, just have a snack.",
    link: "/menu?type=snacks",
  },
  {
    icon: <TbSoup className={styles.icon} />,
    title: "Soups",
    description:
      "Soup is a lot like a family. Each ingredient enhances the others; each batch has its own characteristics; and it needs time to simmer to reach full flavor.",
    link: "/menu?type=soups",
  },
  {
    icon: <LuSalad className={styles.icon} />,
    title: "Salads",
    description: "Eating greens and living out dreams.",
    link: "/menu?type=breakfast",
  },
];
