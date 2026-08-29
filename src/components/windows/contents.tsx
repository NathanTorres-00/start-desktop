"use client";

import { useState } from "react";
import { OsIcon, ShirtMockup } from "@/components/icons";
import { openKnownWindow, useOs } from "@/components/os/OsProvider";
import { PRODUCTS, SIZES, getProduct } from "@/lib/products";
import type { WindowKind } from "@/lib/types";

export function WindowContent({ kind }: { kind: WindowKind }) {
  switch (kind.type) {
    case "welcome":
      return <WelcomeBody />;
    case "shop":
      return <ShopBody />;
    case "product":
      return <ProductBody productId={kind.productId} />;
    case "recycle":
      return <RecycleBody />;
    case "display":
      return <DisplayBody />;
    case "readme":
      return <ReadmeBody />;
    case "cart":
      return <CartBody />;
    case "lookbook":
      return <LookbookBody />;
    case "help":
      return <HelpBody />;
  }
}

function WelcomeBody() {
  const { theme, openWindow, isMobile } = useOs();

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-3 p-3 sm:flex-row">
        <OsIcon name="info" size={40} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Welcome to START.</p>
          <p className="mt-2 leading-relaxed">
            This is a desktop, not a homepage. You are running{" "}
            <strong>{theme === "win95" ? "Windows 95" : "Windows XP"}</strong>{" "}
            in the browser — overlapping windows, a Start menu, and a shop that
            lives in Explorer.
          </p>
          <p className="mt-2 leading-relaxed">
            {isMobile
              ? "On a phone, windows open full-screen. Use the taskbar to switch, Start to open apps, and Display Properties to change OS."
              : "Drag title bars. Double-click icons. The Shop window is already open — that is where the tees live."}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 p-3">
        <button
          type="button"
          className="os-btn"
          onClick={() => openKnownWindow(openWindow, "help")}
        >
          Help
        </button>
        <button
          type="button"
          className="os-btn default"
          onClick={() => openKnownWindow(openWindow, "shop")}
        >
          Open Shop
        </button>
      </div>
    </div>
  );
}

function ShopBody() {
  const { openWindow } = useOs();

  return (
    <div className="flex h-full flex-col">
      <div className="explorer-toolbar">
        <OsIcon name="shop" size={18} />
        <span className="font-bold">C:\\START\\Shop</span>
      </div>
      <div className="product-grid flex-1 overflow-auto p-3">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            type="button"
            className="product-card"
            onClick={() =>
              openWindow(`product-${product.id}`, {
                title: `${product.name}.exe`,
                icon: "shirt",
                kind: { type: "product", productId: product.id },
                w: 380,
                h: 440,
              })
            }
          >
            <ShirtMockup
              shirtHex={product.shirtHex}
              inkHex={product.inkHex}
              label={product.tag.toUpperCase()}
            />
            <p className="mt-1 font-bold">{product.name}</p>
            <p>
              ${product.price} · {product.color}
            </p>
          </button>
        ))}
      </div>
      <div className="status-bar">
        <span>{PRODUCTS.length} object(s)</span>
        <span>Checkout is a later build</span>
      </div>
    </div>
  );
}

