import { useState, useEffect } from "react";

const SETTINGS_DB = {
  PLA: {
    "0.2": { quality: { temp: 215, bed: 55, speed: 80, layer: 0.1, retract: 0.5, fan: 100, pa: 0.02, flow: 0.98, accel: 3000 }, balanced: { temp: 220, bed: 60, speed: 150, layer: 0.2, retract: 0.5, fan: 100, pa: 0.025, flow: 0.98, accel: 5000 }, speed: { temp: 225, bed: 60, speed: 300, layer: 0.2, retract: 0.4, fan: 100, pa: 0.03, flow: 1.0, accel: 8000 } },
    "0.4": { quality: { temp: 215, bed: 55, speed: 100, layer: 0.12, retract: 0.5, fan: 100, pa: 0.02, flow: 0.98, accel: 4000 }, balanced: { temp: 220, bed: 60, speed: 200, layer: 0.2, retract: 0.5, fan: 100, pa: 0.025, flow: 0.98, accel: 6000 }, speed: { temp: 225, bed: 60, speed: 400, layer: 0.28, retract: 0.4, fan: 100, pa: 0.03, flow: 1.0, accel: 10000 } },
    "0.6": { quality: { temp: 220, bed: 60, speed: 120, layer: 0.2, retract: 0.6, fan: 100, pa: 0.018, flow: 0.97, accel: 4000 }, balanced: { temp: 225, bed: 60, speed: 250, layer: 0.3, retract: 0.5, fan: 100, pa: 0.022, flow: 0.98, accel: 7000 }, speed: { temp: 230, bed: 65, speed: 450, layer: 0.36, retract: 0.4, fan: 100, pa: 0.028, flow: 1.0, accel: 10000 } },
    "0.8": { quality: { temp: 220, bed: 60, speed: 100, layer: 0.28, retract: 0.8, fan: 100, pa: 0.015, flow: 0.97, accel: 3000 }, balanced: { temp: 225, bed: 60, speed: 200, layer: 0.4, retract: 0.6, fan: 100, pa: 0.02, flow: 0.98, accel: 6000 }, speed: { temp: 230, bed: 65, speed: 350, layer: 0.48, retract: 0.5, fan: 100, pa: 0.025, flow: 1.0, accel: 9000 } },
  },
  PETG: {
    "0.4": { quality: { temp: 235, bed: 75, speed: 80, layer: 0.15, retract: 1.0, fan: 40, pa: 0.045, flow: 0.96, accel: 3000 }, balanced: { temp: 240, bed: 80, speed: 150, layer: 0.2, retract: 1.0, fan: 50, pa: 0.05, flow: 0.96, accel: 4000 }, speed: { temp: 245, bed: 85, speed: 250, layer: 0.28, retract: 0.8, fan: 60, pa: 0.055, flow: 0.97, accel: 6000 } },
    "0.2": { quality: { temp: 235, bed: 75, speed: 60, layer: 0.1, retract: 1.0, fan: 30, pa: 0.04, flow: 0.95, accel: 2000 }, balanced: { temp: 240, bed: 80, speed: 120, layer: 0.15, retract: 1.0, fan: 40, pa: 0.045, flow: 0.96, accel: 3500 }, speed: { temp: 245, bed: 85, speed: 200, layer: 0.2, retract: 0.8, fan: 50, pa: 0.05, flow: 0.97, accel: 5000 } },
    "0.6": { quality: { temp: 235, bed: 80, speed: 90, layer: 0.2, retract: 1.2, fan: 40, pa: 0.04, flow: 0.95, accel: 3000 }, balanced: { temp: 240, bed: 80, speed: 170, layer: 0.3, retract: 1.0, fan: 50, pa: 0.045, flow: 0.96, accel: 5000 }, speed: { temp: 245, bed: 85, speed: 280, layer: 0.36, retract: 0.9, fan: 60, pa: 0.05, flow: 0.97, accel: 7000 } },
    "0.8": { quality: { temp: 235, bed: 80, speed: 80, layer: 0.28, retract: 1.2, fan: 30, pa: 0.035, flow: 0.95, accel: 2500 }, balanced: { temp: 240, bed: 80, speed: 150, layer: 0.4, retract: 1.0, fan: 40, pa: 0.04, flow: 0.96, accel: 4500 }, speed: { temp: 245, bed: 85, speed: 250, layer: 0.48, retract: 0.9, fan: 50, pa: 0.045, flow: 0.97, accel: 6500 } },
  },
  ABS: { locked: true },
  ASA: { locked: true },
  TPU: { locked: true },
  "PA-CF": { locked: true },
  PC: { locked: true },
};

