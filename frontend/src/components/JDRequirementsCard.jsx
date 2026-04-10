function RequirementList({ title, items, colorClass }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <h3 className="mb-3 text-base font-semibold text-gray-900">{title}</h3>

      {items && items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${title}-${item}-${index}`}
              className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Not explicitly found.</p>
      )}
    </div>
  )
}

export default function JDRequirementsCard({ jdRequirements }) {
  if (!jdRequirements) return null

  const minYears = jdRequirements.experience_requirements?.min_years_experience

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Job Requirements</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <RequirementList
          title="Required Skills"
          items={jdRequirements.required_skills}
          colorClass="bg-red-100 text-red-800"
        />

        <RequirementList
          title="Preferred Skills"
          items={jdRequirements.preferred_skills}
          colorClass="bg-blue-100 text-blue-800"
        />

        <RequirementList
          title="General Skills"
          items={jdRequirements.general_skills}
          colorClass="bg-gray-100 text-gray-800"
        />

        <div className="rounded-2xl border border-gray-200 p-4">
          <h3 className="mb-3 text-base font-semibold text-gray-900">
            Experience & Education
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="font-medium text-gray-900">Minimum Experience</p>
              <p>{minYears ? `${minYears}+ years` : 'Not explicitly found'}</p>
            </div>

            <div>
              <p className="font-medium text-gray-900">Education Signals</p>
              {jdRequirements.education_requirements?.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {jdRequirements.education_requirements.map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p>Not explicitly found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}