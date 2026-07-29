import React, { useState, useEffect } from "react";
import VerifyModal from "./components/VerifyModal";

export default function App() {
  const [isPro, setIsPro] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  useEffect(() => {
    const savedProStatus = localStorage.getItem("bambu_pro_unlocked");
    if (savedProStatus === "true") {
      setIsPro(true);
    }
  }, []);

  // Inline CSS Styles object to prevent Tailwind missing-class bugs
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#020617",
      color: "#ffffff",
      fontFamily: "sans-serif",
      padding: "24px",
      boxSizing: "border-box",
    },
    header: {
      maxWidth: "1024px",
      margin: "0 auto 32px auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #0f172a",
      paddingBottom: "16px",
    },
    logo: {
      fontSize: "20px",
      fontWeight: "900",
      letterSpacing: "-0.5px",
      color: "#22d3ee",
    },
    proBadge: {
      backgroundColor: "rgba(34, 211, 238, 0.1)",
      border: "1px solid rgba(34, 211, 238, 0.3)",
      color: "#22d3ee",
      padding: "6px 12px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
    },
    btn: {
      backgroundColor: "#22d3ee",
      color: "#020617",
      border: "none",
      padding: "10px 16px",
      borderRadius: "4px",
      fontWeight: "bold",
      fontSize: "12px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    mainLayout: {
      maxWidth: "1024px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "window.innerWidth > 768 ? '2fr 1fr' : '1fr'",
      gap: "24px",
    },
    card: {
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      border: "1px solid #0f172a",
      padding: "24px",
      borderRadius: "12px",
    },
    paywallContainer: {
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      border: "1px solid #0f172a",
      borderRadius: "12px",
      padding: "24px",
      position: "relative",
      minHeight: "320px",
      overflow: "hidden",
    },
    blurOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(2, 6, 23, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px",
      textAlign: "center",
    },
    specRow: {
      backgroundColor: "rgba(2, 6, 23, 0.6)",
      border: "1px solid #1e293b",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "12px",
    },
    codeLabel: {
      fontSize: "11px",
      color: "#94a3b8",
      display: "block",
      marginBottom: "4px",
      fontWeight: "600",
    },
    codeText: {
      fontSize: "12px",
      color: "#67e8f9",
      fontFamily: "monospace",
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER NAVBAR */}
      <header style={styles.header}>
        <div style={styles.logo}>BAMBU OPTIMIZER</div>
        <div>
          {!isPro ? (
            <button style={styles.btn} onClick={() => setShowVerifyModal(true)}>
              UPGRADE TO PRO
            </button>
          ) : (
            <div style={styles.proBadge}>✓ PRO ACTIVE</div>
          )}
        </div>
      </header>

      {/* DASHBOARD LAYOUT GRID */}
      <div style={styles.mainLayout}>
        
        {/* LEFT COLUMN: STANDARDS */}
        <div style={styles.card}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
            🎛️ Standard Volumetric Calculations
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6" }}>
            PLA, PETG, and basic generic profile parameters calculate accurately inside this primary workspace. Adjust layer settings freely.
          </p>
          {/* Drop your slider controls or input boxes directly here */}
        </div>

        {/* RIGHT COLUMN: GATED CONTENT */}
        <div style={styles.paywallContainer}>
          {isPro ? (
            /* UNLOCKED SPECS */
            <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#22d3ee", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  🚀 Pro Engineering Specs
                </h3>
                
                <div style={styles.specRow}>
                  <span style={styles.codeLabel}>ABS / ASA Profile</span>
                  <code style={styles.codeText}>Max Volumetric: 18 mm³/s | PA: 0.024</code>
                </div>
                
                <div style={styles.specRow}>
                  <span style={styles.codeLabel}>TPU (Flex 95A)</span>
                  <code style={styles.codeText}>Max Volumetric: 3.5 mm³/s | Retract: 1.4mm</code>
                </div>
                
                <div style={styles.specRow}>
                  <span style={styles.codeLabel}>PA-CF Structure Specs</span>
                  <code style={styles.codeText}>Flow Ratio: 0.945 | Temp: 275°C</code>
                </div>
              </div>
              <p style={{ fontSize: "10px", color: "#64748b", fontStyle: "italic", marginTop: "16px" }}>
                Future updates and nozzle tunings sync automatically.
              </p>
            </div>
          ) : (
            /* LOCKED GATED COVER WITH INLINE BLUR OVERLAY */
            <>
              <div style={{ opacity: 0.15, pointerEvents: "none", userSelect: "none" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "12px" }}>🔒 Advanced Profiles</div>
                <div style={{ height: "40px", backgroundColor: "#1e293b", borderRadius: "4px", marginBottom: "8px" }}></div>
                <div style={{ height: "40px", backgroundColor: "#1e293b", borderRadius: "4px" }}></div>
              </div>

              <div style={styles.blurOverlay}>
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>🔒</div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "6px" }}>Unlock Engineering Specs</h3>
                <p style={{ fontSize: "12px", color: "#94a3b8", maxWidth: "240px", lineHeight: "1.5", marginBottom: "20px" }}>
                  Get absolute pressure advance values, fine-tuned flow ratios, and custom structural rules.
                </p>
                <button style={styles.btn} onClick={() => setShowVerifyModal(true)}>
                  Unlock Everything ($7)
                </button>
              </div>
            </>
          )}
        </div>

      </div>

      {/* POPUP MODAL CALL */}
      {showVerifyModal && (
        <VerifyModal 
          onClose={() => setShowVerifyModal(false)} 
          onSuccess={() => {
            setIsPro(true);
            localStorage.setItem("bambu_pro_unlocked", "true");
            setShowVerifyModal(false);
          }}
        />
      )}
    </div>
  );
}
