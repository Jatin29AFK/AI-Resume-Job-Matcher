export default function ExperiencePanel({
  experienceEstimate,
  experienceComparison,
  jdRequirements,
}) {
  if (!experienceEstimate || !experienceComparison || !jdRequirements) return null

  const meetsRequirement = experienceComparison.meets_requirement

  const badgeClass =
    meetsRequirement === true
      ? 'bg-green-100 text-green-800'
      : meetsRequirement === false
      ? 'bg-red-100 text-red-800'
      : 'bg-gray-100 text-gray-800'

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Experience Alignment
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Estimated Resume Experience</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {experienceEstimate.estimated_years ?? 'N/A'}
          </p>
          <p className="mt-2 text-xs text-gray-500">{experienceEstimate.note}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">JD Minimum Experience</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {jdRequirements.experience_requirements?.min_years_experience ?? 'N/A'}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Requirement Status</p>
          <div className="mt-2">
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}>
              {meetsRequirement === true
                ? 'Likely Meets Requirement'
                : meetsRequirement === false
                ? 'May Be Below Requirement'
                : 'Could Not Confirm'}
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-600">{experienceComparison.message}</p>
        </div>
      </div>
    </div>
  )
}