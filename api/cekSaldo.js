import axios from "axios"
import qs from "qs"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { api } = req.body || {}

    if (!api) {
      return res.json({ error: "API Key wajib diisi" })
    }

    const r = await axios.post(
      "https://atlantich2h.com/get_profile",
      qs.stringify({ api_key: api }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 10000
      }
    )

    if (!r.data?.data?.balance) {
      return res.json({ error: "Response Atlantic tidak valid" })
    }

    return res.json({
      saldo: r.data.data.balance
    })

  } catch (err) {
    return res.json({
      error: err.response?.data?.message || "Gagal cek saldo Atlantic"
    })
  }
}