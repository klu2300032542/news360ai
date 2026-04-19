import axios from 'axios';

export const AP_DISTRICTS = [
  'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati',
  'Kurnool', 'Nellore', 'Rajahmundry', 'Kakinada',
  'Eluru', 'Ongole', 'Chittoor', 'Kadapa'
];

export async function fetchPoliceNews(district = '') {
  const query = district
    ? district + ' crime OR police OR law OR arrest OR attack'
    : 'Andhra Pradesh police crime law order arrest';
  const res = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: query,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 12,
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
    }
  });
  return res.data.articles.filter(a => a.title && a.description);
}
