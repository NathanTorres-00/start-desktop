import type { IconName } from "@/lib/types";

type IconProps = {
  name: IconName
  size?: number
  className?: string
};

export function OsIcon({ name, size = 32, className }: IconProps) {
  switch (name) {
    case "computer":
      return <ComputerIcon size={size} className={className} />;
    case "recycle":
      return <RecycleIcon size={size} className={className} />;
    case "folder":
      return <FolderIcon size={size} className={className} />;
    case "notepad":
      return <NotepadIcon size={size} className={className} />;
    case "display":
      return <DisplayIcon size={size} className={className} />;
    case "shop":
      return <ShopIcon size={size} className={className} />;
    case "cart":
      return <CartIcon size={size} className={className} />;
    case "internet":
      return <InternetIcon size={size} className={className} />;
    case "document":
      return <DocumentIcon size={size} className={className} />;
    case "info":
      return <InfoIcon size={size} className={className} />;
    case "error":
      return <ErrorIcon size={size} className={className} />;
    case "shirt":
      return <ShirtIcon size={size} className={className} />;
    case "paint":
      return <PaintIcon size={size} className={className} />;
    case "help":
      return <HelpIcon size={size} className={className} />;
  }
}

export function WindowsLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="win-logo"
    >
      <path fill="#f14c28" d="M1 2.2 7.2 1.4v6.2H1z" />
      <path fill="#7cbb3d" d="M8.2 1.3 15 0.4v7.2H8.2z" />
      <path fill="#00a1f1" d="M1 8.8h6.2V15L1 14.1z" />
      <path fill="#ffb900" d="M8.2 8.8H15V15.6L8.2 14.8z" />
    </svg>
  );
}

function ComputerIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="3" width="24" height="18" fill="#c3c7cb" stroke="#000" strokeWidth="1" />
      <rect x="6" y="5" width="20" height="13" fill="#008080" />
      <rect x="8" y="7" width="8" height="2" fill="#00e8d8" />
      <rect x="10" y="22" width="12" height="2" fill="#c3c7cb" stroke="#000" />
      <rect x="6" y="24" width="20" height="4" fill="#c3c7cb" stroke="#000" />
      <rect x="22" y="25" width="2" height="2" fill="#00a200" />
    </svg>
  );
}

function RecycleIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 4 9 10h4v6h6v-6h4zm-9 14 3 10h12l3-10H7z"
        fill="#7a9a4a"
        stroke="#2f4a16"
        strokeWidth="1"
      />
      <path d="M12 8.5 16 5l1.2 3.2" fill="none" stroke="#cfe89a" strokeWidth="1.4" />
    </svg>
  );
}

function FolderIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 8h8l2 3h14v14H4z" fill="#f2d36b" stroke="#7a5b12" />
      <path d="M4 12h24v13H4z" fill="#e6c04a" />
    </svg>
  );
}

function NotepadIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="7" y="3" width="18" height="26" fill="#fbf7d5" stroke="#333" />
      <rect x="7" y="3" width="18" height="4" fill="#000080" />
      <path d="M10 11h12M10 15h12M10 19h9" stroke="#333" strokeWidth="1.4" />
    </svg>
  );
}

function DisplayIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="3" y="4" width="26" height="18" fill="#c3c7cb" stroke="#000" />
      <rect x="5" y="6" width="22" height="13" fill="#3a6ea5" />
      <rect x="12" y="22" width="8" height="3" fill="#c3c7cb" stroke="#000" />
      <rect x="8" y="25" width="16" height="3" fill="#c3c7cb" stroke="#000" />
    </svg>
  );
}

function ShopIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M6 12h20l-2 16H8z" fill="#c47a2c" stroke="#5a3208" />
      <path d="M8 12 10 4h12l2 8" fill="#e8c46a" stroke="#5a3208" />
      <circle cx="12" cy="20" r="2" fill="#f4e4b0" />
      <circle cx="20" cy="20" r="2" fill="#f4e4b0" />
    </svg>
  );
}

function CartIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 8h4l3 14h13l3-10H10" fill="none" stroke="#222" strokeWidth="2" />
      <circle cx="14" cy="26" r="2.2" fill="#222" />
      <circle cx="23" cy="26" r="2.2" fill="#222" />
    </svg>
  );
}

function InternetIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#3d7ea6" stroke="#123" />
      <ellipse cx="16" cy="16" rx="6" ry="12" fill="none" stroke="#d7f3ff" />
      <path d="M5 16h22M7 10h18M7 22h18" stroke="#d7f3ff" />
    </svg>
  );
}

function DocumentIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M8 4h11l7 7v17H8z" fill="#f8f8f8" stroke="#333" />
      <path d="M19 4v7h7" fill="none" stroke="#333" />
    </svg>
  );
}

function InfoIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#000080" />
      <rect x="14.5" y="13" width="3" height="10" fill="#fff" />
      <rect x="14.5" y="8" width="3" height="3" fill="#fff" />
    </svg>
  );
}

function ErrorIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#c00" />
      <path d="M10 10l12 12M22 10 10 22" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

function ShirtIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M10 6 16 9l6-3 5 4-4 3v14H9V13L5 10z"
        fill="#d0d0d0"
        stroke="#222"
      />
    </svg>
  );
}

function PaintIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="5" y="4" width="22" height="18" fill="#fff" stroke="#222" />
      <rect x="5" y="22" width="22" height="6" fill="#c0c0c0" stroke="#222" />
      <rect x="7" y="24" width="3" height="3" fill="#c00" />
      <rect x="11" y="24" width="3" height="3" fill="#00a" />
      <rect x="15" y="24" width="3" height="3" fill="#0a0" />
      <rect x="19" y="24" width="3" height="3" fill="#ff0" />
    </svg>
  );
}

function HelpIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="#00a" />
      <text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="serif">
        ?
      </text>
    </svg>
  );
}

export function ShirtMockup({
  shirtHex,
  inkHex,
  label,
}: {
  shirtHex: string
  inkHex: string
  label: string
}) {
  return (
    <svg viewBox="0 0 160 170" className="shirt-mockup" aria-hidden="true">
      <path
        d="M40 28 80 42l40-14 22 18-18 14v88H36V60L18 46z"
        fill={shirtHex}
        stroke="#111"
        strokeWidth="2"
      />
      <path d="M62 34c4 14 32 14 36 0" fill="none" stroke="#111" strokeWidth="2" />
      <text
        x="80"
        y="104"
        textAnchor="middle"
        fontSize="11"
        fontFamily="Tahoma, sans-serif"
        fontWeight="700"
        fill={inkHex}
      >
        {label}
      </text>
    </svg>
  );
}
