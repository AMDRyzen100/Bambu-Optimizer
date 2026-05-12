export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { license_key } = req.body;
  if (!license_key) return res.status(400).json({ error: "Missing license_key" });

  // Replace GUMROAD_PRODUCT_ID with your actual product permalink after creating it
  const PRODUCT_ID = process.env.GUMROAD_PRODUCT_ID || "bambu-optimizer-pro";

  try {
    const response = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        product_id: PRODUCT_ID,
        license_key: license_key.trim(),
        increment_uses_count: "false",
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false, message: data.message || "Invalid license key" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification failed", details: err.message });
  }
}
