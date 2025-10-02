// API Configuration and Utility Functions
// File location: src/app/lib/api.js

const API_BASE_URL = 'https://68dd8567d7b591b4b78cb159.mockapi.io/api/v1';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error('Fetch error:', error);
        return { data: null, error: error.message };
    }
}

/**
 * Fetch all quests from API
 */
export async function getAllQuests() {
    const { data, error } = await fetchAPI('/quests');
    
    if (error) {
        return { quests: {}, error };
    }

    // Transform API response to match app format
    if (data && data.length > 0 && data[0].questData) {
        return { quests: data[0].questData, error: null };
    }

    return { quests: {}, error: 'Invalid data format' };
}

/**
 * Fetch a single quest by ID
 */
export async function getQuestById(questId) {
    const { quests, error } = await getAllQuests();
    
    if (error) {
        return { quest: null, error };
    }

    const quest = quests[questId];
    
    if (!quest) {
        return { quest: null, error: 'Quest not found' };
    }

    return { quest, error: null };
}

/**
 * Get quest recommendations (placeholder for future implementation)
 */
export async function getQuestRecommendations(stats) {
    // Placeholder for future implementation
    // This could call an API endpoint that analyzes user stats
    // and returns personalized quest recommendations
    return { recommendations: [], error: null };
}

/**
 * Save quest progress (placeholder for future implementation)
 */
export async function saveQuestProgress(userId, questId, progress) {
    // Placeholder for future implementation
    // This would POST to your backend to save user progress
    const { data, error } = await fetchAPI('/progress', {
        method: 'POST',
        body: JSON.stringify({ userId, questId, progress }),
    });

    return { success: !error, error };
}

/**
 * Get user's saved quests (placeholder for future implementation)
 */
export async function getUserProgress(userId) {
    // Placeholder for future implementation
    const { data, error } = await fetchAPI(`/progress/${userId}`);
    
    return { progress: data || [], error };
}

export { API_BASE_URL };