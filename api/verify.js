export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { license_key } = req.body;

  const response = await fetch(
    "https://api.gumroad.com/v2/licenses/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        product_id: "uaclxj",
        license_key,
      }),
    }
  );

  const data = await response.json();

  if (data.success) {
    return res.status(200).json({
      valid: true,
      email: data.purchase?.email,
    });
  }

  return res.status(401).json({
    valid: false,
  });
}
