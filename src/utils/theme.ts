export function applyTheme(darkMode: boolean): void {
  document.documentElement.classList.toggle('dark', darkMode)
}

export function initThemeFromStorage(): void {
  try {
    const raw = localStorage.getItem('mindflow-dashboard')
    if (!raw) {
      applyTheme(false)
      return
    }
    const parsed = JSON.parse(raw) as { state?: { preferences?: { darkMode?: boolean } } }
    applyTheme(parsed.state?.preferences?.darkMode ?? false)
  } catch {
    applyTheme(false)
  }
}
