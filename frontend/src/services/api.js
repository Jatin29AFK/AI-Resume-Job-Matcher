const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export async function analyzeResume(formData) {
  const response = await fetch(`${API_BASE_URL}/matcher/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    let errorMessage = 'Something went wrong while analyzing the resume.'
    try {
      const errorData = await response.json()
      if (errorData.detail) {
        errorMessage = errorData.detail
      }
    } catch {
      // ignore JSON parsing failure
    }
    throw new Error(errorMessage)
  }

  return response.json()
}