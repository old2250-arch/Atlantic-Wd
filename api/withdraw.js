import axios from "axios"
import qs from "qs"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  const { token, layanan, nomor, nominal } = req.body

  if (nominal < 5000)
    return res.json({ error: "Minimal withdraw 5000" })

  try {
    const r = await axios.post(
      "https://atlantich2h.com/transfer/create",
      qs.stringify({
        api_key: token,
        kode_bank: layanan,
        nomor_akun: nomor,
        nominal
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )

    res.json({ status: r.data.data.status })
  } catch (e) {
    res.json({ error: e.response?.data?.message || "Withdraw gagal" })
  }
}