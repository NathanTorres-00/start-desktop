import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "start-classic",
    name: "START. Classic",
    price: 38,
    color: "Black",
    shirtHex: "#1a1a1a",
    inkHex: "#c0c0c0",
    era: "win95",
    tag: "Flagship",
    description:
      "The button that started everything. Heavyweight cotton, a screen-printed Start flag, and nothing else competing for attention.",
  },
  {
    id: "my-computer",
    name: "My Computer",
    price: 38,
    color: "Ash",
    shirtHex: "#c8c4b8",
    inkHex: "#000080",
    era: "win95",
    tag: "Icon",
    description:
      "You are here. The beige box, the teal screen, the feeling that every file still lives in a nested folder somewhere.",
  },
  {
    id: "safe-to-turn-off",
    name: "Safe to Turn Off",
    price: 36,
    color: "Navy",
    shirtHex: "#000080",
    inkHex: "#ffffff",
    era: "win95",
    tag: "Shutdown",
    description:
      "It is now safe to turn off your computer. Or keep it on, go outside, and wear the message anyway.",
  },
  {
    id: "bliss",
    name: "Bliss",
    price: 42,
    color: "Sky",
    shirtHex: "#7eb6d9",
    inkHex: "#2f6b32",
    era: "winxp",
    tag: "Wallpaper",
    description:
      "Rolling green hills, a cloud that never moves, and the last wallpaper a lot of people ever needed.",
  },
  {
    id: "error-page",
    name: "Page Cannot Be Displayed",
    price: 36,
    color: "White",
    shirtHex: "#f4f0e4",
    inkHex: "#c00",
    era: "winxp",
    tag: "Error",
    description:
      "Internet Explorer's most honest moment, reprinted as a three-color graphic. The page cannot be displayed. The shirt can.",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export const SIZES = ["S", "M", "L", "XL"] as const;
