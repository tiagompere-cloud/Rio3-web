const BOOKING_CONFIG: BookingConfig = window.RIO3_BOOKING_CONFIG || { mode: "demo", apiBase: "" };

const ASSESSMENT_OPTIONS = [
  { id: "inperson",  title: "In-person",  desc: "Come to our Deerfield Beach clinic for your initial assessment" },
  { id: "online",    title: "Online",     desc: "Start with a secure video consultation from anywhere" },
  { id: "done",      title: "Yes, I've already had a consultation", desc: "I've completed my initial assessment and I'm ready to book" },
] as const;
const IS_LIVE = BOOKING_CONFIG.mode === "live";
const API = (path: string) => `${BOOKING_CONFIG.apiBase || ""}${path}`;

// TCPA texting consent — version the exact label text so each opt-in has a
// record of what the patient agreed to.
const SMS_CONSENT_VERSION = "2026-06-30";
const SMS_CONSENT_TEXT =
  "I agree to receive text messages from Rio3 | Ozone Therapy about my appointments and care at the number provided. Message and data rates may apply. Reply STOP to opt out.";

const BOOKING_REASONS: readonly BookingReason[] = [
  {
    id: "consult",
    title: "Initial consultation — In person",
    desc: "90 min · in-clinic · required for all new patients",
    price: "$90",
    squareServiceVariationId: "",
  },
  {
    id: "consult-online",
    title: "Initial consultation — Online",
    desc: "90 min · secure video · for patients outside South Florida",
    price: "$90",
    squareServiceVariationId: "",
  },
  {
    id: "ozone",
    title: "Ozone therapy",
    desc: "Intestinal, auto-hemo, local, vaginal or respiratory",
    price: "from $35",
    squareServiceVariationId: "",
  },
  {
    id: "iv",
    title: "IV nutrition",
    desc: "High-dose Vit C, Iron, Glutathione, Myers' and custom drips",
    price: "from $120",
    squareServiceVariationId: "",
  },
  {
    id: "regen",
    title: "Regenerative & Joint",
    desc: "Plasma Prolozone, PRP, prolozone, laser",
    price: "from $140",
    squareServiceVariationId: "",
  },
];

const buildDemoDates = (): Date[] => {
  const out: Date[] = [];
  const today = new Date(2026, 4, 15);
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
};
const DEMO_TIMES = ["9:00", "10:30", "12:00", "1:30", "3:00", "4:30", "5:45"];

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fmtTime = (iso: string): string => {
  const d = new Date(iso);
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
};

