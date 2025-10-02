// file: src/app/api/analyze-quest/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  console.error("FATAL: GEMINI_API_KEY environment variable not set.");
}

export async function POST(request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'Konfigurasi API Key server belum diatur.' },
      { status: 500 }
    );
  }
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const { finalStats, questTitle } = await request.json();

    if (!finalStats || !questTitle) {
      return NextResponse.json(
        { error: 'Data yang dikirim tidak lengkap' }, 
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      Anda adalah "Nara", seorang career coach virtual yang suportif dan cerdas untuk platform ArunaQuest.
      Seorang pengguna baru saja menyelesaikan simulasi karier "${questTitle}".
      Berikut adalah hasil skor akhirnya dalam tiga kategori (skor maksimal per kategori adalah 20):
      - Skor Teknis: ${finalStats.teknis}
      - Skor Sosial: ${finalStats.sosial}
      - Skor Inisiatif: ${finalStats.inisiatif}
      
      Berikan response dalam format JSON dengan struktur berikut:
      {
        "analysis": "Sebagai Coach Aru, berikan analisis yang hangat dan mendalam dalam satu paragraf (sekitar 4-5 kalimat). Awali dengan mengapresiasi apa yang sudah mereka lakukan dengan baik. Fokus pada satu kekuatan paling menonjol dan jelaskan dampaknya. Lalu, tawarkan satu langkah kecil yang praktis sebagai 'tantangan' untuk membuat kekuatan itu lebih bersinar lagi. Pastikan diakhiri dengan nada yang sangat positif dan mendukung.",
        "recommendations": [
          {
            "title": "Judul resource yang spesifik",
            "description": "Deskripsi singkat kenapa ini relevan",
            "searchQuery": "kata kunci untuk mencari resource ini",
            "icon": "emoji yang relevan"
          }
        ]
      }
      
      Berikan 3-5 rekomendasi yang SANGAT SPESIFIK berdasarkan area yang perlu ditingkatkan.
      Gunakan gaya bahasa kasual dan positif, panggil pengguna dengan "kamu".
      
      PENTING: Response harus valid JSON tanpa markdown atau formatting lain.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    
    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse JSON response
    const parsedResponse = JSON.parse(text);

    return NextResponse.json({
      analysis: parsedResponse.analysis,
      recommendations: parsedResponse.recommendations
    });

  } catch (error) {
    console.error("[GEMINI_API_ERROR]", error);
    
    // Fallback response if AI fails
    return NextResponse.json({
      analysis: "Performa kamu sudah cukup baik! Terus asah kemampuan di area yang masih bisa ditingkatkan.",
      recommendations: [
        {
          title: "Pengembangan Skill Relevan",
          description: "Pelajari lebih dalam tentang area yang perlu ditingkatkan",
          searchQuery: questTitle.toLowerCase().replace(/[^a-z0-9\s]/g, ''),
          icon: "📚"
        }
      ]
    });
  }
}