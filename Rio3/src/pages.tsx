const PROGRAMS = [
  {
    num: "01",
    name: "Metabolic Reset",
    tag: "Weight Optimization · 6–12 months",
    desc: "Physician-supervised GLP-1 and comprehensive metabolic protocol. We manage your dosing, monitor your progress, and layer in IV nutrients and gut support as your protocol evolves.",
    includes: ["GLP-1 titration & monitoring", "Monthly IV nutrition", "Gut microbiome support", "Quarterly lab review"],
  },
  {
    num: "02",
    name: "Immune Rebuild",
    tag: "Immune & Gut Restoration · 12 weeks",
    desc: "A structured sequence of ozone, high-dose IV Vitamin C and diagnostic work designed to reduce systemic inflammation and restore gut-immune balance from the ground up.",
    includes: ["Intestinal ozone series", "High-dose IV Vitamin C", "Microbiome assessment", "Bi-weekly clinician check-in"],
  },
  {
    num: "03",
    name: "Joint Regeneration",
    tag: "Regenerative Recovery · 3–6 months",
    desc: "PRP and prolozone delivered on a structured timeline, paired with laser and IV anti-inflammatory support to accelerate tissue repair and reduce chronic joint inflammation.",
    includes: ["PRP + prolozone series", "Low-level laser therapy", "IV anti-inflammatory support", "Progress review at 6 weeks"],
  },
];

