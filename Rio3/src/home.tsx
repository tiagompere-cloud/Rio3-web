const TreatmentCard = ({ t, onBook }: { t: Treatment; onBook: () => void }) => (
  <article className="treat-card">
    <div className="tc-img">
      <image-slot id={`treat-${t.id}`} shape="rect" radius="0" placeholder={t.photoTag} />
    </div>
    <div className="tc-body">
      <span className="tc-cat">{window.RIO3_DATA.categories.find(c => c.id === t.cat)?.label}</span>
      <h3>{t.name}</h3>
      <p className="tc-desc">{t.summary}</p>
      <div className="tc-foot">
        <span style={{ color: "var(--ink-mute)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em" }}>
          {t.duration} &middot; from ${t.price}
        </span>
        <a onClick={onBook} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
          Book <Arrow size={12} />
        </a>
      </div>
    </div>
  </article>
);

const TreatmentsBlock = ({ onBook, setPage }: { onBook: () => void; setPage: (p: string) => void }) => {
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
              protocols by your clinician. Browse what we offer, then book a consultation to
              build your plan.
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
          {list.map(t => <TreatmentCard key={t.id} t={t} onBook={onBook} />)}
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

const MembershipsBlock = ({ onBook }: { onBook: () => void }) => {
  const { tiers } = window.RIO3_DATA;
  const [annual, setAnnual] = React.useState(false);

  return (
    <section className="section memberships">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Memberships</span>
          <div>
            <h2>Ongoing care, <em>built-in.</em></h2>
            <p className="lede" style={{ marginTop: 22 }}>
              For patients ready to make wellness a steady practice. Every plan includes
              member pricing on the full menu, priority access, and a dedicated clinician.
            </p>
          </div>
        </div>

        <div className="bill-toggle">
          <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button>
          <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>
            Annual <span className="save">SAVE 14%</span>
          </button>
        </div>

        <div className="tier-grid">
          {tiers.map(t => (
            <div key={t.name} className={`tier ${t.featured ? "featured" : ""}`}>
              {t.featured && <span className="badge">Most popular</span>}
              <div className="tier-name">{t.name}</div>
              <div className="tier-tag">{t.tag}</div>
              <div className="tier-price">
                <span className="price-num">${annual ? t.annual : t.monthly}</span>
                <span className="price-cents">/ month{annual && ", billed annually"}</span>
              </div>
              <ul className="tier-feat">
                {t.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button className="btn btn-primary" onClick={onBook} style={{ marginTop: "auto", justifyContent: "center" }}>
                Start {t.name} <Arrow />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationBlock = ({ onBook }: { onBook: () => void }) => {
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
          <div className="map-frame">
            <MapPlaceholder />
            <div className="map-pin">
              <div className="pin-card">Rio3 &middot; Suite 205</div>
              <div className="pin-dot" />
            </div>
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

            <button className="btn btn-primary" onClick={onBook}>
              Book a visit <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const DirectorBlock: React.FC = () => (
  <section className="section">
    <div className="shell">
      <div className="director-grid">
        <div className="director-figure">
          <image-slot id="director-photo" shape="rect" radius="0" placeholder="Medical director portrait" />
        </div>
        <div>
          <span className="eyebrow">Medical Director</span>
          <p className="quote" style={{ marginTop: 24 }}>
            "We don't guess. We run the labs, read your history, and build a protocol that fits <em>you</em> — not a template."
          </p>
          <dl className="director-meta">
            <div>
              <dt>Credentials</dt>
              <dd>Board-certified, integrative medicine</dd>
            </div>
            <div>
              <dt>At Rio3 since</dt>
              <dd>2019</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>English · Português · Español</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsBlock: React.FC = () => {
  const { testimonials } = window.RIO3_DATA;
  return (
    <section className="section testimonials">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Patient stories</span>
          <div>
            <h2>Results that <em>speak for themselves.</em></h2>
          </div>
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testi">
              <div className="stars">{"★".repeat(t.stars)}</div>
              <blockquote>"{t.quote}"</blockquote>
              <div className="testi-foot">
                <span className="name">{t.name}</span>
                <span className="meta">{t.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = ({ onBook, setPage, heroVariant }: { onBook: () => void; setPage: (p: string) => void; heroVariant: string }) => (
  <>
    {heroVariant === "b" && <HeroB onBook={onBook} setPage={setPage} />}
    {heroVariant === "c" && <HeroC onBook={onBook} setPage={setPage} />}
    {(heroVariant !== "b" && heroVariant !== "c") && <HeroA onBook={onBook} setPage={setPage} />}
    <Marquee />
    <TreatmentsBlock onBook={onBook} setPage={setPage} />
    <MembershipsBlock onBook={onBook} />
    <DirectorBlock />
    <TestimonialsBlock />
    <LocationBlock onBook={onBook} />
  </>
);

Object.assign(window, { Home, TreatmentCard, DirectorBlock, TestimonialsBlock });