const dateKey = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const BookingModal = ({ onClose, mode = "consultation" }: { onClose: () => void; mode?: "consultation" | "treatment" }) => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState<BookingFormData>({
    reason: null,
    date: null,
    time: null,
    slot: null,
    first: "", last: "", email: "", phone: "", note: "",
    newPatient: true,
    textingConsent: false,
  });

  const [loadingSlots, setLoadingSlots] = React.useState(false);
  const [availability, setAvailability] = React.useState<Record<string, SquareSlot[]>>({});
  const [availabilityError, setAvailabilityError] = React.useState<string | null>(null);

  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const demoDates = React.useMemo(() => buildDemoDates(), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  React.useEffect(() => {
    if (!IS_LIVE) return;
    if (mode === "treatment") return;
    if (step !== 2 || !data.reason) return;

    const reason = BOOKING_REASONS.find(r => r.id === data.reason);
    if (!reason?.squareServiceVariationId) {
      setAvailabilityError(
        "Online booking isn't configured for this service yet. Please call us to schedule."
      );
      setAvailability({});
      return;
    }

    let cancelled = false;
    setLoadingSlots(true);
    setAvailabilityError(null);

    fetch(API("/api/availability"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceVariationId: reason.squareServiceVariationId,
        daysAhead: 14,
      }),
    })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Could not load availability");
        return j;
      })
      .then((j) => {
        if (cancelled) return;
        const grouped: Record<string, SquareSlot[]> = {};
        for (const s of j.slots || []) {
          const d = new Date(s.startAt);
          const k = dateKey(d);
          (grouped[k] = grouped[k] || []).push(s);
        }
        for (const k of Object.keys(grouped)) {
          grouped[k].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        }
        setAvailability(grouped);
      })
      .catch((e: Error) => { if (!cancelled) setAvailabilityError(e.message); })
      .finally(() => { if (!cancelled) setLoadingSlots(false); });

    return () => { cancelled = true; };
  }, [step, data.reason]);

  const canAdvance = (): boolean => {
    if (step === 1) return !!data.reason;
    if (step === 2) return !!data.date && (IS_LIVE ? !!data.slot : !!data.time);
    if (step === 3) return !!(data.first && data.last && data.email && data.phone);
    return true;
  };

  const next = () => canAdvance() && setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 1));
  const set = (k: string, v: any) => setData(d => ({ ...d, [k]: v }));

  const fmtDate = (d: Date | null): string => d ? `${DOW[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}` : "";

  const submitBooking = async () => {
    if (!IS_LIVE) {
      setStep(5);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(API("/api/bookings"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: data.slot,
          patient: {
            first: data.first,
            last: data.last,
            email: data.email,
            phone: data.phone,
            newPatient: data.newPatient,
            // TCPA texting consent — record state, time of opt-in, and the
            // exact label version the patient saw.
            textingConsent: data.textingConsent,
            consentTimestamp: data.textingConsent ? new Date().toISOString() : null,
            consentTextVersion: data.textingConsent ? SMS_CONSENT_VERSION : null,
          },
          note: data.note,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Booking failed");
      setStep(5);
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const liveDates = React.useMemo(() => {
    if (!IS_LIVE) return [];
    return Object.keys(availability)
      .sort()
      .map(k => {
        const [y, m, d] = k.split("-").map(Number);
        return new Date(y, m - 1, d);
      });
  }, [availability]);

  const datesToRender = IS_LIVE ? liveDates : demoDates;
  const slotsForSelectedDay = IS_LIVE && data.date
    ? (availability[dateKey(data.date)] || [])
    : [];

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
        <aside className="modal-aside">
          <Brand size={32} dark />
          <div className="aside-eyebrow" style={{ marginTop: 2 }}>Booking</div>
          <ol className="steps">
            <li className={`${step === 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}>
              <span className="step-num">{step > 1 ? "✓" : "1"}</span>
              {mode === "treatment" ? "Assessment" : "Reason for visit"}
            </li>
            <li className={`${step === 2 ? "active" : ""} ${step > 2 ? "done" : ""}`}>
              <span className="step-num">{step > 2 ? "✓" : "2"}</span>
              Date & time
            </li>
            <li className={`${step === 3 ? "active" : ""} ${step > 3 ? "done" : ""}`}>
              <span className="step-num">{step > 3 ? "✓" : "3"}</span>
              Your details
            </li>
            <li className={`${step === 4 ? "active" : ""}`}>
              <span className="step-num">4</span>
              Confirm
            </li>
          </ol>
          <div className="aside-foot">
            {IS_LIVE ? "Live calendar · synced to Square" : "Questions? Call " + window.RIO3_DATA.brand.phone}
          </div>
        </aside>

        <div className="modal-body">
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>

          {step === 1 && mode === "consultation" && (
            <div className="modal-step">
              <span className="step-eyebrow">Step 01 / 04</span>
              <h3>What brings you in?</h3>
              <p className="sub">Pick what fits closest — your clinician will refine the plan during your visit.</p>
              <div className="option-list">
                {BOOKING_REASONS.map(r => (
                  <button key={r.id}
                          className={`option ${data.reason === r.id ? "selected" : ""}`}
                          onClick={() => set("reason", r.id)}>
                    <span className="opt-radio" />
                    <span className="opt-body">
                      <div className="opt-title">{r.title}</div>
                      <div className="opt-desc">{r.desc}</div>
                    </span>
                    <span className="opt-meta">{r.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && mode === "treatment" && (
            <div className="modal-step">
              <span className="step-eyebrow">Step 01 / 04</span>
              <h3>Have you had an initial assessment?</h3>
              <p className="sub">All treatment sessions require a prior consultation with one of our clinicians.</p>
              <div className="option-list">
                {ASSESSMENT_OPTIONS.map(a => (
                  <button key={a.id}
                          className={`option ${data.reason === a.id ? "selected" : ""}`}
                          onClick={() => set("reason", a.id)}>
                    <span className="opt-radio" />
                    <span className="opt-body">
                      <div className="opt-title">{a.title}</div>
                      <div className="opt-desc">{a.desc}</div>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="modal-step">
              <span className="step-eyebrow">Step 02 / 04</span>
              <h3>When works for you?</h3>
              <p className="sub">
                {IS_LIVE
                  ? "Open slots from our live calendar. Times shown in Eastern."
                  : "Available dates in the next two weeks. Times shown in Eastern."}
              </p>

              {IS_LIVE && loadingSlots && (
                <div style={{ padding: 28, textAlign: "center", color: "var(--ink-mute)", fontSize: 14 }}>
                  Loading availability&hellip;
                </div>
              )}

              {IS_LIVE && availabilityError && (
                <div style={{ padding: 20, background: "var(--bg-elev)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--ink-soft)", fontSize: 14 }}>
                  {availabilityError} <br />
                  <a href={`tel:${window.RIO3_DATA.brand.phone}`} style={{ color: "var(--sage-deep)" }}>
                    Call {window.RIO3_DATA.brand.phone}
                  </a>
                </div>
              )}

              {(!IS_LIVE || (!loadingSlots && !availabilityError)) && (
                <>
                  <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 10 }}>
                    Choose a date
                  </div>
                  <div className="cal-grid">
                    {datesToRender.map((d, i) => {
                      const isSun = d.getDay() === 0;
                      const isSelected = !!(data.date && data.date.getTime() === d.getTime());
                      const isDisabled = !IS_LIVE && isSun;
                      return (
                        <button key={i}
                                disabled={isDisabled}
                                className={`cal-day ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                                onClick={() => { if (!isDisabled) { set("date", d); set("time", null); set("slot", null); } }}>
                          <span className="dow">{DOW[d.getDay()]}</span>
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  {data.date && (
                    <>
                      <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 10, marginTop: 10 }}>
                        Available times — {fmtDate(data.date)}
                      </div>
                      <div className="slots">
                        {IS_LIVE
                          ? slotsForSelectedDay.length === 0
                            ? <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>No slots remaining on this day.</div>
                            : slotsForSelectedDay.map(s => {
                                const label = fmtTime(s.startAt);
                                const sel = data.slot?.startAt === s.startAt;
                                return (
                                  <button key={s.startAt}
                                          className={`slot ${sel ? "selected" : ""}`}
                                          onClick={() => { set("slot", s); set("time", label); }}>
                                    {label}
                                  </button>
                                );
                              })
                          : DEMO_TIMES.map(t => (
                              <button key={t}
                                      className={`slot ${data.time === t ? "selected" : ""}`}
                                      onClick={() => set("time", t)}>
                                {t}
                              </button>
                            ))
                        }
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="modal-step">
              <span className="step-eyebrow">Step 03 / 04</span>
              <h3>Tell us about you.</h3>
              <p className="sub">We&apos;ll send a confirmation and an intake form to your email.</p>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="bk-first">First name</label>
                  <input id="bk-first" value={data.first} onChange={e => set("first", e.target.value)} placeholder="Marisa" />
                </div>
                <div className="field">
                  <label htmlFor="bk-last">Last name</label>
                  <input id="bk-last" value={data.last} onChange={e => set("last", e.target.value)} placeholder="Kovacs" />
                </div>
                <div className="field">
                  <label htmlFor="bk-email">Email</label>
                  <input id="bk-email" type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="you@example.com" />
                </div>
                <div className="field">
                  <label htmlFor="bk-phone">Phone</label>
                  <input id="bk-phone" type="tel" value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="(561) 555-0148" />
                </div>
                <div className="field full">
                  <label htmlFor="bk-note">Anything we should know? (optional)</label>
                  <textarea id="bk-note" value={data.note} onChange={e => set("note", e.target.value)} placeholder="Existing conditions, current meds, what you'd like to focus on…" />
                </div>
                <div className="full consent-field">
                  <input type="checkbox" id="bk-newpat" checked={data.newPatient} onChange={e => set("newPatient", e.target.checked)} />
                  <label htmlFor="bk-newpat">This is my first visit to Rio3</label>
                </div>
                <div className="full consent-field">
                  <input type="checkbox" id="bk-sms-consent" checked={data.textingConsent} onChange={e => set("textingConsent", e.target.checked)} />
                  <label htmlFor="bk-sms-consent">{SMS_CONSENT_TEXT}</label>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="modal-step">
              <span className="step-eyebrow">Step 04 / 04 &middot; Review</span>
              <h3>Confirm your visit.</h3>
              <p className="sub">
                {IS_LIVE
                  ? "We'll add this to the Square calendar and email a confirmation."
                  : "A clinician will review and send a confirmation to your email within one business hour."}
              </p>
              <div className="confirm-card">
                <div className="row">
                  <span className="label">{mode === "treatment" ? "Assessment" : "Reason"}</span>
                  <span className="val">
                    {mode === "treatment"
                      ? ASSESSMENT_OPTIONS.find(a => a.id === data.reason)?.title
                      : BOOKING_REASONS.find(r => r.id === data.reason)?.title}
                  </span>
                </div>
                <div className="row">
                  <span className="label">When</span>
                  <span className="val">{fmtDate(data.date)} &middot; {data.time}</span>
                </div>
                <div className="row">
                  <span className="label">Patient</span>
                  <span className="val">{data.first} {data.last}{data.newPatient && " · new patient"}</span>
                </div>
                <div className="row">
                  <span className="label">Email</span>
                  <span className="val">{data.email}</span>
                </div>
                <div className="row">
                  <span className="label">Phone</span>
                  <span className="val">{data.phone}</span>
                </div>
                {data.note && (
                  <div className="row">
                    <span className="label">Note</span>
                    <span className="val" style={{ fontWeight: 400 }}>{data.note}</span>
                  </div>
                )}
                <div className="row">
                  <span className="label">Location</span>
                  <span className="val" style={{ fontWeight: 400 }}>440 S Federal Hwy, Suite 205 &middot; Deerfield Beach</span>
                </div>
              </div>

              {submitError && (
                <div style={{ marginTop: 20, padding: 14, background: "#fdecea", border: "1px solid #f5b7b1", borderRadius: 8, color: "#922b21", fontSize: 13 }}>
                  {submitError}
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="modal-step">
              <div className="success">
                <div className="check">&check;</div>
                <h3>You&apos;re on the calendar.</h3>
                <p className="sub">
                  Confirmation sent to <strong>{data.email}</strong>. We&apos;ll text intake forms
                  to {data.phone} shortly. See you {fmtDate(data.date)} at {data.time}.
                </p>
                <button className="btn btn-primary" onClick={onClose}>Done <Arrow /></button>
              </div>
            </div>
          )}

          {step < 5 && (
            <div className="modal-foot">
              {step > 1 ? (
                <button className="btn btn-ghost" onClick={back} style={{ padding: "10px 18px", fontSize: 13 }}>
                  <Arrow rotate={180} size={12} /> Back
                </button>
              ) : <span />}
              <span className="step-meta">Step {step} of 4</span>
              <button className="btn btn-primary"
                      onClick={step === 4 ? submitBooking : next}
                      disabled={submitting || !canAdvance()}
                      style={{
                        opacity: (submitting || !canAdvance()) ? 0.4 : 1,
                        pointerEvents: (submitting || !canAdvance()) ? "none" : "auto",
                      }}>
                {step === 4
                  ? (submitting ? "Booking…" : "Confirm booking")
                  : "Continue"}
                {!submitting && <Arrow size={12} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConsultModal = ({ onClose }: { onClose: () => void }) => {
  const [done, setDone] = React.useState(false);
  const [data, setData] = React.useState({ first: "", last: "", email: "", phone: "", program: "", preferred: "", textingConsent: false });
  const set = (k: string, v: string | boolean) => setData(d => ({ ...d, [k]: v }));
  const canSubmit = !!(data.first && data.last && data.email && data.phone);

  const submitConsult = () => {
    if (!canSubmit) return;
    // Record the consent state with the submission: opt-in flag, timestamp,
    // and the exact label version the patient saw (or null if not given).
    const submission = {
      ...data,
      consentTimestamp: data.textingConsent ? new Date().toISOString() : null,
      consentTextVersion: data.textingConsent ? SMS_CONSENT_VERSION : null,
    };
    // TODO: when a backend is wired for consultation requests, POST `submission`.
    console.log("consultation request", submission);
    setDone(true);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal consult-modal" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
        <div className="modal-body" style={{ padding: "44px 48px" }}>
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>

          {!done ? (
            <div className="modal-step">
              <span className="step-eyebrow">Programs</span>
              <h3>Schedule a consultation.</h3>
              <p className="sub">
                Leave your details and a clinician will reach out within one business hour
                to walk you through your options and answer any questions.
              </p>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="cs-first">First name</label>
                  <input id="cs-first" value={data.first} onChange={e => set("first", e.target.value)} placeholder="Marisa" />
                </div>
                <div className="field">
                  <label htmlFor="cs-last">Last name</label>
                  <input id="cs-last" value={data.last} onChange={e => set("last", e.target.value)} placeholder="Kovacs" />
                </div>
                <div className="field">
                  <label htmlFor="cs-email">Email</label>
                  <input id="cs-email" type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="you@example.com" />
                </div>
                <div className="field">
                  <label htmlFor="cs-phone">Phone</label>
                  <input id="cs-phone" type="tel" value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="(561) 555-0148" />
                </div>
                <div className="field full">
                  <label htmlFor="cs-program">Which program interests you?</label>
                  <select id="cs-program" value={data.program} onChange={e => set("program", e.target.value)}>
                    <option value="">Not sure yet</option>
                    <option value="weight">Metabolic Reset — Weight Optimization</option>
                    <option value="reset">Total Reset — 12-Week Detox</option>
                    <option value="longevity">Performance &amp; Longevity</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="cs-preferred">Best time to reach you</label>
                  <select id="cs-preferred" value={data.preferred} onChange={e => set("preferred", e.target.value)}>
                    <option value="">No preference</option>
                    <option value="morning">Morning — 9 am to 12 pm</option>
                    <option value="afternoon">Afternoon — 12 to 5 pm</option>
                    <option value="evening">Evening — 5 to 7 pm</option>
                  </select>
                </div>
                <div className="full consent-field">
                  <input type="checkbox" id="cs-sms-consent" checked={data.textingConsent} onChange={e => set("textingConsent", e.target.checked)} />
                  <label htmlFor="cs-sms-consent">{SMS_CONSENT_TEXT}</label>
                </div>
              </div>
              <div className="modal-foot" style={{ marginTop: 32 }}>
                <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{window.RIO3_DATA.brand.phone}</span>
                <button
                  className="btn btn-primary"
                  onClick={submitConsult}
                  style={{ opacity: canSubmit ? 1 : 0.4, pointerEvents: canSubmit ? "auto" : "none" }}
                >
                  Request consultation <Arrow />
                </button>
              </div>
            </div>
          ) : (
            <div className="success">
              <div className="check">&check;</div>
              <h3>We&apos;ll be in touch.</h3>
              <p className="sub">
                Expect a call or text to <strong>{data.phone}</strong> within one business hour.
              </p>
              <button className="btn btn-primary" onClick={onClose}>Done <Arrow /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { BookingModal, ConsultModal });
