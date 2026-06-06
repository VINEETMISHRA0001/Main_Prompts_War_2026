export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char)
}

export function sanitizeInput(text: string, maxLength = 2000): string {
  return escapeHtml(text.trim().slice(0, maxLength))
}
