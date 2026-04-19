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
  
  const encoded = encodeURIComponent(query);
  const rssUrl = "https://news.google.com/rss/search?q=" + encoded + "&hl=en-IN&gl=IN&ceid=IN:en";
  const proxyUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rssUrl);
  
  const res = await axios.get(proxyUrl);
  return res.data.items.filter(a => a.title && a.description).map(a => ({
    title: a.title,
    description: a.description,
    url: a.link,
    urlToImage: a.thumbnail || null,
    publishedAt: a.pubDate,
    source: { name: a.author || "Google News" }
  }));
}
