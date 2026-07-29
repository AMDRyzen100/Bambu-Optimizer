import React, { useState } from "react";

export default function VerifyModal({ onClose, onSuccess }) {
  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!licenseKey.trim()) {
      setErrorMessage("Please enter a license key.");
      return;
    }

    setLoading(true);

    try {
      // Connects directly with your custom Next.js server route
      const res = await fetch("/api/verify-license", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ license_key: licenseKey.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.valid === true) {
        // Run the custom dashboard unlock routine
        onSuccess();
      } else {
        setErrorMessage(data.error || "Invalid key - check your Gumroad receipt and try again");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 border border-cyan-500/30 max-w-sm w-full p-8 rounded-lg shadow-2xl relative text-center">
        
        <span className="text-xs uppercase text-cyan-400 font-bold tracking-widest">Pro Access</span>
        <h2 className="text-2xl font-bold mt-1 mb-4">Unlock Everything</h2>
        
        <ul className="text-left text-sm text-slate-300 space-y-2 mb-6 inline-block mx-auto">
          <li>→ ABS, ASA, TPU, PA-CF profiles</li>
          <li>→ Pressure Advance & Flow Tuning</li>
          <li>→ X2D dual-nozzle optimization</li>
        </ul>

        <div className="text-2xl font-bold text-cyan-400 mb-6">$7 <span className="text-xs text-slate-500 font-normal">one-time payment</span></div>

        <a 
          href="https://gumroad.com" // Fix link to your actual Gumroad page
          target="_blank" 
          rel="noreferrer"
          className="block w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded mb-6 transition text-sm"
        >
          GET PRO ACCESS → $7
        </a>

        <div className="border-t border-slate-800 pt-4 text-left">
          <label className="text-xs text-slate-500 block mb-2 font-semibold uppercase tracking-wider">
            Already Purchased? Enter your license key
          </label>
          
          <form onSubmit={handleVerify} className="flex gap-2 mb-2">
            <input 
              type="text" 
              placeholder="08BCCA0F-9DFB43C3-..."
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="bg-slate-950 text-white font-mono text-xs p-2.col border border-slate-800 focus:border-cyan-500 rounded flex-1 outline-none uppercase"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/20 px-3 py-2 rounded text-xs font-semibold tracking-wide transition disabled:opacity-50"
            >
              {loading ? "..." : "Verify"}
            </button>
          </form>

          {errorMessage && (
            <p className="text-red-500 text-xs mt-2 leading-tight text-center">{errorMessage}</p>
          )}
        </div>

        <button 
          onClick={onClose}
          className="text-xs tracking-widest font-semibold uppercase text-slate-600 hover:text-slate-400 transition mt-6 block mx-auto"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
