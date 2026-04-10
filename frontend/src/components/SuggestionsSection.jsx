export default function SuggestionsSection({ suggestions }) {
  if (!suggestions) return null

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Improvement Suggestions
      </h2>

      {suggestions.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No suggestions available.</p>
      )}
    </div>
  )
}