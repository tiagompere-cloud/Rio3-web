// Shared components (TypeScript).


interface ArrowProps {
  rotate?: number;
  size?: number;
}

const Arrow: React.FC<ArrowProps> = ({ rotate = 0, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" className="arr" style={{ transform: `rotate(${rotate}deg)` }}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface LogoSlotProps {
  id?: string;
  w?: number;
  h?: number;
  dark?: boolean;
}

const LogoSlot: React.FC<LogoSlotProps> = ({ id = "rio3-logo", w = 110, h = 40, dark = false }) => (
  <span className="logo-slot logo-slot-bare" style={{ width: w, height: h }}>
    <Brand size={Math.round(h * 0.78)} dark={dark} />
  </span>
);

interface BrandProps {
  size?: number;
  dark?: boolean;
}

const Brand: React.FC<BrandProps> = ({ size = 28, dark = false }) => (
  <span className="brand wordmark" style={{ fontSize: size }}>
    <span className="wm-ri" style={dark ? { color: "#ffffff" } : undefined}>Ri</span>
    <span className="wm-o">O</span>
    <span className="wm-sub">3</span>
  </span>
);

// O3 Molecule SVG — schematic, not anatomical
interface OzoneMoleculeProps {
  animate?: boolean;
}

const OzoneMolecule: React.FC<OzoneMoleculeProps> = ({ animate = true }) => (
  <svg viewBox="0 0 400 400" className="ozone-svg" role="img" aria-label="Ozone molecule (O₃) — three oxygen atoms">
    <defs>
      <radialGradient id="atomA" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#2aa3c8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#1d7fa0" />
      </radialGradient>
      <radialGradient id="atomB" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="55%" stopColor="#1a3a8a" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#0e2a3a" />
      </radialGradient>
    </defs>
    <g transform="translate(200 220)">
      {animate && (
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="60s" repeatCount="indefinite" />
      )}
      <line x1="-90" y1="40" x2="0" y2="-60" stroke="#0e2a3a" strokeWidth="1" opacity="0.3" />
      <line x1="90" y1="40" x2="0" y2="-60" stroke="#0e2a3a" strokeWidth="1" opacity="0.3" />
      <line x1="-90" y1="40" x2="90" y2="40" stroke="#0e2a3a" strokeWidth="1" opacity="0.15" strokeDasharray="3 4" />
      <circle cx="0" cy="-60" r="46" fill="url(#atomB)" />
      <circle cx="-90" cy="40" r="46" fill="url(#atomA)" />
      <circle cx="90" cy="40" r="46" fill="url(#atomA)" />
      <text x="0" y="-55" textAnchor="middle" fill="#fff" fontFamily="var(--logo-font)" fontWeight="700" fontSize="26">O</text>
      <text x="-90" y="46" textAnchor="middle" fill="#fff" fontFamily="var(--logo-font)" fontWeight="700" fontSize="26">O</text>
      <text x="90" y="46" textAnchor="middle" fill="#fff" fontFamily="var(--logo-font)" fontWeight="700" fontSize="26">O</text>
    </g>
    <text x="200" y="60" textAnchor="middle" fill="#0e2a3a" fontFamily="var(--mono)" fontSize="11" letterSpacing="2">OZONE — O₃</text>
  </svg>
);

const MapPlaceholder: FC = () => (
  <iframe
    src="https://www.google.com/maps?q=440+S+Federal+Hwy,+Deerfield+Beach,+FL+33441&output=embed"
    style={{ width: "100%", height: "100%", border: 0, display: "block" }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Rio3 location"
  />
);

const AppleMapsLink: FC = () => (
  <a
    href="https://maps.apple.com/?address=440+S+Federal+Hwy,+Suite+205,+Deerfield+Beach,+FL+33441"
    target="_blank"
    rel="noopener noreferrer"
    className="apple-maps-link"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.029 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
    </svg>
    Get directions
  </a>
);

// Striped placeholder block (used inside image slots as visual indicator)
interface StripePhProps {
  label: string;
  height?: string | number;
  style?: React.CSSProperties;
}

const StripePh: React.FC<StripePhProps> = ({ label, height = "100%", style = {} }) => (
  <div className="stripe-ph" style={{ height, width: "100%", ...style }}>
    {label}
  </div>
);

Object.assign(window, { Arrow, LogoSlot, Brand, OzoneMolecule, MapPlaceholder, AppleMapsLink, StripePh });
