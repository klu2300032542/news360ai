export async function summarizeNews(articles, district) {
  const headlines = articles
    .slice(0, 8)
    .map((a, i) => (i+1) + '. ' + a.title + '. ' + (a.description || ''))
    .join('\n');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + import.meta.env.VITE_GROQ_API_KEY,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant for Andhra Pradesh Police Intelligence. You analyze news and produce structured morning intelligence briefs for senior officers.'
        },
        {
          role: 'user',
          content: 'Analyze these news headlines for ' + (district || 'Andhra Pradesh') + ' and produce a structured morning brief.\n\nReturn in this exact format:\n\nEXECUTIVE SUMMARY\n[2-3 sentence summary]\n\nTOP INCIDENTS\n1. [Location] | [Incident Type] | Severity: [High/Medium/Low]\n   [One line description]\n2. [Location] | [Incident Type] | Severity: [High/Medium/Low]\n   [One line description]\n3. [Location] | [Incident Type] | Severity: [High/Medium/Low]\n   [One line description]\n\nSP RECOMMENDATIONS\n- [Action 1]\n- [Action 2]\n- [Action 3]\n\nHeadlines:\n' + headlines
        }
      ]
    })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content;
}
