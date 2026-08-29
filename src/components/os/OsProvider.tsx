"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/products";
import type {
  CartItem,
  IconName,
  OsTheme,
  OsWindow,
  Phase,
  WindowKind,
} from "@/lib/types";

const STORAGE_KEY = "start-os-theme";

type OpenOptions = {
  title: string
  icon: IconName
  kind: WindowKind
  w?: number
  h?: number
};

type OsContextValue = {
  theme: OsTheme
  phase: Phase
  windows: OsWindow[]
  activeId: string | null
  startOpen: boolean
  hintOpen: boolean
  cart: CartItem[]
  isMobile: boolean
  selectedIcon: string | null
  setSelectedIcon: (id: string | null) => void
  setStartOpen: (open: boolean) => void
  dismissHint: () => void
  chooseOs: (theme: OsTheme) => void
  restart: () => void
  shutdown: () => void
  wake: () => void
  setTheme: (theme: OsTheme) => void
  openWindow: (id: string, options: OpenOptions) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  moveWindow: (id: string, x: number, y: number) => void
  addToCart: (productId: string, size: CartItem["size"]) => void
  removeFromCart: (productId: string, size: CartItem["size"]) => void
  cartCount: number
};

const OsContext = createContext<OsContextValue | null>(null);

let zCounter = 10;

function nextZ() {
  zCounter += 1;
  return zCounter;
}

function defaultWindows(isMobile: boolean): OsWindow[] {
  if (isMobile) {
    return [
      {
        id: "welcome",
        title: "Welcome to START.",
        icon: "info",
        x: 0,
        y: 0,
        w: 360,
        h: 420,
        minimized: false,
        maximized: true,
        z: nextZ(),
        kind: { type: "welcome" },
      },
    ];
  }

  return [
    {
      id: "welcome",
      title: "Welcome to START.",
      icon: "info",
      x: 108,
      y: 24,
      w: 420,
      h: 340,
      minimized: false,
      maximized: false,
      z: nextZ(),
      kind: { type: "welcome" },
    },
    {
      id: "shop",
      title: "START. Shop",
      icon: "shop",
      x: 360,
      y: 88,
      w: 520,
      h: 420,
      minimized: false,
      maximized: false,
      z: nextZ(),
      kind: { type: "shop" },
    },
  ];
}

