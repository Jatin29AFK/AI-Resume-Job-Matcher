function EvidenceGroup({ title, skills, colorClass }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <h3 className="mb-3 text-base font-semibold text-gray-900">{title}</h3>

      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${title}-${skill}-${index}`}
              className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No skills in this group.</p>
      )}
    </div>
  )
}

export default function EvidencePanel({ evidenceSummary }) {
  if (!evidenceSummary) return null

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Skill Evidence Strength</h2>
        <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
          Support Score: {evidenceSummary.skill_support_score}%
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <EvidenceGroup
          title="Strong Evidence"
          skills={evidenceSummary.strong_evidence_skills}
          colorClass="bg-green-100 text-green-800"
        />
        <EvidenceGroup
          title="Medium Evidence"
          skills={evidenceSummary.medium_evidence_skills}
          colorClass="bg-yellow-100 text-yellow-800"
        />
        <EvidenceGroup
          title="Weak Evidence"
          skills={evidenceSummary.weak_evidence_skills}
          colorClass="bg-red-100 text-red-800"
        />
      </div>
    </div>
  )
}