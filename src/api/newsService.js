import axios from "axios";

export const AP_DISTRICTS = [
  "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati",
  "Kurnool", "Nellore", "Rajahmundry", "Kakinada",
  "Eluru", "Ongole", "Chittoor", "Kadapa"
];

export async function fetchPoliceNews(district = "") {
  const query = district
    ? district + " crime police arrest"
    : "Andhra Pradesh police crime";
  const res = await axios.get("https://newsdata.io/api/1/news", {
    params: {
      q: query,
      language: "en",
      country: "in",
      apikey: import.meta.env.VITE_NEWSDATA_API_KEY,
    }
  });
  return res.data.results.filter(a => a.title && a.description);
}