export function OsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<OsTheme>("win95");
  const [phase, setPhase] = useState<Phase>("boot");
  const [windows, setWindows] = useState<OsWindow[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const seedDesktop = useCallback((mobile: boolean) => {
    const initial = defaultWindows(mobile);
    setWindows(initial);
    setActiveId(initial[initial.length - 1]?.id ?? null);
    setStartOpen(false);
    setHintOpen(true);
  }, []);

  const chooseOs = useCallback(
    (next: OsTheme) => {
      setThemeState(next);
      window.localStorage.setItem(STORAGE_KEY, next);
      seedDesktop(window.matchMedia("(max-width: 767px)").matches);
      setPhase("desktop");
    },
    [seedDesktop],
  );

  const restart = useCallback(() => {
    setPhase("boot");
    setStartOpen(false);
    setWindows([]);
    setActiveId(null);
  }, []);

  const shutdown = useCallback(() => {
    setPhase("shutdown");
    setStartOpen(false);
  }, []);

  const wake = useCallback(() => {
    setPhase("boot");
  }, []);

  const setTheme = useCallback((next: OsTheme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const focusWindow = useCallback((id: string) => {
    const z = nextZ();
    setWindows((current) =>
      current.map((win) =>
        win.id === id ? { ...win, z, minimized: false } : win,
      ),
    );
    setActiveId(id);
    setStartOpen(false);
  }, []);

  const openWindow = useCallback(
    (id: string, options: OpenOptions) => {
      setWindows((current) => {
        const existing = current.find((win) => win.id === id);
        if (existing) {
          const z = nextZ();
          setActiveId(id);
          return current.map((win) =>
            win.id === id ? { ...win, z, minimized: false } : win,
          );
        }

        const z = nextZ();
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const offset = (current.length % 6) * 18;
        const next: OsWindow = {
          id,
          title: options.title,
          icon: options.icon,
          kind: options.kind,
          x: mobile ? 0 : 48 + offset,
          y: mobile ? 0 : 36 + offset,
          w: options.w ?? 420,
          h: options.h ?? 340,
          minimized: false,
          maximized: mobile,
          z,
        };
        setActiveId(id);
        return [...current, next];
      });
      setStartOpen(false);
    },
    [],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((current) => {
      const remaining = current.filter((win) => win.id !== id);
      setActiveId(remaining.at(-1)?.id ?? null);
      return remaining;
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((current) =>
      current.map((win) => (win.id === id ? { ...win, minimized: true } : win)),
    );
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((current) =>
      current.map((win) =>
        win.id === id ? { ...win, maximized: !win.maximized, minimized: false } : win,
      ),
    );
    setActiveId(id);
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((current) =>
      current.map((win) => (win.id === id ? { ...win, x, y } : win)),
    );
  }, []);

  const addToCart = useCallback((productId: string, size: CartItem["size"]) => {
    if (!getProduct(productId)) return;
    setCart((current) => {
      const match = current.find(
        (item) => item.productId === productId && item.size === size,
      );
      if (match) {
        return current.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }
      return [...current, { productId, size, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback(
    (productId: string, size: CartItem["size"]) => {
      setCart((current) =>
        current.filter(
          (item) => !(item.productId === productId && item.size === size),
        ),
      );
    },
    [],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );

  const value = useMemo<OsContextValue>(
    () => ({
      theme,
      phase,
      windows,
      activeId,
      startOpen,
      hintOpen,
      cart,
      isMobile,
      selectedIcon,
      setSelectedIcon,
      setStartOpen,
      dismissHint: () => setHintOpen(false),
      chooseOs,
      restart,
      shutdown,
      wake,
      setTheme,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      addToCart,
      removeFromCart,
      cartCount,
    }),
    [
      theme,
      phase,
      windows,
      activeId,
      startOpen,
      hintOpen,
      cart,
      isMobile,
      selectedIcon,
      chooseOs,
      restart,
      shutdown,
      wake,
      setTheme,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      addToCart,
      removeFromCart,
      cartCount,
    ],
  );

  return <OsContext.Provider value={value}>{children}</OsContext.Provider>;
}

export function useOs() {
  const ctx = useContext(OsContext);
  if (!ctx) {
    throw new Error("useOs must be used inside OsProvider");
  }
  return ctx;
}

export function openKnownWindow(
  openWindow: OsContextValue["openWindow"],
  id: string,
) {
  switch (id) {
    case "welcome":
      openWindow("welcome", {
        title: "Welcome to START.",
        icon: "info",
        kind: { type: "welcome" },
        w: 420,
        h: 340,
      });
      break;
    case "shop":
      openWindow("shop", {
        title: "START. Shop",
        icon: "shop",
        kind: { type: "shop" },
        w: 540,
        h: 430,
      });
      break;
    case "recycle":
      openWindow("recycle", {
        title: "Recycle Bin",
        icon: "recycle",
        kind: { type: "recycle" },
        w: 360,
        h: 260,
      });
      break;
    case "display":
      openWindow("display", {
        title: "Display Properties",
        icon: "display",
        kind: { type: "display" },
        w: 420,
        h: 360,
      });
      break;
    case "readme":
      openWindow("readme", {
        title: "README.TXT - Notepad",
        icon: "notepad",
        kind: { type: "readme" },
        w: 420,
        h: 360,
      });
      break;
    case "cart":
      openWindow("cart", {
        title: "Shopping Cart",
        icon: "cart",
        kind: { type: "cart" },
        w: 400,
        h: 320,
      });
      break;
    case "lookbook":
      openWindow("lookbook", {
        title: "Lookbook",
        icon: "folder",
        kind: { type: "lookbook" },
        w: 460,
        h: 380,
      });
      break;
    case "help":
      openWindow("help", {
        title: "How to use this desktop",
        icon: "help",
        kind: { type: "help" },
        w: 400,
        h: 320,
      });
      break;
    default:
      break;
  }
}
