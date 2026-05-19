// Three hero variants (TypeScript).


interface HeroProps extends PageProps {
  setPage: (p: PageId) => void;
}

const HeroA: React.FC<HeroProps> = ({ onBook, setPage }) => (
  <section className="hero">
    <div className="shell">
      <div className="hero-grid">
        <div>
          <span className="eyebrow">Integrative Health · Est. 2019</span>
          <h1 style={{ marginTop: 28 }}>
            Medicine that treats the <em>root</em>, not the symptom.
          </h1>
          <p className="lede" style={{ marginTop: 28 }}>
            Rio3 is a clinician-led integrative practice in Deerfield Beach offering ozone
            therapy, IV nutrition, regenerative injections and longevity protocols — built
            around your labs, your history and your goals.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onBook}>Book a consultation <Arrow /></button>
            <a className="btn btn-ghost" onClick={() => setPage("treatments")} style={{ cursor: "pointer" }}>
              Explore treatments
            </a>
          </div>
          <dl className="hero-meta">
            <div><dt>Founded</dt><dd>2019, Deerfield Beach</dd></div>
            <div><dt>Treatments delivered</dt><dd>30,000+</dd></div>
            <div><dt>Clinicians</dt><dd>4 board-certified</dd></div>
          </dl>
        </div>
        <div className="hero-figure">
          <image-slot id="hero-a-img" shape="rect" radius="14" placeholder="Drop hero image — patient receiving IV ozone, calm interior" />
          <div className="figure-tag">Treatment in session · Suite 205</div>
        </div>
      </div>
    </div>
  </section>
);

const HeroB: React.FC<HeroProps> = ({ onBook, setPage }) => (
  <section className="hero-b">
    <div className="hero-frame">
      <image-slot id="hero-b-img" shape="rect" radius="0" placeholder="Drop full-bleed hero — clinic interior, warm light, IV setup" />
      <div className="frame-overlay" />
      <div className="ribbon"><span className="dot" />Welcoming new patients</div>
      <div className="hero-content">
        <h1>
          Whole-body care, <em>delivered</em> with precision.
        </h1>
        <p className="lede" style={{ maxWidth: "44ch" }}>
          A clinician-led integrative practice in Deerfield Beach — ozone therapy,
          IV nutrition, regenerative medicine and longevity protocols.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={onBook}>Book a consultation <Arrow /></button>
          <a className="btn btn-ghost" onClick={() => setPage("treatments")} style={{ cursor: "pointer" }}>
            Explore treatments
          </a>
        </div>
      </div>
    </div>
  </section>
);

const HeroC: React.FC<HeroProps> = ({ onBook, setPage }) => (
  <section className="hero-c">
    <div className="shell">
      <div className="hero-c-grid">
        <div>
          <span className="eyebrow">Ozone · IV · Regenerative</span>
          <h1 style={{ marginTop: 28 }}>
            Three atoms.<br />
            <em>Whole-body</em> medicine.
          </h1>
          <p className="lede" style={{ marginTop: 28 }}>
            Ozone — O<sub>3</sub> — is at the center of how we work. Paired with IV
            nutrition, regenerative injections and rigorous diagnostics, it's the
            foundation of every protocol we build.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onBook}>Book a consultation <Arrow /></button>
            <a className="btn btn-ghost" onClick={() => setPage("treatments")} style={{ cursor: "pointer" }}>
              How ozone works
            </a>
          </div>
          <dl className="hero-meta">
            <div><dt>Sessions/month</dt><dd>500+</dd></div>
            <div><dt>Protocols</dt><dd>22 active</dd></div>
            <div><dt>Outcome tracking</dt><dd>Per-patient</dd></div>
          </dl>
        </div>
        <div className="molecule-stage">
          <OzoneMolecule />
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { HeroA, HeroB, HeroC });
