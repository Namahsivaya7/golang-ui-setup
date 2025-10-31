import { useState } from "react"
import { verifyPageRoute } from "../../routes"

export default function VerifyPage() {
  const { id } = verifyPageRoute.useParams()
  const [otp, setOtp] = useState("")

  const handleVerify = async () => {
    try {
      const res = await fetch(`http://localhost:8080/verify/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      })

      const data = await res.json()
      alert(data.message)
      setOtp("")
    } catch (error) {
      console.error(error)
      alert("Verification failed")
    }
  }

  return (
    <div className="p-4 flex flex-col w-full items-center gap-2">
      <h5 className="text-xl font-bold">Verify Your Account</h5>
      {/* <p className="mb-2">User ID: {id}</p> */}

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border px-2 py-1 rounded"
      />

      <button
        onClick={handleVerify}
        className="ml-2 !bg-blue-600 text-white px-3 py-1 rounded"
      >
        Verify
      </button>
    </div>
  )
}