const ProgramsPage = ({ onBook }: { onBook: () => void }) => (
  <>
    <section className="page-hero">
      <div className="shell">
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">Programs</span>
            <h1 style={{ marginTop: 28 }}>
              Structured care, <em>start to <span style={{ letterSpacing: "0.1em" }}>f</span>inish.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24 }}>
              Three physician-guided program tracks — each a complete course of care with a clear
              protocol, timeline, and measurable outcome. Not single sessions; a committed plan.
            </p>
          </div>
          <div className="page-meta">
            <div className="row"><span className="label">Tracks</span><span>3 program categories</span></div>
            <div className="row"><span className="label">Duration</span><span>12 weeks – 12 months</span></div>
            <div className="row"><span className="label">Oversight</span><span>Physician-guided throughout</span></div>
            <div className="row"><span className="label">Pricing</span><span>Contact us for current rates</span></div>
          </div>
        </div>
      </div>
    </section>

    <section style={{ padding: "30px 0 100px" }}>
      <div className="shell">
        <div className="detail-rows">
          {PROGRAMS.map((p) => (
            <div key={p.num} className="detail-row">
              <div className="idx">{p.num} / 03</div>
              <div>
                <h4>{p.name}</h4>
                <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-deep)" }}>
                  {p.tag}
                </div>
              </div>
              <div className="copy">
                <p style={{ marginBottom: 14 }}>{p.desc}</p>
                <div style={{ fontSize: 12, color: "var(--ink-mute)", display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {p.includes.map(inc => <span key={inc}>&middot; {inc}</span>)}
                </div>
              </div>
              <div className="price">
                <button className="btn btn-ghost" onClick={onBook} style={{ marginTop: 12, padding: "10px 18px", fontSize: 13 }}>
                  Book program <Arrow size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const TreatmentsPage = ({ onBook }: { onBook: () => void }) => {
  const { categories, treatments } = window.RIO3_DATA;
  const [cat, setCat] = React.useState("all");
  const tabs = [{ id: "all", label: "All treatments" }, ...categories];
  const list = cat === "all" ? treatments : treatments.filter(t => t.cat === cat);

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="eyebrow">Our menu of care</span>
              <h1 style={{ marginTop: 28 }}>Every <em>therapy</em>, every protocol.</h1>
              <p className="lede" style={{ marginTop: 24 }}>
                Browse the full menu of treatments offered at Rio3. Filter by category, then
                book a consultation to build a personalized protocol with your clinician.
              </p>
            </div>
            <div className="page-meta">
              <div className="row"><span className="label">Updated</span><span>May 2026</span></div>
              <div className="row"><span className="label">Treatments</span><span>{treatments.length} active protocols</span></div>
              <div className="row"><span className="label">Pricing</span><span>Contact us for current rates</span></div>
              <div className="row"><span className="label">Insurance</span><span>Out-of-network &middot; superbills available</span></div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "30px 0 60px" }}>
        <div className="shell">
          <div className="tab-row">
            {tabs.map((t, i) => (
              <button key={t.id}
                      className={`tab ${cat === t.id ? "active" : ""}`}
                      onClick={() => setCat(t.id)}>
                <span className="num">{String(i).padStart(2, "0")}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div className="detail-rows">
            {list.map((t, i) => (
              <div key={t.id} className="detail-row">
                <div className="idx">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h4>{t.name}</h4>
                  <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-deep)" }}>
                    {categories.find(c => c.id === t.cat)?.label} &middot; {t.duration}
                  </div>
                </div>
                <div className="copy">
                  <p style={{ marginBottom: 14 }}>{t.summary}</p>
                  <div style={{ fontSize: 12, color: "var(--ink-mute)", display: "flex", gap: 14, flexWrap: "wrap" }}>
                    {t.includes.map(inc => <span key={inc}>&middot; {inc}</span>)}
                  </div>
                </div>
                <div className="price">
                  <button className="btn btn-ghost" onClick={onBook} style={{ padding: "10px 18px", fontSize: 13 }}>
                    Book <Arrow size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const MembershipsPage = ({ onBook }: { onBook: () => void }) => {
  const { programs } = window.RIO3_DATA;
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="eyebrow">Programs</span>
              <h1 style={{ marginTop: 28 }}>Structured care, <em>start to finish.</em></h1>
              <p className="lede" style={{ marginTop: 24 }}>
                Three physician-guided program tracks — each a complete course of care with
                a clear protocol, timeline, and measurable outcome. Not single sessions;
                a committed plan.
              </p>
            </div>
            <div className="page-meta">
              <div className="row"><span className="label">Tracks</span><span>3 program categories</span></div>
              <div className="row"><span className="label">Duration</span><span>12 weeks – 12 months</span></div>
              <div className="row"><span className="label">Oversight</span><span>Physician-guided throughout</span></div>
              <div className="row"><span className="label">Pricing</span><span>Contact us for current rates</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section memberships" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="shell">
          {programs.map((prog, pi) => (
            <div key={prog.id} className="prog-track">
              <div className="prog-track-header">
                <div>
                  <span className="eyebrow" style={{ color: "rgba(246,244,239,0.5)" }}>
                    {String(pi + 1).padStart(2, "0")} / {String(programs.length).padStart(2, "0")}
                  </span>
                  <div className="prog-track-name">{prog.name}</div>
                  <div className="prog-track-meta">{prog.tagline} · {prog.duration}</div>
                </div>
                <p className="prog-track-desc">{prog.description}</p>
              </div>

              <div className="tier-grid">
                {prog.tiers.map(t => (
                  <div key={t.id} className={`tier ${t.featured ? "featured" : ""}`}>
                    {t.featured && <span className="badge">Recommended</span>}
                    {t.label && (
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "rgba(246,244,239,0.4)", marginBottom: 10 }}>
                        {t.label}
                      </div>
                    )}
                    <div className="tier-name" style={{ fontSize: 26 }}>{t.name}</div>
                    <div className="tier-tag">{t.tag}</div>
                    <ul className="tier-feat">
                      {t.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                    <button className="btn btn-primary" onClick={onBook} style={{ marginTop: "auto", justifyContent: "center" }}>
                      Book a consultation <Arrow />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: "center", color: "rgba(246,244,239,0.6)", fontSize: 13 }}>
            Not sure which track fits?{" "}
            <a onClick={onBook} style={{ cursor: "pointer", borderBottom: "1px solid rgba(246,244,239,0.3)", color: "var(--bg)" }}>
              Book a 20-minute clinician call
            </a>{" "}
            and we&apos;ll help you decide.
          </div>
        </div>
      </section>
    </>
  );
};

const AboutPage = ({ onBook }: { onBook: () => void }) => (
  <>
    <section className="page-hero">
      <div className="shell">
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">Our practice</span>
            <h1 style={{ marginTop: 28 }}>A clinic built for <em>integrative</em> medicine.</h1>
            <p className="lede" style={{ marginTop: 24 }}>
              Rio3 opened in 2019 with a single conviction: that ozone, IV nutrition and
              regenerative therapies belong in the same room as careful diagnostics and
              clinician-led protocols — not on the fringes.
            </p>
          </div>
          <div className="page-meta">
            <div className="row"><span className="label">Founded</span><span>2019 &middot; Deerfield Beach, FL</span></div>
            <div className="row"><span className="label">Clinicians</span><span>4 board-certified</span></div>
            <div className="row"><span className="label">Treatments</span><span>{window.RIO3_DATA.treatments.length} active protocols</span></div>
            <div className="row"><span className="label">Languages</span><span>English &middot; Portugu&ecirc;s &middot; Espa&ntilde;ol</span></div>
          </div>
        </div>
      </div>
    </section>

    <section style={{ padding: "40px 0 80px" }}>
      <div className="shell">
        <div className="about-stats">
          <div className="stat">
            <div className="num">30k+</div>
            <div className="label">Treatments delivered</div>
          </div>
          <div className="stat">
            <div className="num">620</div>
            <div className="label">Active members</div>
          </div>
          <div className="stat">
            <div className="num">4.9</div>
            <div className="label">Patient rating &middot; Google</div>
          </div>
          <div className="stat">
            <div className="num">7</div>
            <div className="label">Years in practice</div>
          </div>
        </div>

        <div className="about-grid" style={{ marginTop: 40 }}>
          <div>
            <span className="eyebrow">How we work</span>
            <h2 style={{ fontSize: 44, marginTop: 24, fontWeight: 300, lineHeight: 1.05 }}>
              Lab work first.<br />
              <em style={{ fontStyle: "italic", color: "var(--sage-deep)" }}>Then protocols.</em>
            </h2>
          </div>
          <div>
            <p>
              Every patient starts with an intake and a comprehensive blood panel. We don&apos;t
              prescribe IV nutrients without knowing your micronutrient status; we don&apos;t
              schedule ozone without screening your iron and your G6PD.
            </p>
            <p>
              Once labs are in, your clinician designs a sequenced protocol — what to do
              first, what to layer in, and what to measure to know it&apos;s working. We re-test
              at quarterly milestones and adjust from there.
            </p>
            <p>
              The result is calmer, more deliberate care. You spend less on therapies you
              don&apos;t need, and more time on the ones that move the needle for you.
            </p>
            <button className="btn btn-primary" onClick={onBook} style={{ marginTop: 24 }}>
              Start with a consultation <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>

    <DirectorBlock />
    <TestimonialsBlock />
  </>
);

const ContactPage = ({ onBook }: { onBook: () => void }) => {
  const { brand, hours } = window.RIO3_DATA;
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="eyebrow">Visit Rio3</span>
              <h1 style={{ marginTop: 28 }}>Find us on <em>Federal Highway.</em></h1>
              <p className="lede" style={{ marginTop: 24 }}>
                We&apos;re a short drive from Boca Raton, Pompano Beach and Fort Lauderdale.
                Free parking in the building lot — Suite 205, second floor.
              </p>
              <div className="hero-cta" style={{ marginTop: 32 }}>
                <button className="btn btn-primary" onClick={onBook}>Book a visit <Arrow /></button>
                <a className="btn btn-ghost" href={`tel:${brand.phone}`}>Call {brand.phone}</a>
              </div>
            </div>
            <div className="page-meta">
              <div className="row"><span className="label">Address</span><span>{brand.address}, {brand.city}</span></div>
              <div className="row"><span className="label">Phone</span><span>{brand.phone}</span></div>
              <div className="row"><span className="label">Email</span><span>{brand.email}</span></div>
              <div className="row"><span className="label">Parking</span><span>Free, on-site</span></div>
              <div className="row"><span className="label">Transit</span><span>10 min from Tri-Rail Deerfield</span></div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "20px 0 100px" }}>
        <div className="shell">
          <div className="location-grid">
            <div className="map-frame">
              <MapPlaceholder />
              <div className="map-pin">
                <div className="pin-card">Rio3 &middot; Suite 205</div>
                <div className="pin-dot" />
              </div>
            </div>
            <div>
              <span className="eyebrow" style={{ marginBottom: 14, display: "inline-flex" }}>Operating hours</span>
              <ul className="hours">
                {hours.map(h => (
                  <li key={h.day} className={h.closed ? "closed" : ""}>
                    <span className="day">{h.day}</span>
                    <span>{h.open}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 30, padding: 24, background: "var(--bg-elev)", borderRadius: 12, border: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 400, marginBottom: 8 }}>
                  Telehealth available
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                  Initial consultations and follow-ups can be conducted via secure video for
                  patients outside South Florida. Lab work and treatments require in-person visits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Object.assign(window, { ProgramsPage, TreatmentsPage, MembershipsPage, AboutPage, ContactPage });