function ProductBody({ productId }: { productId: string }) {
  const product = getProduct(productId);
  const { addToCart, openWindow } = useOs();
  const [size, setSize] = useState<(typeof SIZES)[number]>("M");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="p-3">
        <p>This file could not be found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto p-3">
        <ShirtMockup
          shirtHex={product.shirtHex}
          inkHex={product.inkHex}
          label={product.tag.toUpperCase()}
        />
        <h2 className="mt-1 text-base font-bold">{product.name}</h2>
        <p className="mt-1">
          ${product.price}.00 · {product.color} ·{" "}
          {product.era === "win95" ? "95 collection" : "XP collection"}
        </p>
        <p className="mt-2 leading-relaxed">{product.description}</p>
        <label className="mt-3 flex items-center gap-2">
          Size
          <select
            className="os-field px-1 py-0.5"
            value={size}
            onChange={(event) =>
              setSize(event.target.value as (typeof SIZES)[number])
            }
          >
            {SIZES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        {added ? (
          <p className="mt-2">Added to cart. Checkout is not wired up yet.</p>
        ) : null}
      </div>
      <div className="flex justify-end gap-2 p-3">
        <button
          type="button"
          className="os-btn"
          onClick={() =>
            openWindow("cart", {
              title: "Shopping Cart",
              icon: "cart",
              kind: { type: "cart" },
              w: 400,
              h: 320,
            })
          }
        >
          View cart
        </button>
        <button
          type="button"
          className="os-btn default"
          onClick={() => {
            addToCart(product.id, size);
            setAdded(true);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function RecycleBody() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
      <OsIcon name="recycle" size={48} />
      <p className="font-bold">Recycle Bin is empty</p>
      <p>Dropped ideas, unused drop names, and last season’s hex codes go here.</p>
    </div>
  );
}

function DisplayBody() {
  const { theme, setTheme, closeWindow } = useOs();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto p-3">
        <p className="font-bold">Display Properties</p>
        <p className="mt-2">
          Two complete skins of the same shop. Switch without leaving the
          desktop — this is the prototype’s whole point.
        </p>
        <fieldset className="mt-4 space-y-2">
          <legend className="font-bold">Appearance</legend>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="os"
              checked={theme === "win95"}
              onChange={() => setTheme("win95")}
            />
            Windows 95 — teal, silver, navy title bars
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="os"
              checked={theme === "winxp"}
              onChange={() => setTheme("winxp")}
            />
            Windows XP — Bliss, Luna blue, green Start
          </label>
        </fieldset>
        <p className="mt-3">
          Mobile: windows go full-screen, icons sit in a row, Start becomes a
          sheet. Same files, different chrome.
        </p>
      </div>
      <div className="flex justify-end p-3">
        <button
          type="button"
          className="os-btn default"
          onClick={() => closeWindow("display")}
        >
          OK
        </button>
      </div>
    </div>
  );
}

function ReadmeBody() {
  return (
    <div className="h-full overflow-auto p-3">
      <pre className="sunken h-full overflow-auto whitespace-pre-wrap p-2 font-mono text-[12px] leading-relaxed">
        {`README.TXT
==========

START. is a clothing label that pretends to be a desktop.

The store is not a grid of hero images. It is My Computer:
windows you can drag, a taskbar that remembers what you
opened, and two operating systems because nostalgia is
not one color.

95 is the click. XP is the wallpaper.

Buying a shirt will land in a window too. Checkout, sizes,
and shipping are the next build. For now: browse, add to
cart, switch OS, sit with the feel.

- the intern who still uses 11px Tahoma`}
      </pre>
    </div>
  );
}

function CartBody() {
  const { cart, removeFromCart } = useOs();
  const [message, setMessage] = useState<string | null>(null);

  const lines = cart
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0,
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto p-3">
        {lines.length === 0 ? (
          <p>Your shopping cart is empty. Open Shop to add a shirt.</p>
        ) : (
          <ul className="space-y-2">
            {lines.map((line) => (
              <li
                key={`${line.productId}-${line.size}`}
                className="flex items-start justify-between gap-2"
              >
                <div>
                  <p className="font-bold">{line.product.name}</p>
                  <p>
                    Size {line.size} · Qty {line.qty} · $
                    {line.product.price * line.qty}
                  </p>
                </div>
                <button
                  type="button"
                  className="os-btn"
                  onClick={() => removeFromCart(line.productId, line.size)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {lines.length > 0 ? (
          <p className="mt-3 font-bold">Subtotal: ${total}.00</p>
        ) : null}
        {message ? <p className="mt-2">{message}</p> : null}
      </div>
      <div className="flex justify-end gap-2 p-3">
        <button
          type="button"
          className="os-btn default"
          disabled={lines.length === 0}
          onClick={() =>
            setMessage(
              "Checkout is not connected yet. The cart is here so we can plug in payments later.",
            )
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

function LookbookBody() {
  return (
    <div className="h-full overflow-auto p-3 leading-relaxed">
      <p className="font-bold">My Documents \\ Lookbook</p>
      <p className="mt-2">
        Shot on a CRT energy: heavy cotton, one graphic, no lifestyle crop.
        The 95 drop is silver and navy. The XP drop is sky and grass.
      </p>
      <p className="mt-2">
        Wear them like shortcuts. A Start flag on a black tee. Bliss as a
        chest print. An error dialog that is finally useful.
      </p>
      <p className="mt-2">
        Photography and product pages come next. This window is the mood
        board — type, color, and the idea that merch can feel like software.
      </p>
    </div>
  );
}

function HelpBody() {
  const { isMobile } = useOs();

  return (
    <div className="h-full overflow-auto p-3 leading-relaxed">
      <p className="font-bold">How to use this desktop</p>
      <ul className="mt-2 list-disc space-y-1 pl-4">
        <li>
          {isMobile
            ? "Tap an icon to open it full-screen. Switch apps from the taskbar."
            : "Double-click desktop icons. Drag a window by its title bar."}
        </li>
        <li>Start opens Shop, Lookbook, Display Properties, Restart, Shut Down.</li>
        <li>Display Properties switches Windows 95 and Windows XP live.</li>
        <li>Restart returns to the OS chooser. Shut Down is a joke, on purpose.</li>
        <li>Add to cart works. Paying for a shirt does not, yet.</li>
      </ul>
    </div>
  );
}