const PRINTERS = [
  { id: "x1c",    name: "X1C",     free: true  },
  { id: "p1s",    name: "P1S",     free: true  },
  { id: "p2s",    name: "P2S",     free: true  },
  { id: "p1p",    name: "P1P",     free: true  },
  { id: "a1",     name: "A1",      free: true  },
  { id: "a1mini", name: "A1 Mini", free: true  },
  { id: "x2d",    name: "X2D",     free: false },
  { id: "h2d",    name: "H2D",     free: false },
  { id: "h2s",    name: "H2S",     free: false },
  { id: "h2c",    name: "H2C",     free: false },
];

const FILAMENTS = [
  { id: "PLA",   free: true,  color: "#4ade80" },
  { id: "PETG",  free: true,  color: "#60a5fa" },
  { id: "ABS",   free: false, color: "#f97316" },
  { id: "ASA",   free: false, color: "#a78bfa" },
  { id: "TPU",   free: false, color: "#f43f5e" },
  { id: "PA-CF", free: false, color: "#94a3b8" },
  { id: "PC",    free: false, color: "#fbbf24" },
];

const NOZZLES = ["0.2", "0.4", "0.6", "0.8"];
const GOALS = [
  { id: "quality",  label: "Max Quality", icon: "◈" },
  { id: "balanced", label: "Balanced",    icon: "◉" },
  { id: "speed",    label: "Max Speed",   icon: "◎" },
];

const PRINTER_MULTIPLIERS = {
  a1mini: { speed: 0.80, note: "Compact bed slinger, 500mm/s" },
  a1:     { speed: 0.85, note: "Bed slinger, great for PLA/PETG, 500mm/s" },
  p1p:    { speed: 0.90, note: "Open frame CoreXY, 500mm/s" },
  p1s:    { speed: 0.95, note: "Enclosed CoreXY, 500mm/s, great for ABS/ASA" },
  x1c:    { speed: 1.00, note: "Enclosed CoreXY, 500mm/s, LiDAR" },
  x2d:    { speed: 1.05, note: "Dual nozzle, enclosed CoreXY, active chamber" },
  p2s:    { speed: 1.08, note: "Enclosed CoreXY, 600mm/s, DynaSense extruder" },
  h2s:    { speed: 1.15, note: "Large CoreXY, 1000mm/s, 65°C chamber, 340×320×340mm" },
  h2d:    { speed: 1.15, note: "Dual nozzle, 1000mm/s, 65°C chamber, dual ball screw Z" },
  h2c:    { speed: 1.20, note: "Vortek 6-hotend, 1000mm/s, 65°C chamber, zero purge waste" },
};

