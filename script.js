// =======================
// LOGIN CHECK
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const isLogin = localStorage.getItem("login")

  if (isLogin === "ok") {
    document.getElementById("loginBox").classList.add("hidden")
    document.getElementById("app").classList.remove("hidden")
  }
})

// =======================
// LOGIN
// =======================
function login() {
  const pw = document.getElementById("pw").value

  if (pw === "080808") {
    localStorage.setItem("login", "ok")
    location.reload()
  } else {
    document.getElementById("loginErr").innerText = "❌ Password salah"
  }
}

// =======================
// MENU TOGGLE
// =======================
function toggleMenu() {
  document.getElementById("dropdown").classList.toggle("hidden")
}

// =======================
// SHOW FEATURE
// =======================
function showSaldo() {
  document.getElementById("saldoBox").classList.remove("hidden")
  document.getElementById("withdrawBox").classList.add("hidden")
  document.getElementById("dropdown").classList.add("hidden")
}

function showWithdraw() {
  document.getElementById("withdrawBox").classList.remove("hidden")
  document.getElementById("saldoBox").classList.add("hidden")
  document.getElementById("dropdown").classList.add("hidden")
}

// =======================
// CEK SALDO ATLANTIC (FIX)
// =======================
async function cekSaldo() {
  const apiKey = document.getElementById("apiKey").value.trim()
  const saldoResult = document.getElementById("saldoResult")

  if (!apiKey) {
    saldoResult.innerText = "❌ API Key wajib diisi"
    return
  }

  saldoResult.innerText = "⏳ Mengambil saldo..."

  try {
    const res = await fetch("/api/cekSaldo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ api: apiKey })
    })

    const data = await res.json()

    if (data.error) {
      saldoResult.innerText = "❌ " + data.error
    } else {
      saldoResult.innerText =
        "💰 Saldo: Rp" + Number(data.saldo).toLocaleString("id-ID")
    }

  } catch (err) {
    saldoResult.innerText = "❌ Gagal terhubung ke server"
  }
}

// =======================
// WITHDRAW ATLANTIC
// =======================
async function withdraw() {
  const token = document.getElementById("token").value.trim()
  const layanan = document.getElementById("layanan").value
  const nomor = document.getElementById("nomor").value.trim()
  const nominal = Number(document.getElementById("nominal").value)
  const wdResult = document.getElementById("wdResult")

  if (!token || !nomor || !nominal) {
    wdResult.innerText = "❌ Semua field wajib diisi"
    return
  }

  if (nominal < 5000) {
    wdResult.innerText = "❌ Minimal withdraw Rp5.000"
    return
  }

  wdResult.innerText = "⏳ Memproses withdraw..."

  try {
    const res = await fetch("/api/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        layanan,
        nomor,
        nominal
      })
    })

    const data = await res.json()

    if (data.error) {
      wdResult.innerText = "❌ " + data.error
    } else {
      wdResult.innerText = "✅ Status Withdraw: " + data.status
    }

  } catch (err) {
    wdResult.innerText = "❌ Gagal menghubungi server"
  }
}