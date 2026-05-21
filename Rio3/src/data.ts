// Shared data + content for Rio3 (TypeScript).
//
// Loaded via Babel's TS preset and stamped onto window.RIO3_DATA so the
// rest of the app (all of which runs in shared global scope) can read it.

const RIO3_DATA: Rio3Data = {
  brand: {
    address: "440 S Federal Hwy, Suite 205",
    city: "Deerfield Beach, FL 33441",
    phone: "(561) 699-3124",
    email: "hello@rio3usa.com",
  },

  hours: [
    { day: "Monday",    open: "9:00 — 6:00" },
    { day: "Tuesday",   open: "9:00 — 6:00" },
    { day: "Wednesday", open: "9:00 — 7:00" },
    { day: "Thursday",  open: "9:00 — 7:00" },
    { day: "Friday",    open: "9:00 — 6:00" },
    { day: "Saturday",  open: "10:00 — 3:00" },
    { day: "Sunday",    open: "Closed", closed: true },
  ],

  // Categories ordered by realized revenue (Aug 2025 + Jan 2026 sales data).
  categories: [
    { id: "ozone",       label: "Ozone Therapy" },
    { id: "regen",       label: "Regenerative & Joint" },
    { id: "iv",          label: "IV & Hydration" },
    { id: "diagnostic",  label: "Diagnostics & Consults" },
    { id: "injectables", label: "Injectables" },
  ],

  // Treatments listed in revenue order within each category.
  treatments: [
    // ── Ozone Therapy ───────────────────────────────────────────────
    {
      id: "intestinal", cat: "ozone", name: "Intestinal Ozone (Enema + Insufflation)",
      summary: "Our most-requested protocol. Rectal ozone insufflation paired with an enema to support gut, liver and detoxification pathways. Offered as a single session or as a 4-session program (deworming, liver-intestine, or heavy-metal track).",
      duration: "45 min", price: 125,
      includes: ["Enema + ozone insufflation", "Single session or 4-session program", "Probiotic finish on full course"],
      photoTag: "Intestinal ozone room",
    },
    {
      id: "hemo-maior", cat: "ozone", name: "Auto-Hemotherapy (Major)",
      summary: "Ozonated autologous blood reinfusion — the classic European protocol for immune modulation and systemic oxygenation. Sized to your weight; reinfused on the same visit.",
      duration: "60 min", price: 190,
      includes: ["Draw + ozonation", "Reinfusion", "Vitals monitoring"],
      photoTag: "Auto-hemo procedure",
    },
    {
      id: "ozone-local", cat: "ozone", name: "Local Ozone (Skin & Topical)",
      summary: "Direct ozone application to skin, wounds, fungal infections or soft-tissue trouble spots. Often combined with laser for added penetration.",
      duration: "20–30 min", price: 90,
      includes: ["Targeted ozone delivery", "Optional laser combination", "Aftercare instructions"],
      photoTag: "Local ozone — clinician applying",
    },
    {
      id: "ozone-vaginal", cat: "ozone", name: "Vaginal Ozone Insufflation",
      summary: "Low-flow vaginal ozone for pelvic health, recurrent infections, and post-antibiotic recovery.",
      duration: "20 min", price: 90,
      includes: ["Low-flow insufflation", "Clinical screening", "Comfort positioning"],
      photoTag: "Treatment room — private",
    },
    {
      id: "ozone-resp", cat: "ozone", name: "Respiratory Ozone",
      summary: "Inhaled ozonated oil and pulmonary protocol for respiratory support — full or partial session depending on tolerance.",
      duration: "20–30 min", price: 90,
      includes: ["Ozonated oil inhalation", "Full or partial protocol", "Vitals before/after"],
      photoTag: "Respiratory ozone setup",
    },
    {
      id: "auricular", cat: "ozone", name: "Auricular Ozone",
      summary: "Direct ozone into the ear canal — used for chronic ear issues, infection follow-up, and as part of cranial protocols.",
      duration: "15–20 min", price: 35,
      includes: ["Otoscopic check", "Ozone delivery", "Optional wash add-on"],
      photoTag: "Auricular ozone",
    },
    {
      id: "ozone-uretral", cat: "ozone", name: "Urethral Ozone",
      summary: "Sterile urethral ozone insufflation for recurrent UTIs, prostate support and pelvic-floor recovery protocols.",
      duration: "20 min", price: 90,
      includes: ["Sterile single-use kit", "Clinician-administered", "Symptom log"],
      photoTag: "Treatment room",
    },
    {
      id: "hemo-im", cat: "ozone", name: "Auto-Hemotherapy (IM)",
      summary: "Minor auto-hemotherapy: small-volume IM reinfusion of ozonated blood. Lower commitment than Major, easy weekly cadence.",
      duration: "30 min", price: 55,
      includes: ["IM reinfusion", "10-minute observation", "Series pricing available"],
      photoTag: "IM auto-hemo",
    },
    {
      id: "ozone-sauna", cat: "ozone", name: "Ozone Steam Sauna",
      summary: "Full-body transdermal ozone delivered in a closed-cabin sauna. Supports circulation, lymph and detoxification.",
      duration: "30 min", price: 65,
      includes: ["Pre-session hydration", "Sauna cabin session", "Cool-down protocol"],
      photoTag: "Ozone sauna cabin",
    },

    // ── Regenerative & Joint ────────────────────────────────────────
    {
      id: "plasma-prolozone-uni", cat: "regen", name: "Plasma Prolozone — Single Joint",
      summary: "Platelet-rich plasma drawn from your own blood, combined with prolozone and injected into one joint. Our highest-volume regenerative protocol for knees, shoulders and hips.",
      duration: "60 min", price: 260,
      includes: ["Draw + centrifuge", "Prolozone + PRP injection", "Follow-up protocol"],
      photoTag: "PRP centrifuge — clinician hands",
    },
    {
      id: "plasma-prolozone-bi", cat: "regen", name: "Plasma Prolozone — Bilateral",
      summary: "Same PRP-prolozone protocol delivered to a matched pair (e.g. both knees) in one visit. Most efficient option for bilateral wear.",
      duration: "75 min", price: 340,
      includes: ["Draw + centrifuge", "Bilateral injection", "Follow-up protocol"],
      photoTag: "Bilateral joint prep",
    },
    {
      id: "prolozone-uni", cat: "regen", name: "Prolozone — Single Joint",
      summary: "Targeted ozone injection into joints and soft tissue — without PRP. Indicated for cartilage support and chronic pain.",
      duration: "30–45 min", price: 140,
      includes: ["Clinical assessment", "Targeted joint injection", "Series cadence advice"],
      photoTag: "Joint injection — close-up",
    },
    {
      id: "prolozone-laser", cat: "regen", name: "Prolozone + Laser",
      summary: "Prolozone joint injection paired with low-level laser therapy at the same site to accelerate tissue response.",
      duration: "45 min", price: 190,
      includes: ["Prolozone injection", "Laser application", "Recovery notes"],
      photoTag: "Laser + injection",
    },
    {
      id: "plasma-facial", cat: "regen", name: "Plasma Facial (PRP)",
      summary: "PRP micro-injected across the face to stimulate collagen and improve tone. Optional pescoço/colo add-on for neck and décolleté.",
      duration: "75 min", price: 280,
      includes: ["Draw + centrifuge", "Topical numbing", "Targeted micro-injection"],
      photoTag: "PRP facial — close-up",
    },

    // ── IV & Hydration ──────────────────────────────────────────────
    {
      id: "iv-vitc-high", cat: "iv", name: "High-Dose IV Vitamin C",
      summary: "Pharmaceutical-grade ascorbic acid infused at clinical doses (25g or 50g). Used for immune support and integrative oncology adjunct protocols. G6PD screen required before first session.",
      duration: "60–90 min", price: 370,
      includes: ["25g or 50g dosing options", "Pre-treatment G6PD screen", "Slow-titration protocol"],
      photoTag: "High-dose Vit C drip",
    },
    {
      id: "iv-iron-vitc", cat: "iv", name: "IV Iron + Vitamin C",
      summary: "Low-dose iron infusion paired with Vitamin C for absorption — the most-requested infusion for fatigue and post-anemia recovery.",
      duration: "60 min", price: 350,
      includes: ["Ferritin review", "Iron + Vit C infusion", "Follow-up labs at 8 weeks"],
      photoTag: "IV drip — iron",
    },
    {
      id: "iv-iron", cat: "iv", name: "IV Iron",
      summary: "Standalone iron infusion when Vit C pairing isn't indicated. Dose calculated from your most recent ferritin.",
      duration: "45 min", price: 280,
      includes: ["Dose to ferritin", "Slow infusion", "Vitals monitoring"],
      photoTag: "IV iron vial",
    },
    {
      id: "iv-immune", cat: "iv", name: "Immune Booster IV",
      summary: "Vitamin-and-mineral immune blend with Vit C, B-complex, zinc and supporting cofactors. Good first IV for new patients.",
      duration: "45 min", price: 210,
      includes: ["Multi-vitamin blend", "Hydration base", "Nurse-administered"],
      photoTag: "Immune IV drip",
    },
    {
      id: "iv-glutathione", cat: "iv", name: "IV Glutathione",
      summary: "The master antioxidant. Pushes glutathione past oral absorption ceilings to support liver, skin and detox protocols.",
      duration: "30 min", price: 120,
      includes: ["IV glutathione push", "Frequently paired with Vit C", "Post-infusion notes"],
      photoTag: "Glutathione push",
    },
    {
      id: "iv-personal", cat: "iv", name: "Personalized IV",
      summary: "Custom-mixed infusion built around your labs and current protocol. Most patients use this after their first round of standard IVs.",
      duration: "45–60 min", price: 255,
      includes: ["Clinician-formulated", "Based on current labs", "Adjusted each visit"],
      photoTag: "IV mixing bench",
    },
    {
      id: "iv-energy", cat: "iv", name: "Energy Mixture IV",
      summary: "B-complex, magnesium, taurine and amino-acid blend formulated for fatigue, jet lag and pre-event recovery.",
      duration: "45 min", price: 230,
      includes: ["Energy formulation", "Hydration base", "Quick onset"],
      photoTag: "IV drip — energy",
    },
    {
      id: "iv-myers", cat: "iv", name: "Myers' Mix IV",
      summary: "The classic vitamin & mineral cocktail — B-complex, magnesium, calcium and Vitamin C in a single drip.",
      duration: "45 min", price: 170,
      includes: ["Vitamin & mineral IV", "Hydration base", "Nurse-administered"],
      photoTag: "IV drip — vitamin cocktail",
    },

    // ── Diagnostics & Consults ─────────────────────────────────────
    {
      id: "consult-hormonal", cat: "diagnostic", name: "Hormone Consultation",
      summary: "Endocrine review with our clinician — initial visit, follow-up and protocol design. Most active patients book this quarterly.",
      duration: "45–60 min", price: 150,
      includes: ["Symptom and labs review", "Replacement plan", "Follow-up scheduling"],
      photoTag: "Clinician consultation",
    },
    {
      id: "consult-first", cat: "diagnostic", name: "First Appointment (In-Person)",
      summary: "Comprehensive intake, vitals, photo documentation and protocol mapping. Required before any therapy course.",
      duration: "90 min", price: 90,
      includes: ["History intake", "Vitals & exam", "Protocol plan"],
      photoTag: "Consultation room",
    },
    {
      id: "consult-online", cat: "diagnostic", name: "First Appointment (Online)",
      summary: "Secure-video version of our intake for patients outside South Florida. Lab work and treatments still require an in-person visit.",
      duration: "90 min", price: 90,
      includes: ["Video intake", "Records review", "Lab orders if indicated"],
      photoTag: "Telehealth call",
    },
    {
      id: "consult-bloodwork", cat: "diagnostic", name: "Blood Panel Consultation",
      summary: "Initial review and final read-out of your comprehensive blood panel. Drives every protocol we build for you.",
      duration: "60 min", price: 120,
      includes: ["Panel review", "Plan adjustments", "Follow-up cadence"],
      photoTag: "Lab review",
    },
    {
      id: "panel-particular", cat: "diagnostic", name: "Comprehensive Blood Panel",
      summary: "Quest-run CBC, lipid, hormone, urinalysis and H. Pylori testing for a clear baseline before therapy. Final price varies by panel.",
      duration: "20 min", price: 525,
      includes: ["Draw + processing", "CBC + Lipid + Hormone", "Urinalysis + H. Pylori"],
      photoTag: "Lab vials — phlebotomy",
    },

    // ── Injectables ────────────────────────────────────────────────
    {
      id: "vitd3", cat: "injectables", name: "Vitamin D3 (IM)",
      summary: "Single-shot intramuscular Vitamin D3 — our most-prescribed injectable when levels return low on panel.",
      duration: "10 min", price: 40,
      includes: ["IM injection", "Dose based on most recent panel", "Re-test at 8–12 weeks"],
      photoTag: "Vitamin D3 vial",
    },
    {
      id: "b12-im", cat: "injectables", name: "Vitamin B12 — Methylcobalamin (IM)",
      summary: "Methylated B12 IM injection for energy, mood and methylation support. Often paired with B-complex.",
      duration: "10 min", price: 25,
      includes: ["IM injection", "Methylation review", "4–6 week cadence"],
      photoTag: "B12 injection",
    },
    {
      id: "bcomplex", cat: "injectables", name: "Vitamin B-Complex (IM)",
      summary: "Full B-complex shot — frequently stacked with B12 or D3 in the same visit.",
      duration: "10 min", price: 40,
      includes: ["IM injection", "Pairing options", "Stack recommendations"],
      photoTag: "B-complex vial",
    },
  ],

  tiers: [
    {
      name: "Essentials",
      tag: "Foundational wellness with member pricing on every treatment.",
      monthly: 149, annual: 129,
      features: [
        "1 IV or injectable per month",
        "Member pricing on all therapies (10% off)",
        "Quarterly clinician check-in",
        "Priority appointment access",
      ],
    },
    {
      name: "Integrative",
      tag: "Our most popular plan. Built for steady, ongoing protocols.",
      monthly: 289, annual: 249,
      featured: true,
      features: [
        "2 IVs + 2 injectables per month",
        "1 ozone session per month",
        "Member pricing (20% off)",
        "Monthly clinician check-in",
        "Quarterly lab discount",
      ],
    },
    {
      name: "Concierge",
      tag: "Comprehensive care for serious longevity protocols.",
      monthly: 549, annual: 479,
      features: [
        "Unlimited IVs + injectables",
        "2 ozone or PRP sessions monthly",
        "Member pricing (30% off)",
        "Dedicated clinician",
        "Annual full lab workup included",
        "House-call eligible",
      ],
    },
  ],

  testimonials: [
    {
      quote: "I came in for chronic knee inflammation. Six months in, I'm hiking again. The team treats you like a whole person — not a chart.",
      name: "Marisa K.",
      meta: "Patient since 2023 · Prolozone protocol",
      stars: 5,
    },
    {
      quote: "The intake was the most thorough I've had at any clinic. They built a protocol around my labs, not a template.",
      name: "David R.",
      meta: "Patient since 2024 · Integrative member",
      stars: 5,
    },
    {
      quote: "I drive in from Miami every week. NAD+ and ozone changed how I show up at work and with my kids. Worth the drive.",
      name: "Elena S.",
      meta: "Patient since 2022 · Concierge member",
      stars: 5,
    },
  ],

  // For the homepage 6-card preview — top revenue drivers across categories.
  featuredIds: ["consult-first", "consult-bloodwork", "intestinal", "hemo-maior", "plasma-prolozone-uni", "iv-vitc-high"],
};

window.RIO3_DATA = RIO3_DATA;
