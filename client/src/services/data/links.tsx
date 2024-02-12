import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export interface socialItems {
  name: string;
  icon: JSX.Element;
  link: string;
}

export interface navigationLink {
  pathname: string;
  link: string;
}

export interface utilityLink extends navigationLink {}

export const social: socialItems[] = [
  {
    name: "facebook",
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/login",
  },
  {
    name: "instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/accounts/login",
  },
  {
    name: "twitter",
    icon: <FaTwitter />,
    link: "https://www.twitter.com/login",
  },
  {
    name: "tiktok",
    icon: <FaTiktok />,
    link: "https://www.tiktok.com/login",
  },
];

export const navLinks: navigationLink[] = [
  { pathname: "home", link: "/home" },
  { pathname: "about", link: "/about" },
  { pathname: "menu", link: "/menu" },
  { pathname: "pricing", link: "/pricing" },
  { pathname: "blog", link: "/blog" },
  { pathname: "contact", link: "/contact" },
  { pathname: "delivery", link: "/delivery" },
];

export const utilityLinks: utilityLink[] = [
  { pathname: "start here", link: "#" },
  { pathname: "style guide", link: "#" },
  { pathname: "password protected", link: "#" },
  { pathname: "404 not found", link: "#" },
  { pathname: "licenses", link: "#" },
  { pathname: "changelog", link: "#" },
  { pathname: "view more", link: "#" },
];
