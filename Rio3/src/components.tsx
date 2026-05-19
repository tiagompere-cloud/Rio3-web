// Shared components (TypeScript).


interface ArrowProps {
  rotate?: number;
  size?: number;
}

const Arrow: React.FC<ArrowProps> = ({ rotate = 0, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="arr" style={{ transform: `rotate(${rotate}deg)` }}>
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
  <svg viewBox="0 0 400 400" className="ozone-svg">
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

// Map placeholder — schematic Deerfield Beach intersection
const MapPlaceholder: FC = () => (
  <svg viewBox="0 0 600 450" className="map-svg" preserveAspectRatio="xMidYMid slice">
    <rect width="600" height="450" fill="#ece8da" />
    {/* water */}
    <path d="M 450 0 L 600 0 L 600 450 L 480 450 Z" fill="#c8d5d0" opacity="0.55" />
    <text x="540" y="80" fill="#4f7361" fontFamily="var(--display)" fontStyle="italic" fontSize="14" textAnchor="middle" opacity="0.7">Atlantic</text>
    {/* park */}
    <rect x="60" y="50" width="120" height="90" fill="#cfd9c4" opacity="0.7" rx="2" />
    <text x="120" y="100" fill="#4f7361" fontFamily="var(--mono)" fontSize="9" textAnchor="middle">QUIET WATERS PARK</text>
    {/* main roads */}
    <line x1="0" y1="225" x2="600" y2="225" stroke="#fff" strokeWidth="14" />
    <line x1="0" y1="225" x2="600" y2="225" stroke="#d4b896" strokeWidth="2" strokeDasharray="8 8" />
    <line x1="300" y1="0" x2="300" y2="450" stroke="#fff" strokeWidth="12" />
    {/* secondary roads */}
    <line x1="0" y1="120" x2="600" y2="120" stroke="#fff" strokeWidth="6" />
    <line x1="0" y1="340" x2="600" y2="340" stroke="#fff" strokeWidth="6" />
    <line x1="150" y1="0" x2="150" y2="450" stroke="#fff" strokeWidth="6" />
    <line x1="430" y1="0" x2="430" y2="450" stroke="#fff" strokeWidth="6" />
    {/* labels */}
    <text x="20" y="218" fill="#4a5d6b" fontFamily="var(--mono)" fontSize="9">S FEDERAL HWY</text>
    <text x="310" y="14" fill="#4a5d6b" fontFamily="var(--mono)" fontSize="9">SE 1ST AVE</text>
    {/* building blocks */}
    <rect x="200" y="240" width="70" height="80" fill="#dcd5c2" rx="2" />
    <rect x="330" y="240" width="80" height="60" fill="#dcd5c2" rx="2" />
    <rect x="200" y="140" width="60" height="70" fill="#dcd5c2" rx="2" />
    <rect x="335" y="140" width="80" height="70" fill="#dcd5c2" rx="2" />
  </svg>
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

Object.assign(window, { Arrow, LogoSlot, Brand, OzoneMolecule, MapPlaceholder, StripePh });
