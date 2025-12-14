import validator from "validator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { experience, portfolio, contact } = req.body;

  const allowedExperience = [
    "0 months", "3 months", "6 months", "9 months", "1 year+"
  ];

  const allowedPortfolio = [
    "$5,000–$10,000", "$10,000–$20,000", "$20,000–$30,000", "$30,000+"
  ];

  if (
    !allowedExperience.includes(experience) ||
    !allowedPortfolio.includes(portfolio)
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const cleanContact = validator.escape(
    validator.trim(contact || "")
  );

  const message =
`📥 New Mason Ledger Application

Experience: ${experience}
Portfolio: ${portfolio}
Contact: ${cleanContact}
`;

  await fetch(
    "https://api.telegram.org/bot8555305756:AAEUI4etbd3FbVh9LXHoFhItVmiDNZ8OexY/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "8270408952",
        text: message
      })
    }
  );

  res.status(200).json({ success: true });
}
