// Ambient types for Rio3 — pure global declaration file (no imports/exports).
//
// All client-side files are loaded as independent <script type="text/babel"
// data-presets="env,react,typescript"> blocks and share state via
// script-scope `const` plus stamps onto `window`. We deliberately avoid
// `import` statements in those .tsx files so Babel keeps them in script
// mode and top-level `const`s remain visible across files. All types this
// project needs are declared globally here.
//
// `React` and `ReactDOM` are real runtime globals provided by the CDN
// <script> tags in index.html, so `React.FC<…>`, `React.CSSProperties`,
// etc. resolve without any import.

// ── Domain types ───────────────────────────────────────────────────

interface Brand {
  address: string;
  city: string;
  phone: string;
  email: string;
}

interface HourRow {
  day: string;
  open: string;
  closed?: boolean;
}

interface Category {
  id: string;
  label: string;
}

interface Treatment {
  id: string;
  cat: string;
  name: string;
  summary: string;
  duration: string;
  price: number;
  includes: string[];
  photoTag: string;
}

interface ProgramTier {
  id: string;
  name: string;
  tag: string;
  label?: string;
  featured?: boolean;
  features: string[];
}

interface Program {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  description: string;
  tiers: ProgramTier[];
}

interface Testimonial {
  quote: string;
  name: string;
  meta: string;
  stars: number;
}

interface Rio3Data {
  brand: Brand;
  hours: HourRow[];
  categories: Category[];
  treatments: Treatment[];
  programs: Program[];
  testimonials: Testimonial[];
  featuredIds: string[];
}

// ── Booking ────────────────────────────────────────────────────────

interface BookingConfig {
  mode: "demo" | "live";
  apiBase: string;
}

interface SquareSlot {
  startAt: string;
  teamMemberId: string;
  serviceVariationId: string;
  serviceVariationVersion?: number;
  durationMinutes?: number;
}

interface BookingReason {
  id: string;
  title: string;
  desc: string;
  price: string;
  squareServiceVariationId: string;
}

interface BookingPatient {
  first: string;
  last: string;
  email: string;
  phone: string;
  newPatient: boolean;
}

interface BookingFormData {
  reason: string | null;
  date: Date | null;
  time: string | null;
  slot: SquareSlot | null;
  first: string;
  last: string;
  email: string;
  phone: string;
  note: string;
  newPatient: boolean;
}

// ── Tweaks ─────────────────────────────────────────────────────────

type TweakValue = string | number | boolean | string[];
type TweakDefaults = Record<string, any>;
interface SetTweak {
  (key: string, value: any): void;
  (edits: Record<string, any>): void;
}

interface TweakOption<T = string> {
  value: T;
  label: string;
}

// ── React / Component prop shapes ──────────────────────────────────

type PageId = "home" | "treatments" | "programs" | "memberships" | "about" | "contact";

interface PageProps {
  onBook: () => void;
  setPage?: (p: PageId) => void;
}

interface HomeProps {
  onBook: () => void;
  onBookTreatment: () => void;
  setPage: (p: PageId) => void;
  heroVariant: "a" | "b" | "c";
}

interface NavProps {
  page: PageId;
  setPage: (p: PageId) => void;
  onBook: () => void;
}

interface FooterProps {
  setPage: (p: PageId) => void;
  onBook: () => void;
}

interface HeroProps {
  onBook: () => void;
  setPage: (p: PageId) => void;
}

interface TreatmentCardProps {
  t: Treatment;
  onBook: () => void;
}

interface BookingModalProps {
  onClose: () => void;
  mode?: "consultation" | "treatment";
}

// ── Window globals (cross-file glue) ───────────────────────────────

interface Window {
  // Data + config
  RIO3_DATA: Rio3Data;
  RIO3_BOOKING_CONFIG: BookingConfig;

  // Components
  Arrow: React.FC<{ rotate?: number; size?: number }>;
  LogoSlot: React.FC<{ id?: string; w?: number; h?: number; dark?: boolean }>;
  Brand: React.FC<{ size?: number; dark?: boolean }>;
  OzoneMolecule: React.FC<{ animate?: boolean }>;
  MapPlaceholder: React.FC;
  StripePh: React.FC<{ label: string; height?: string | number; style?: React.CSSProperties }>;

  // Nav
  TopBar: React.FC;
  Nav: React.FC<NavProps>;
  Marquee: React.FC;
  Footer: React.FC<FooterProps>;

  // Heroes
  HeroA: React.FC<HeroProps>;
  HeroB: React.FC<HeroProps>;
  HeroC: React.FC<HeroProps>;

  // Home
  Home: React.FC<HomeProps>;
  TreatmentCard: React.FC<TreatmentCardProps>;

  // Pages
  ProgramsPage: React.FC<PageProps>;
  TreatmentsPage: React.FC<PageProps>;
  MembershipsPage: React.FC<PageProps>;
  AboutPage: React.FC<PageProps>;
  ContactPage: React.FC<PageProps>;

  // Booking
  BookingModal: React.FC<BookingModalProps>;
  ConsultModal: React.FC<BookingModalProps>;

  // Tweaks panel API
  useTweaks: <T extends TweakDefaults>(defaults: T) => [T, SetTweak];
  TweaksPanel: React.FC<{ title?: string; noDeckControls?: boolean; children?: React.ReactNode }>;
  TweakSection: React.FC<{ label: string; children?: React.ReactNode }>;
  TweakRow: React.FC<{ label: string; value?: React.ReactNode; inline?: boolean; children?: React.ReactNode }>;
  TweakSlider: React.FC<any>;
  TweakToggle: React.FC<any>;
  TweakRadio: React.FC<any>;
  TweakSelect: React.FC<any>;
  TweakText: React.FC<any>;
  TweakNumber: React.FC<any>;
  TweakColor: React.FC<any>;
  TweakButton: React.FC<any>;
}

/// <reference types="react" />
/// <reference types="react-dom" />

// FC shorthand used in some pre-existing files
type FC<P = {}> = React.FC<P>;

// DirectorBlock and TestimonialsBlock are defined in home.tsx and used in pages.tsx
declare const DirectorBlock: React.FC;
declare const TestimonialsBlock: React.FC;

// <image-slot> custom element — used in JSX.
declare namespace JSX {
  interface IntrinsicElements {
    "image-slot": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        id?: string;
        shape?: "rect" | "rounded" | "circle" | "pill";
        radius?: string | number;
        mask?: string;
        fit?: "cover" | "contain" | "fill";
        position?: string;
        placeholder?: string;
        src?: string;
      },
      HTMLElement
    >;
  }
}
