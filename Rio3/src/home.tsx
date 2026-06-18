const TreatmentCard = ({ t }: { t: Treatment }) => {
  const { categories } = window.RIO3_DATA;
  const cat = categories.find(c => c.id === t.cat);
  return (
    <div className="treat-card">
      <div className="tc-body">
        <span className="tc-cat">{cat?.label}</span>
        <h3>{t.name}</h3>
        <p className="tc-desc">{t.summary}</p>
        <div className="tc-foot">
          <span>{t.duration}</span>
          <span className="arr"><Arrow /></span>
        </div>
      </div>
    </div>
  );
};

const TreatmentsBlock = ({ setPage }: { setPage: (p: string) => void }) => {
  const { categories, treatments } = window.RIO3_DATA;
  const [cat, setCat] = React.useState("all");

  const tabs = [{ id: "all", label: "All" }, ...categories];
  const { featuredIds } = window.RIO3_DATA;
  const list = cat === "all"
    ? featuredIds.map(id => treatments.find(t => t.id === id)!).filter(Boolean)
    : treatments.filter(t => t.cat === cat).slice(0, 6);

  return (
    <section className="section">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Treatments</span>
          <div>
            <h2>A complete <em>integrative</em> toolkit, under one roof.</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Five categories of evidence-informed therapies — sequenced and combined into
              protocols by your clinician.
            </p>
          </div>
        </div>

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

        <div className="treat-grid">
          {list.map(t => <TreatmentCard key={t.id} t={t} />)}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
          <a className="btn btn-ghost" onClick={() => setPage("treatments")} style={{ cursor: "pointer" }}>
            See every treatment <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
};

const ProgramsBlock = ({ setPage }: { setPage: (p: string) => void }) => {
  const { programs } = window.RIO3_DATA;
  return (
    <section className="section memberships">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Programs</span>
          <div>
            <h2>Structured care, <em>start to <span style={{ letterSpacing: "0.05em" }}>f</span>inish.</em></h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Three physician-guided program tracks — not single sessions, but complete
              courses of care with a protocol, timeline, and measurable outcome.
            </p>
          </div>
        </div>

        <div className="tier-grid">
          {programs.map(p => (
            <div key={p.id} className="tier">
              <div className="tier-name">{p.name}</div>
              <div className="tier-tag">{p.tagline} · {p.duration}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(246,244,239,0.75)", flexGrow: 1, margin: "18px 0 24px" }}>
                {p.description}
              </p>
              <ul className="tier-feat" style={{ marginBottom: 28 }}>
                {p.tiers.map(t => (
                  <li key={t.id} style={{ fontSize: 13 }}>
                    {t.label ? `${t.label} — ${t.name}` : t.name}
                    {t.featured && <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.12em", marginLeft: 8, opacity: 0.6 }}>RECOMMENDED</span>}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={() => setPage("programs")} style={{ justifyContent: "center" }}>
                View program <Arrow />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationBlock: React.FC = () => {
  const { brand, hours } = window.RIO3_DATA;
  return (
    <section className="section" id="visit">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Visit</span>
          <div>
            <h2>Find us in <em>Deerfield Beach.</em></h2>
          </div>
        </div>
        <div className="location-grid">
          <div>
            <div className="map-frame">
              <MapPlaceholder />
            </div>
            <AppleMapsLink />
          </div>
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 400, marginBottom: 8 }}>
                {brand.address}
              </div>
              <div style={{ color: "var(--ink-soft)", fontSize: 15 }}>{brand.city}</div>
              <div style={{ marginTop: 16, display: "flex", gap: 20, flexWrap: "wrap", fontSize: 14 }}>
                <a href={`tel:${brand.phone}`} style={{ borderBottom: "1px solid var(--rule)" }}>{brand.phone}</a>
                <a href={`mailto:${brand.email}`} style={{ borderBottom: "1px solid var(--rule)" }}>{brand.email}</a>
              </div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 14 }}>Hours</div>
            <ul className="hours">
              {hours.map(h => (
                <li key={h.day} className={h.closed ? "closed" : ""}>
                  <span className="day">{h.day}</span>
                  <span>{h.open}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsBlock: React.FC = () => {
  const { testimonials } = window.RIO3_DATA;
  const total = testimonials.length;
  // pos 1..total are real slides; 0 = clone of last, total+1 = clone of first
  const [pos, setPos] = React.useState(1);
  const [animated, setAnimated] = React.useState(true);
  const [paused, setPaused] = React.useState(false);

  const slides = [testimonials[total - 1], ...testimonials, testimonials[0]];
  const dotIdx = ((pos - 1) % total + total) % total;

  const go = (dir: number) => { setPaused(true); setAnimated(true); setPos(p => p + dir); };

  const onTransitionEnd = () => {
    if (pos <= 0) { setAnimated(false); setPos(total); }
    else if (pos >= total + 1) { setAnimated(false); setPos(1); }
  };

  // Re-enable animation after a snap (two frames so browser flushes the position change)
  React.useEffect(() => {
    if (!animated) requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
  }, [animated]);

  // Auto-advance — stops permanently once user touches arrows
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => { setAnimated(true); setPos(p => p + 1); }, 8000);
    return () => clearInterval(t);
  }, [dotIdx, paused]);

  return (
    <section className="section testimonials">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Patient stories</span>
          <div>
            <h2>Results that <em>speak for themselves.</em></h2>
          </div>
        </div>
        <div className="testi-carousel">
          <div className="testi-track-wrap">
            <div
              className="testi-track"
              style={{ transform: `translateX(-${pos * 100}%)`, transition: animated ? 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none' }}
              onTransitionEnd={onTransitionEnd}
            >
              {slides.map((t, i) => (
                <div key={i} className="testi">
                  <div className="stars">{"★".repeat(t.stars)}</div>
                  <blockquote>"{t.quote}"</blockquote>
                  <div className="testi-foot"><span className="name">{t.name}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="testi-controls">
            <button className="testi-btn" onClick={() => go(-1)} aria-label="Previous review">&#8592;</button>
            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`testi-dot${i === dotIdx ? " active" : ""}`} onClick={() => { setAnimated(true); setPos(i + 1); }} aria-label={`Review ${i + 1}`} />
              ))}
            </div>
            <button className="testi-btn" onClick={() => go(1)} aria-label="Next review">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = ({ setPage, heroVariant }: { setPage: (p: string) => void; heroVariant: string }) => (
  <>
    {heroVariant === "b" && <HeroB setPage={setPage} />}
    {heroVariant === "c" && <HeroC setPage={setPage} />}
    {(heroVariant !== "b" && heroVariant !== "c") && <HeroA setPage={setPage} />}
    <Marquee />
    <TreatmentsBlock setPage={setPage} />
    <ProgramsBlock setPage={setPage} />
    <TestimonialsBlock />
    <LocationBlock />
  </>
);

Object.assign(window, { Home, TreatmentCard, TestimonialsBlock });
