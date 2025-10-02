// file: src/app/api/generate-quest/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi Gemini dengan API Key dari environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fungsi utama untuk handle request POST
export async function POST(request) {
  try {
    const { questId } = await request.json();

    if (!questId) {
      return new Response(JSON.stringify({ error: "questId is required" }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt C.R.E.A.T.E. untuk memerintahkan Gemini
    const prompt = `
      Character: Act as a Narrative Designer for a career simulation game called ArunaQuest.
      Request: Create a full "A Day in the Life" quest scenario for the role of a "${questId}".
      Example: The output MUST be a valid, parsable JSON object, with no extra text or markdown formatting. The JSON structure MUST be exactly as follows:
      {
        "id": "${questId}",
        "title": "A Day as a ${questId}",
        "description": "A brief, engaging description of this quest.",
        "startScenarioId": "SCENE_1",
        "initialStats": { "teknis": 10, "sosial": 10, "inisiatif": 10 },
        "scenarios": {
          "SCENE_1": { "id": "SCENE_1", "type": "narrative", "title": "Scene 1 Title", "narrative": "...", "choices": [{ "id": "c1-1", "text": "...", "effect": { "sosial": 2 }, "feedback": "...", "nextSceneId": "SCENE_2" }] },
          "SCENE_2": { "id": "SCENE_2", "type": "minigame", "title": "Scene 2 Title", "narrative": "...", "minigameData": { "type": "prioritization", "items": [] }, "nextSceneId": "SCENE_3", "effect": {}, "feedback": "..." },
          "SCENE_3": { "id": "SCENE_3", "type": "narrative", "title": "Scene 3 Title", "narrative": "...", "choices": [] },
          "SCENE_4": { "id": "SCENE_4", "type": "narrative", "title": "Scene 4 Title", "narrative": "...", "choices": [{ "nextSceneId": null }] }
        }
      }
      Adjustments: The tone should be realistic and professional. The scenarios should present real-world trade-offs. The language is Indonesian. There must be exactly 4 scenes, and one must be a 'minigame'.
      Target: To create a complete, engaging, and educational quest scenario.
      Extras: The skill attributes are 'teknis' (technical skill/logic), 'sosial' (social/communication skills), and 'inisiatif' (proactiveness/ownership).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Membersihkan output Gemini dari markdown ```json ... ```
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Coba parse teks dari Gemini menjadi JSON
    const questData = JSON.parse(cleanedText);

    // Kirim kembali JSON yang sudah bersih ke frontend
    return new Response(JSON.stringify(questData), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(JSON.stringify({ error: "Gagal membuat skenario dari AI." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}