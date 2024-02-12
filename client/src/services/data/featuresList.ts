import Content1 from "../../assets/images/content1.png";
import Content2 from "../../assets/images/content2.png";
import Content3 from "../../assets/images/content3.png";

export interface featureItem {
  title: string;
  image_link: string;
  description: string;
}

export const featureList: featureItem[] = [
  {
    title: "multi cuisine",
    image_link: Content1,
    description:
      "In the new era of technology we look in the future with certainity in life.",
  },
  {
    title: "easy to order",
    image_link: Content2,
    description:
      "In the new era of technology we look in the future with certainity in life.",
  },
  {
    title: "fast delivery",
    image_link: Content3,
    description:
      "In the new era of technology we look in the future with certainity in life.",
  },
];