export default function App() {
  const [printer, setPrinter]       = useState("x1c");
  const [filament, setFilament]     = useState("PLA");
  const [nozzle, setNozzle]         = useState("0.4");
  const [goal, setGoal]             = useState("balanced");
  const [showPremium, setShowPremium] = useState(false);
  const [revealed, setRevealed]     = useState(false);
  const [copied, setCopied]         = useState(null);
  const [isPro, setIsPro]           = useState(() => localStorage.getItem("bambu_pro") === "true");
  const [licenseKey, setLicenseKey] = useState("");
  const [keyStatus, setKeyStatus]   = useState(null); // null | "checking" | "valid" | "invalid"

  const verifyLicense = async () => {
    if (!licenseKey.trim()) return;
    setKeyStatus("checking");
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license_key: licenseKey.trim() }),
      });
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem("bambu_pro", "true");
        setIsPro(true);
        setKeyStatus("valid");
        setTimeout(() => setShowPremium(false), 1000);
      } else {
        setKeyStatus("invalid");
      }
    } catch {
      setKeyStatus("invalid");
    }
  };

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, [printer, filament, nozzle, goal]);

  const filamentData   = SETTINGS_DB[filament];
  const isLocked       = !isPro && (filamentData?.locked || PRINTERS.find(p => p.id === printer)?.free === false);
  const settings       = !isLocked ? filamentData?.[nozzle]?.[goal] : null;
  const mult           = PRINTER_MULTIPLIERS[printer]?.speed || 1;
  const adjustedSpeed  = settings ? Math.round(settings.speed * mult) : null;

  const copyValue = (key, val) => {
    navigator.clipboard?.writeText(String(val));
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      color: "#e2e8f0",
      padding: "0",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto", padding: "40px 20px 60px" }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, border: "1.5px solid #22d3ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#22d3ee" }}>⬡</div>
            <span style={{ fontSize: 11, letterSpacing: 4, color: "#22d3ee", textTransform: "uppercase" }}>Bambu Optimizer</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(24px, 5vw, 38px)", fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>
            Print Settings<br /><span style={{ color: "#22d3ee" }}>Calculator</span>
          </h1>
          <p style={{ margin: "12px 0 0", color: "#64748b", fontSize: 13, letterSpacing: 0.5 }}>
            Tuned profiles for Bambu Lab printers — select your config below
          </p>
        </div>

        <div style={{ display: "grid", gap: 20, marginBottom: 24 }}>
          <Section label="01 — PRINTER">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PRINTERS.map(p => (
                <Chip key={p.id} active={printer === p.id} locked={!p.free}
                  onClick={() => p.free ? setPrinter(p.id) : setShowPremium(true)} label={p.name} />
              ))}
            </div>
          </Section>

          <Section label="02 — FILAMENT">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FILAMENTS.map(f => (
                <Chip key={f.id} active={filament === f.id} locked={!f.free} accentColor={f.color}
                  onClick={() => f.free ? setFilament(f.id) : setShowPremium(true)} label={f.id} />
              ))}
            </div>
          </Section>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Section label="03 — NOZZLE (mm)">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {NOZZLES.map(n => (
                  <Chip key={n} active={nozzle === n} onClick={() => setNozzle(n)} label={n} />
                ))}
              </div>
            </Section>
            <Section label="04 — GOAL">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {GOALS.map(g => (
                  <Chip key={g.id} active={goal === g.id} onClick={() => setGoal(g.id)} label={`${g.icon} ${g.label}`} wide />
                ))}
              </div>
            </Section>
          </div>
        </div>

        <div style={{ border: "1px solid #1e293b", background: "#0d1117", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: 3, color: "#475569", textTransform: "uppercase" }}>Output Profile</span>
            <span style={{ fontSize: 11, color: "#22d3ee", opacity: 0.7 }}>{PRINTER_MULTIPLIERS[printer]?.note}</span>
          </div>

          {isLocked ? (
            <LockedOutput onUnlock={() => setShowPremium(true)} filament={filament} printer={printer} />
          ) : settings ? (
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#475569", marginBottom: 12, textTransform: "uppercase" }}>Core Settings</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                  <StatRow label="Nozzle Temp"  value={`${settings.temp}°C`}       k="temp"    copied={copied} onCopy={copyValue} color="#f97316" revealed={revealed} delay={0} />
                  <StatRow label="Bed Temp"     value={`${settings.bed}°C`}        k="bed"     copied={copied} onCopy={copyValue} color="#f59e0b" revealed={revealed} delay={1} />
                  <StatRow label="Print Speed"  value={`${adjustedSpeed} mm/s`}    k="speed"   copied={copied} onCopy={copyValue} color="#22d3ee" revealed={revealed} delay={2} />
                  <StatRow label="Layer Height" value={`${settings.layer} mm`}     k="layer"   copied={copied} onCopy={copyValue} color="#4ade80" revealed={revealed} delay={3} />
                  <StatRow label="Retraction"   value={`${settings.retract} mm`}   k="retract" copied={copied} onCopy={copyValue} color="#a78bfa" revealed={revealed} delay={4} />
                  <StatRow label="Fan Speed"    value={`${settings.fan}%`}         k="fan"     copied={copied} onCopy={copyValue} color="#60a5fa" revealed={revealed} delay={5} />
                </div>
              </div>

              {isPro ? (
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: "#475569", marginBottom: 12, textTransform: "uppercase" }}>Advanced Settings</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                    <StatRow label="Pressure Advance" value={`${settings.pa}`}          k="pa"    copied={copied} onCopy={copyValue} color="#22d3ee" revealed={revealed} delay={6} />
                    <StatRow label="Flow Ratio"        value={`${settings.flow}`}         k="flow"  copied={copied} onCopy={copyValue} color="#4ade80" revealed={revealed} delay={7} />
                    <StatRow label="Accel"             value={`${settings.accel} mm/s²`} k="accel" copied={copied} onCopy={copyValue} color="#f97316" revealed={revealed} delay={8} />
                  </div>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <div style={{ filter: "blur(4px)", opacity: 0.4, pointerEvents: "none" }}>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: "#475569", marginBottom: 12, textTransform: "uppercase" }}>Advanced Settings</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                      <StatRow label="Pressure Advance" value="0.0XX"       k="pa"    copied={null} onCopy={() => {}} color="#22d3ee" revealed={true} delay={0} />
                      <StatRow label="Flow Ratio"        value="X.XX"        k="flow"  copied={null} onCopy={() => {}} color="#4ade80" revealed={true} delay={0} />
                      <StatRow label="Accel"             value="XXXX mm/s²" k="accel" copied={null} onCopy={() => {}} color="#f97316" revealed={true} delay={0} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 2, textTransform: "uppercase" }}>Advanced settings locked</div>
                    <button onClick={() => setShowPremium(true)} style={{
                      background: "#22d3ee", color: "#0a0a0f", border: "none", padding: "8px 20px",
                      fontSize: 11, fontFamily: "inherit", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 700,
                    }}>Unlock Pro — $7</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: 40, textAlign: "center", color: "#334155", fontSize: 13 }}>No profile found for this configuration</div>
          )}
        </div>

        <div style={{ marginTop: 20, fontSize: 11, color: "#334155", letterSpacing: 0.5 }}>
          Settings tuned for Bambu Lab hardware. Always run a calibration print after major filament changes.
        </div>
      </div>

      {showPremium && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => { setShowPremium(false); setKeyStatus(null); setLicenseKey(""); }}>
          <div style={{ background: "#0d1117", border: "1px solid #22d3ee", padding: 36, maxWidth: 420, width: "100%", position: "relative" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#22d3ee", marginBottom: 16, textTransform: "uppercase" }}>Pro Access</div>
            <h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: 700 }}>Unlock Everything</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {["ABS, ASA, TPU, PA-CF, PC profiles","Pressure Advance values per filament","Flow ratio & acceleration tuning","X2D dual-nozzle profiles","All future filament additions"].map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, color: "#94a3b8" }}>
                  <span style={{ color: "#22d3ee" }}>→</span> {f}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#22d3ee" }}>$7</span>
              <span style={{ fontSize: 12, color: "#475569" }}>one-time · instant access</span>
            </div>

            {/* Step 1: Buy */}
            <a href="https://priddyverse51.gumroad.com/l/uaclxj" target="_blank" rel="noopener noreferrer" style={{
              display: "block", width: "100%", background: "#22d3ee", color: "#0a0a0f",
              border: "none", padding: "14px 0", fontSize: 13, fontFamily: "inherit",
              letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 700,
              marginBottom: 16, textAlign: "center", textDecoration: "none",
            }}>Get Pro Access → $7</a>

            {/* Step 2: Enter license key */}
            <div style={{ borderTop: "1px solid #1e293b", paddingTop: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 10, textTransform: "uppercase" }}>Already purchased? Enter your license key</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={licenseKey}
                  onChange={e => { setLicenseKey(e.target.value); setKeyStatus(null); }}
                  onKeyDown={e => e.key === "Enter" && verifyLicense()}
                  placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  style={{
                    flex: 1, background: "#0a0a0f", border: `1px solid ${keyStatus === "invalid" ? "#f43f5e" : keyStatus === "valid" ? "#4ade80" : "#2d3748"}`,
                    color: "#e2e8f0", padding: "10px 12px", fontSize: 11,
                    fontFamily: "inherit", letterSpacing: 1, outline: "none",
                  }}
                />
                <button onClick={verifyLicense} disabled={keyStatus === "checking"} style={{
                  background: "transparent", border: "1px solid #22d3ee", color: "#22d3ee",
                  padding: "10px 16px", fontSize: 11, fontFamily: "inherit",
                  letterSpacing: 1, cursor: "pointer", whiteSpace: "nowrap",
                }}>
                  {keyStatus === "checking" ? "..." : keyStatus === "valid" ? "✓" : "Verify"}
                </button>
              </div>
              {keyStatus === "invalid" && (
                <div style={{ fontSize: 11, color: "#f43f5e", marginTop: 8 }}>Invalid key — check your Gumroad receipt and try again</div>
              )}
              {keyStatus === "valid" && (
                <div style={{ fontSize: 11, color: "#4ade80", marginTop: 8 }}>✓ Unlocked! Welcome to Pro</div>
              )}
            </div>

            <button onClick={() => { setShowPremium(false); setKeyStatus(null); setLicenseKey(""); }} style={{
              width: "100%", background: "transparent", color: "#475569",
              border: "1px solid #1e293b", padding: "10px 0", fontSize: 11,
              fontFamily: "inherit", letterSpacing: 2, textTransform: "uppercase",
              cursor: "pointer", marginTop: 12,
            }}>Maybe later</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ border: "1px solid #1e293b", padding: 16, background: "#0d1117" }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: "#475569", marginBottom: 12, textTransform: "uppercase" }}>{label}</div>
      {children}
    </div>
  );
}

