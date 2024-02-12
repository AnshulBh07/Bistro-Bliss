import WeddingImg from "../../assets/images/weddings.jpg";
import CateringImg from "../../assets/images/catering.jpg";
import EventImg from "../../assets/images/events.jpg";
import BdayImg from "../../assets/images/birthdays.jpg";

export interface serviceItem {
  img: string; // url of img
  title: string;
  description: string;
}

export const servicesList: serviceItem[] = [
  {
    img: WeddingImg,
    title: "weddings",
    description:
      "Happy marriages begin when we marry the ones we love, and they blossom when we love the ones we marry.",
  },
  {
    img: BdayImg,
    title: "birthdays",
    description:
      "Count your age by friends, not years. Count your life by smiles, not tears.",
  },
  {
    img: CateringImg,
    title: "caterings",
    description:
      "If you love what you do, you'll never work a day in your life.",
  },
  {
    img: EventImg,
    title: "events",
    description:
      "To achieve great things, two things are needed: a plan and not quite enough time.",
  },
];
