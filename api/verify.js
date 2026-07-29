export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { license_key } = req.body;

  // 1. Fail early if the license key is missing or formatted poorly
  if (!license_key || typeof license_key !== 'string' || license_key.trim() === '') {
    return res.status(400).json({ valid: false, error: "License key is required" });
  }

  try {
    const response = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // 2. Safely stringify the body params
      body: new URLSearchParams({
        product_id: "Jd1TaUM8Soccnx3O4X4kKA", 
        license_key: license_key.trim(),
      }).toString(), 
    });

    // 3. Prevent crashes if Gumroad's API goes down or returns a 5xx error
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ valid: false, error: "Gumroad API error" });
    }

    const data = await response.json();

    // 4. Critical Security Check: Ensure key is active and NOT refunded/disputed
    if (
      data.success && 
      data.purchase && 
      !data.purchase.refunded && 
      !data.purchase.disputed &&
      !data.purchase.chargeback
    ) {
      return res.status(200).json({
        valid: true,
        email: data.purchase.email,
        uses: data.uses, // Useful if you want to track multi-device usage
      });
    }

    // Default response for failed verification or bad status
    return res.status(401).json({
      valid: false,
      error: "Invalid, refunded, or inactive license key",
    });

  } catch (error) {
    // 5. Catch unexpected runtime errors
    return res.status(500).json({ valid: false, error: "Internal server error" });
  }
}
