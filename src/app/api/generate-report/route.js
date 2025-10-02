import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: "Konfigurasi server salah." }), { status: 500 });
  }

  try {
    const { finalStats, questTitle } = await request.json();
    if (!finalStats || !questTitle) {
      return new Response(JSON.stringify({ error: "Data skor tidak lengkap." }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // PROMPT PREMIUM YANG SUDAH DIPERBAIKI
    const prompt = `
You are "Coach Nara," a young, dynamic AI Career Coach in the simulation game ArunaQuest. Your persona is that of a knowledgeable insider in the professional world who communicates like a supportive and relatable friend. Your tone is: professional yet casual, encouraging, and direct—like a mentor giving real talk over bubble tea.

A player has just completed the Quest: "${questTitle}".

Their final soft skill scores are:
- Technical: ${finalStats.teknis}
- Social: ${finalStats.sosial}
- Initiative: ${finalStats.inisiatif}

Your Task: Write a single, cohesive performance analysis paragraph in Indonesian.

Critical Tone & Style Guidelines:
1.  Start with Context: Begin by naturally referencing the quest they just finished. Make the player feel like the quest was a real experience.
2.  Praise with Impact: For the highest score, don't just state it. Explain *why* it's a strength in the context of their professional journey. Use specific, believable praise.
3.  Frame Growth as an Opportunity: For the lowest score, frame it as a "area yang bisa dikasih perhatian lebih" (an area that could use more attention) or "peluang seru buat berkembang" (an exciting opportunity to grow). Offer a tiny, practical hint—not a full lecture.
4.  Motivate Like a Friend: End with a motivational line that feels genuine and pushes them to take on the next challenge. Avoid clichés.
5.  Language: Use modern, conversational Indonesian. Sprinkle in professional terms when needed, but keep the overall flow natural and engaging.

Output Format: Return ONLY a raw text string. No JSON, no markdown, no additional formatting. Just the pure paragraph.
    `.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text().trim();

    let cleanAnalysis = analysisText;
    
    if (cleanAnalysis.startsWith('"') && cleanAnalysis.endsWith('"')) {
      cleanAnalysis = cleanAnalysis.slice(1, -1);
    }
    
    if (cleanAnalysis.startsWith('{') && cleanAnalysis.includes('analysis')) {
      try {
        const parsed = JSON.parse(cleanAnalysis);
        cleanAnalysis = parsed.analysis || analysisText;
      } catch (e) {
      }
    }

    return new Response(JSON.stringify({ 
      analysis: cleanAnalysis 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error di generate-report:", error);
    return new Response(JSON.stringify({ 
      error: `Gagal menghasilkan analisis dari AI: ${error.message}` 
    }), {
      status: 500,
    });
  }
}