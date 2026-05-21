const Rio3Tweaks = ({ tweaks, setTweak }: { tweaks: any; setTweak: (k: string, v: any) => void }) => (
  <TweaksPanel title="Tweaks">
    <TweakSection label="Composition" />
    <TweakRadio
      label="Hero"
      value={tweaks.hero}
      onChange={(v: string) => setTweak("hero", v)}
      options={[
        { value: "a", label: "Editorial" },
        { value: "b", label: "Full-bleed" },
        { value: "c", label: "Molecule" },
      ]}
    />
    <TweakRadio
      label="Density"
      value={tweaks.density}
      onChange={(v: string) => setTweak("density", v)}
      options={[
        { value: "spacious", label: "Spacious" },
        { value: "compact", label: "Compact" },
      ]}
    />

    <TweakSection label="Color" />
    <TweakColor
      label="Accent"
      value={tweaks.accent}
      onChange={(v: string) => setTweak("accent", v)}
      options={["#2aa3c8", "#1a3a8a", "#6b8e7a", "#d4b896"]}
    />
    <TweakRadio
      label="Background"
      value={tweaks.bg}
      onChange={(v: string) => setTweak("bg", v)}
      options={[
        { value: "cream", label: "Cream" },
        { value: "white", label: "White" },
        { value: "stone", label: "Stone" },
      ]}
    />

    <TweakSection label="Typography" />
    <TweakRadio
      label="Display"
      value={tweaks.display}
      onChange={(v: string) => setTweak("display", v)}
      options={[
        { value: "newsreader", label: "Newsreader" },
        { value: "spectral", label: "Spectral" },
      ]}
    />
  </TweaksPanel>
);

const App = () => {
  const [page, setPage] = React.useState("home");
  const [booking, setBooking] = React.useState(false);
  const [consult, setConsult] = React.useState(false);

  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "hero": "a",
    "accent": "#2aa3c8",
    "bg": "cream",
    "display": "newsreader",
    "density": "spacious"
  }/*EDITMODE-END*/);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--sage", tweaks.accent);
    root.style.setProperty("--sage-deep", tweaks.accent);

    const bgMap: Record<string, { bg: string; elev: string; line: string }> = {
      cream: { bg: "#f6f4ef", elev: "#fbfaf6", line: "#e3ddd0" },
      white: { bg: "#ffffff", elev: "#fafafa", line: "#eaeaea" },
      stone: { bg: "#efece4", elev: "#f5f2e9", line: "#dcd5c2" },
    };
    const b = bgMap[tweaks.bg] || bgMap.cream;
    root.style.setProperty("--bg", b.bg);
    root.style.setProperty("--bg-elev", b.elev);
    root.style.setProperty("--line", b.line);

    const fontMap: Record<string, string> = {
      newsreader: '"Newsreader", "Cormorant Garamond", serif',
      spectral: '"Spectral", "Newsreader", serif',
    };
    root.style.setProperty("--display", fontMap[tweaks.display] || fontMap.newsreader);

    root.style.setProperty("--pad", tweaks.density === "compact" ? "60px" : "88px");
  }, [tweaks]);

  const onBook = () => setBooking(true);
  const onConsult = () => setConsult(true);

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [page]);

  return (
    <div data-screen-label={page}>
      <TopBar />
      <Nav page={page as PageId} setPage={setPage as any} onBook={onBook} />

      {page === "home" && <Home onBook={onBook} setPage={setPage} heroVariant={tweaks.hero} />}
      {page === "treatments" && <TreatmentsPage onBook={onBook} />}
      {page === "memberships" && <MembershipsPage onBook={onConsult} />}
      {page === "about" && <AboutPage onBook={onBook} />}
      {page === "contact" && <ContactPage onBook={onBook} />}

      <Footer setPage={setPage} onBook={onBook} />

      {booking && <BookingModal onClose={() => setBooking(false)} />}
      {consult && <ConsultModal onClose={() => setConsult(false)} />}

      <Rio3Tweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
};

const root = (ReactDOM as any).createRoot(document.getElementById("root")!);
root.render(<App />);
