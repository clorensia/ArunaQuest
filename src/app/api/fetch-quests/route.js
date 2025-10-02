// file: src/app/api/fetch-quests/route.js
import { NextResponse } from 'next/server';

const MOCK_API_URL = 'https://68dd8567d7b591b4b78cb159.mockapi.io/api/v1/quests';

export async function GET() {
  try {
    const response = await fetch(MOCK_API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Mock API returned ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API response:', data);
    
    let questsData = {};
    
    // Handle different API response formats
    if (Array.isArray(data)) {
      if (data.length > 0) {
        // Format 1: [{ "quest-id": {...} }, ...]
        if (typeof data[0] === 'object' && !data[0].id) {
          data.forEach((item) => {
            const questId = Object.keys(item)[0];
            const questContent = item[questId];
            if (questId && questContent) {
              questsData[questId] = { ...questContent, id: questId };
            }
          });
        }
        // Format 2: [{ questData: {...} }]
        else if (data[0].questData) {
          questsData = data[0].questData;
        }
        // Format 3: [{ id: "...", ... }, ...]
        else {
          data.forEach(quest => {
            if (quest.id) questsData[quest.id] = quest;
          });
        }
      }
    } else if (data.questData) {
      questsData = data.questData;
    } else if (typeof data === 'object') {
      questsData = data;
    }

    console.log('Processed quest IDs:', Object.keys(questsData));

    return NextResponse.json({
      success: true,
      quests: questsData,
    });

  } catch (error) {
    console.error('Error fetching quests:', error);
    return NextResponse.json(
      { success: false, error: error.message, quests: {} },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { questId } = await request.json();
    console.log('Fetching single quest:', questId);
    
    const response = await fetch(MOCK_API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Mock API returned ${response.status}`);
    }

    const data = await response.json();
    let allQuests = {};

    // Parse using same logic as GET
    if (Array.isArray(data)) {
      if (data.length > 0) {
        if (typeof data[0] === 'object' && !data[0].id) {
          data.forEach((item) => {
            const qId = Object.keys(item)[0];
            const qData = item[qId];
            if (qId && qData) allQuests[qId] = { ...qData, id: qId };
          });
        } else if (data[0].questData) {
          allQuests = data[0].questData;
        } else {
          data.forEach(quest => {
            if (quest.id) allQuests[quest.id] = quest;
          });
        }
      }
    } else if (data.questData) {
      allQuests = data.questData;
    } else if (typeof data === 'object') {
      allQuests = data;
    }

    const quest = allQuests[questId];

    if (!quest) {
      return NextResponse.json(
        {
          success: false,
          error: `Quest "${questId}" not found. Available: ${Object.keys(allQuests).join(', ')}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, quest });

  } catch (error) {
    console.error('Error fetching quest:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}