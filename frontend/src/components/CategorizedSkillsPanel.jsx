function CategoryBlock({ title, skills }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <h3 className="mb-3 text-base font-semibold text-gray-900">{title}</h3>

      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${title}-${skill}-${index}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No skills found in this category.</p>
      )}
    </div>
  )
}

export default function CategorizedSkillsPanel({
  categorizedResumeSkills,
  categorizedJdSkills,
}) {
  if (!categorizedResumeSkills || !categorizedJdSkills) return null

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Resume Skills by Category
        </h2>

        <div className="space-y-4">
          {Object.entries(categorizedResumeSkills).map(([category, skills]) => (
            <CategoryBlock
              key={category}
              title={category.replaceAll('_', ' ')}
              skills={skills}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          JD Skills by Category
        </h2>

        <div className="space-y-4">
          {Object.entries(categorizedJdSkills).map(([category, skills]) => (
            <CategoryBlock
              key={category}
              title={category.replaceAll('_', ' ')}
              skills={skills}
            />
          ))}
        </div>
      </div>
    </div>
  )
}