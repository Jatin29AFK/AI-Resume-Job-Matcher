export default function SummaryHero({ filename, scores }) {
  if (!scores) return null

  const fitColor =
    scores.fit_label === 'Strong Fit'
      ? 'text-green-700 bg-green-100'
      : scores.fit_label === 'Good Fit'
      ? 'text-blue-700 bg-blue-100'
      : scores.fit_label === 'Moderate Fit'
      ? 'text-yellow-700 bg-yellow-100'
      : 'text-red-700 bg-red-100'

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Analyzed Resume</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">{filename}</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            This dashboard summarizes resume-to-job compatibility using required skill coverage,
            semantic similarity, evidence validation, and estimated experience alignment.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="text-right">
            <p className="text-sm text-gray-500">Overall Match</p>
            <p className="text-4xl font-extrabold text-gray-900">
              {scores.overall_score}%
            </p>
          </div>

          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${fitColor}`}>
            {scores.fit_label}
          </span>
        </div>
      </div>
    </div>
  )
}