function Chip({ active, locked, onClick, label, accentColor, wide }) {
  return (
    <button onClick={onClick} style={{
      background: active ? (accentColor || "#22d3ee") : "transparent",
      color: active ? "#0a0a0f" : locked ? "#334155" : "#94a3b8",
      border: `1px solid ${active ? (accentColor || "#22d3ee") : locked ? "#1e293b" : "#2d3748"}`,
      padding: wide ? "8px 16px" : "6px 14px",
      fontSize: 12, fontFamily: "inherit", letterSpacing: 1,
      cursor: "pointer", fontWeight: active ? 700 : 400,
      display: "flex", alignItems: "center", gap: 6,
      width: wide ? "100%" : "auto",
      transition: "all 0.15s",
      position: "relative",
    }}>
      {locked && <span style={{ fontSize: 10, opacity: 0.6 }}>⬡</span>}
      {label}
    </button>
  );
}

function StatRow({ label, value, k, copied, onCopy, color, revealed, delay }) {
  return (
    <div onClick={() => onCopy(k, value)} style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 12px", background: "#0a0a0f", cursor: "pointer",
      borderLeft: `2px solid ${color}`,
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateX(0)" : "translateX(-8px)",
      transition: `opacity 0.2s ${delay * 0.05}s, transform 0.2s ${delay * 0.05}s`,
    }} title="Click to copy">
      <span style={{ fontSize: 11, color: "#475569", letterSpacing: 1 }}>{label}</span>
      <span style={{ fontSize: 13, color: copied === k ? "#4ade80" : "#e2e8f0", fontWeight: 600, letterSpacing: 1 }}>
        {copied === k ? "✓ copied" : value}
      </span>
    </div>
  );
}

function LockedOutput({ onUnlock, filament, printer }) {
  const isPrinterLocked = !PRINTERS.find(p => p.id === printer)?.free;
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <div style={{ fontSize: 24, marginBottom: 16, color: "#22d3ee" }}>⬡</div>
      <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 8 }}>
        {isPrinterLocked ? `${printer.toUpperCase()} profiles are Pro only` : `${filament} profiles are Pro only`}
      </div>
      <div style={{ fontSize: 12, color: "#475569", marginBottom: 24 }}>
        Unlock all filaments, advanced settings, and X2D profiles
      </div>
      <button onClick={onUnlock} style={{
        background: "#22d3ee", color: "#0a0a0f", border: "none", padding: "10px 28px",
        fontSize: 12, fontFamily: "inherit", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 700,
      }}>Unlock Pro — $7</button>
    </div>
  );
}
