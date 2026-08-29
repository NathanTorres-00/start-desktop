export type OsTheme = "win95" | "winxp";

export type Phase = "boot" | "desktop" | "shutdown";

export type IconName =
  | "computer"
  | "recycle"
  | "folder"
  | "notepad"
  | "display"
  | "shop"
  | "cart"
  | "internet"
  | "document"
  | "info"
  | "error"
  | "shirt"
  | "paint"
  | "help";

export type WindowKind =
  | { type: "welcome" }
  | { type: "shop" }
  | { type: "product"; productId: string }
  | { type: "recycle" }
  | { type: "display" }
  | { type: "readme" }
  | { type: "cart" }
  | { type: "lookbook" }
  | { type: "help" };

export type OsWindow = {
  id: string
  title: string
  icon: IconName
  x: number
  y: number
  w: number
  h: number
  minimized: boolean
  maximized: boolean
  z: number
  kind: WindowKind
};

export type CartItem = {
  productId: string
  size: "S" | "M" | "L" | "XL"
  qty: number
};

export type Product = {
  id: string
  name: string
  price: number
  color: string
  shirtHex: string
  inkHex: string
  era: OsTheme
  tag: string
  description: string
};
