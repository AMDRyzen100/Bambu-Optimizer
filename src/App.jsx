import React, { useState, useEffect } from "react";
import VerifyModal from "./components/VerifyModal";

export default function App() {
  const [isPro, setIsPro] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  // 1. Check local storage instantly on app launch to see if they unlocked pro previously
  useEffect(() => {
    const savedProStatus = localStorage.getItem("bambu_pro_unlocked");
    if (savedProStatus === "true") {
      setIsPro(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* GLOBAL NAVBAR / NAVIGATION HEADER */}
      <header className="border-b border-slate-900 bg-slate-950/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              BAMBU OPTIMIZER
            </span>
          </div>
          
          <div>
            {!isPro ? (
              <button 
                onClick={() => setShowVerifyModal(true)}
                className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 px-4 py-2 rounded font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
              >
                UPGRADE TO PRO
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded text-xs font-black tracking-widest uppercase animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                PRO ACTIVE
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN APPLICATION DASHBOARD DASH */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT SIDE/MIDDLE PANELS: Place your standard structural calculator configs here */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/60 border border-slate-900 p-6 rounded-xl">
              <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span>🎛️</span> Standard Volumetric Calculations
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                PLA, PETG, and standard generic profile adjustments calculate accurately inside this primary runtime canvas. Adjust layer settings freely.
              </p>
              {/* Drop your active sliders / logic inputs directly here */}
            </div>
          </div>

          {/* RIGHT SIDE PANEL: Controlled Gate Custom Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-6 relative min-h-[350px] flex flex-col justify-between overflow-hidden">
              
              {isPro ? (
                // --- UNLOCKED: Renders your live premium engineering specs ---
                <div className="h-full flex flex-col justify-between animate-fade-in">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wide uppercase mb-4">
                      <span>🚀</span> Pro Engineering Spec Profiles
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-950/60 border border-slate-800/60 p-3 rounded-lg">
                        <span className="text-xs font-semibold text-slate-400 block mb-1">ABS / ASA Profile</span>
                        <code className="text-xs text-cyan-300 font-mono">Max Volumetric: 18 mm³/s | PA: 0.024</code>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-800/60 p-3 rounded-lg">
                        <span className="text-xs font-semibold text-slate-400 block mb-1">TPU (Flex 95A)</span>
                        <code className="text-xs text-cyan-300 font-mono">Max Volumetric: 3.5 mm³/s | Retraction: 1.4mm</code>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-800/60 p-3 rounded-lg">
                        <span className="text-xs font-semibold text-slate-400 block mb-1">PA-CF Struct Specs</span>
                        <code className="text-xs text-cyan-300 font-mono">Flow Ratio: 0.945 | Temp: 275°C</code>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 font-medium italic mt-6">
                    All updates & future nozzle calibrations sync dynamically.
                  </p>
                </div>
              ) : (
                // --- LOCKED: Interactive blur screen overlay paywall blocker ---
                <>
                  <div className="opacity-25 pointer-events-none select-none">
                    <div className="text-slate-500 font-bold text-sm mb-4">🔒 Advanced Profiles</div>
                    <div className="space-y-2">
                      <div className="h-10 bg-slate-800 rounded"></div>
                      <div className="h-10 bg-slate-800 rounded"></div>
                      <div className="h-10 bg-slate-800 rounded"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[4px] flex flex-col justify-center items-center p-6 text-center">
                    <div className="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-xl shadow-xl mb-4">
                      <span className="text-xl">🔒</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-100 mb-1">Unlock Engineering Specs</h3>
                    <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed mb-6">
                      Get absolute pressure advance values, fine-tuned flow ratios, and custom X2D dual-nozzle structural rules.
                    </p>
                    <button 
                      onClick={() => setShowVerifyModal(true)}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      Unlock Everything ($7)
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* RENDER MODAL CONDITIONAL DETECTOR */}
      {showVerifyModal && (
        <VerifyModal 
          onClose={() => setShowVerifyModal(false)} 
          onSuccess={() => {
            // This is the direct hook callback. 
            // When the inner verification modal gets a 200 from the backend, it calls this function.
            setIsPro(true);
            localStorage.setItem("bambu_pro_unlocked", "true");
            setShowVerifyModal(false);
          }}
        />
      )}
    </div>
  );
}
