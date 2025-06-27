import React, { useState } from "react";

const CampaignForm3 = () => {
  const campaign = {
    id: "campaign3",
    name: "Groww ₹150 Reward",
    reward: "₹150",
    offerText: "🎁 NEW USER BONUS",
    redirectUrl: "https://groww-affiliate.com",
    steps: [
      "Enter details and submit",
      "Install app & verify KYC",
      "₹150 in your bank account!"
    ]
  };

  const [formData, setFormData] = useState({ name: "", mobile: "", upi: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.upi) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, campaignId: campaign.id })
      });
      const data = await res.json();
      if (res.ok || data.alreadyExists) {
        window.open(campaign.redirectUrl, "_blank");
      } else {
        alert(data.error || "Submission failed");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-800 to-blue-900 p-6">
      <div className="bg-indigo-900/80 border border-blue-700 rounded-3xl shadow-lg p-6 text-white max-w-md w-full">
        <div className="text-center mb-3">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 px-3 py-1 rounded-full font-bold text-xs">{campaign.offerText}</span>
        </div>
        <h2 className="text-xl font-bold text-green-300 text-center">{campaign.name}</h2>
        <p className="text-3xl font-extrabold text-blue-300 text-center mb-2">Get {campaign.reward}</p>
        <form onSubmit={handleSubmit} className="space-y-3 mt-3">
          {["name", "mobile", "upi"].map((f, i) => (
            <div key={i} className="flex items-center bg-blue-800/50 border border-blue-600 p-2 rounded">
              <span className="mr-2">{f === "name" ? "👤" : f === "mobile" ? "📞" : "💳"}</span>
              <input
                type="text"
                name={f}
                placeholder={f === "name" ? "Your Name" : f === "mobile" ? "Mobile Number" : "UPI ID"}
                value={formData[f]}
                onChange={handleChange}
                className="w-full bg-transparent text-white focus:outline-none"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded font-bold hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "🚀 Claim Now"}
          </button>
        </form>
        <div className="bg-blue-800/50 p-3 mt-3 rounded text-sm border border-blue-600">
          <p className="font-bold text-green-400 mb-2">Steps:</p>
          <ol className="list-decimal pl-4 space-y-1 text-blue-100">
            {campaign.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm3;
