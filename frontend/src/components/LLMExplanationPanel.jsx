export default function LLMExplanationPanel({ explanation }) {
  if (!explanation) return null

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          AI Explanation Layer
        </h2>
        <span className="rounded-full bg-black px-3 py-1 text-sm font-medium text-white">
          {explanation.provider}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">Fit Summary</h3>
          <p className="text-sm leading-6 text-gray-700">
            {explanation.fit_summary}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">Strengths</h3>
          <ul className="space-y-2">
            {explanation.strengths?.map((item, index) => (
              <li key={index} className="rounded-xl bg-green-50 p-3 text-sm text-green-800">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">Weaknesses</h3>
          <ul className="space-y-2">
            {explanation.weaknesses?.map((item, index) => (
              <li key={index} className="rounded-xl bg-red-50 p-3 text-sm text-red-800">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            Writing Assistance Recommendations
          </h3>
          <ul className="space-y-2">
            {explanation.llm_recommendations?.map((item, index) => (
              <li key={index} className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}