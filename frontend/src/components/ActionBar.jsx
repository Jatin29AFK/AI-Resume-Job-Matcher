export default function ActionBar({ suggestions = [], onReset }) {
  const handleCopySuggestions = async () => {
    if (!suggestions.length) return

    const text = suggestions.map((item, index) => `${index + 1}. ${item}`).join('\n')
    await navigator.clipboard.writeText(text)
    alert('Suggestions copied to clipboard.')
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg md:flex-row md:justify-end">
      <button
        type="button"
        onClick={handleCopySuggestions}
        className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Copy Suggestions
      </button>

      <button
        type="button"
        onClick={onReset}
        className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        Analyze Another Resume
      </button>
    </div>
  )
}