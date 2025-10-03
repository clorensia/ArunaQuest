export const SessionManager = {
  // Store last visited quest page for redirect after login
  setLastQuestPage: (path) => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem('last_quest_page', path)
  },

  getLastQuestPage: () => {
    if (typeof window === 'undefined') return '/quest'
    return sessionStorage.getItem('last_quest_page') || '/quest'
  },

  clearLastQuestPage: () => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('last_quest_page')
  },

  // Track login attempts for UX feedback
  incrementLoginAttempts: () => {
    if (typeof window === 'undefined') return
    const attempts = parseInt(sessionStorage.getItem('login_attempts') || '0')
    sessionStorage.setItem('login_attempts', (attempts + 1).toString())
  },

  getLoginAttempts: () => {
    if (typeof window === 'undefined') return 0
    return parseInt(sessionStorage.getItem('login_attempts') || '0')
  },

  resetLoginAttempts: () => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('login_attempts')
  },

  // Welcome message for first-time users
  isFirstLogin: () => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem('has_logged_in_before')
  },

  markFirstLoginComplete: () => {
    if (typeof window === 'undefined') return
    localStorage.setItem('has_logged_in_before', 'true')
    localStorage.setItem('first_login_date', new Date().toISOString())
  },

  // Clean up session data on logout
  clearAllSessionData: () => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('last_quest_page')
    sessionStorage.removeItem('login_attempts')
    // Keep localStorage data for returning users
  }
}

// Usage in components:
// import { SessionManager } from '@/lib/sessionManager'
// 
// // Before redirect to login
// SessionManager.setLastQuestPage(router.pathname)
// 
// // After successful login
// const redirectPath = SessionManager.getLastQuestPage()
// router.push(redirectPath)