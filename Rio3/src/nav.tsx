// Top nav and footer (TypeScript).


const TopBar: FC = () => {
  const { brand } = window.RIO3_DATA;
  return (
    <div className="topbar">
      <div className="shell">
        <div>Welcoming new patients · {brand.address}, {brand.city}</div>
        <div>
          <a href={`tel:${brand.phone}`}>{brand.phone}</a>
          <span className="pipe">|</span>
          <a href="#">Patient login</a>
        </div>
      </div>
    </div>
  );
};

const Nav: React.FC<NavProps> = ({ page, setPage }) => {
  const [open, setOpen] = React.useState(false);
  const links: { id: PageId; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "treatments", label: "Treatments" },
    { id: "programs", label: "Programs" },
    { id: "contact", label: "Visit" },
  ];
  const close = () => setOpen(false);
  return (
    <nav className="nav">
      <div className="shell">
        <a onClick={() => { setPage("home"); close(); }} style={{ cursor: "pointer" }}>
          <LogoSlot />
        </a>
        <div className={`nav-links${open ? " open" : ""}`}>
          {links.map((l) => (
            <a
              key={l.id}
              className={`nav-link ${page === l.id ? "active" : ""}`}
              onClick={() => { setPage(l.id); close(); }}
              style={{ cursor: "pointer" }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className={`nav-cta${open ? " open" : ""}`}>
          <a
            className="btn btn-ghost"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage("treatments");
              close();
            }}
          >
            Browse treatments
          </a>
        </div>
        <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

const Marquee: FC = () => {
  const items: string[] = [
    "Board-certified clinicians",
    "Established 2019",
    "Ozone + IV + Regenerative",
    "Deerfield Beach, Florida",
    "Featured in South Florida Wellness Guide",
    "30,000+ treatments delivered",
  ];
  const row = (
    <span>
      {items.map((t, i) => (
        <React.Fragment key={i}>
          <span>{t}</span>
          <span className="sep" />
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
};

interface FooterProps extends PageProps {
  setPage: (p: PageId) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const { brand } = window.RIO3_DATA;
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Brand size={56} dark />
            <p className="tagline" style={{ marginTop: 22 }}>
              Advanced ozone therapy and integrative wellness, rooted in evidence and delivered in Deerfield Beach, Florida.
            </p>
          </div>
          <div>
            <h5>Care</h5>
            <ul>
              <li><a onClick={() => setPage("treatments")} style={{ cursor: "pointer" }}>All treatments</a></li>
              <li><a onClick={() => setPage("programs")} style={{ cursor: "pointer" }}>Programs</a></li>
              <li><a onClick={() => setPage("treatments")} style={{ cursor: "pointer" }}>Conditions we treat</a></li>
            </ul>
          </div>
          <div>
            <h5>Clinic</h5>
            <ul>
              <li><a>Our clinicians</a></li>
              <li><a>Research & education</a></li>
              <li><a onClick={() => setPage("contact")} style={{ cursor: "pointer" }}>Visit us</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href={`tel:${brand.phone}`}>{brand.phone}</a></li>
              <li><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li style={{ paddingTop: 14 }}>{brand.address}</li>
              <li>{brand.city}</li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <div>© Rio3 USA — Integrative Health · Deerfield Beach</div>
          <div className="legal">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Notice of Privacy Practices</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { TopBar, Nav, Marquee, Footer });
