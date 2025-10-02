// file: src/app/api/generate-report/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: "Konfigurasi server salah." }, { status: 500 });
  }

  try {
    const { finalStats, questTitle } = await request.json();
    
    if (!finalStats || !questTitle) {
      return Response.json({ error: "Data skor tidak lengkap." }, { status: 400 });
    }

    if (typeof finalStats.teknis === 'undefined' || 
        typeof finalStats.sosial === 'undefined' || 
        typeof finalStats.inisiatif === 'undefined') {
      return Response.json({ error: "Format data skor tidak valid." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-latest",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    });

    // Prompt yang lebih sederhana dan jelas
    const prompt = `
Role: Kamu adalah "Coach Nara", career coach muda dan friendly di game ArunaQuest.
Tone: Casual tapi profesional, seperti teman yang berpengalaman di dunia kerja.

Data Quest:
- Judul: "${questTitle}"
- Skor Teknis: ${finalStats.teknis}
- Skor Sosial: ${finalStats.sosial}  
- Skor Inisiatif: ${finalStats.inisiatif}

Tugas: Tulis analisis performa SINGLE PARAGRAPH dalam Bahasa Indonesia dengan format:
1. Awali dengan selamat untuk quest yang diselesaikan
2. Puji area dengan skor tertinggi (jelaskan kenapa ini penting)
3. Beri saran singkat untuk area dengan skor terendah (framing positif)
4. Akhiri dengan motivasi untuk quest berikutnya

Rules: 
- MAX 4 kalimat
- Bahasa Indonesia casual dan natural
- NO JSON, NO markdown, HANYA plain text
- Jangan sebut angka skor, tapi sebut sebagai "tinggi", "kuat", "baik", dll.

Output:`.trim();

    console.log('Generating analysis for:', questTitle);

    const result = await model.generateContent(prompt);
    const response = result.response;
    let analysisText = response.text().trim();

    // Cleanup response yang lebih agresif
    analysisText = analysisText
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/^\{.*?"analysis":\s*"|"\s*\}$/g, '') // Remove JSON artifacts
      .replace(/```(json)?/g, '') // Remove code blocks
      .trim();

    // Fallback jika response masih aneh
    if (!analysisText || analysisText.length < 20) {
      analysisText = `Selamat menyelesaikan quest "${questTitle}"! Performa kamu sudah baik, tetap semangat untuk pengembangan skill berikutnya!`;
    }

    console.log('Successfully generated analysis');

    return Response.json({ 
      analysis: analysisText 
    });

  } catch (error) {
    console.error("API Error:", error);
    
    // Return error yang konsisten sebagai JSON
    return Response.json({ 
      error: "Gagal menghasilkan analisis. Silakan coba lagi." 
    }, { 
      status: 500 
    });
  }
}