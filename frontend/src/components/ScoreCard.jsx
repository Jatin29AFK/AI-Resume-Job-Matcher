const scoreItems = [
  { key: 'required_skill_score', label: 'Required Skill Score' },
  { key: 'preferred_skill_score', label: 'Preferred Skill Score' },
  { key: 'general_skill_score', label: 'General Skill Score' },
  { key: 'weighted_skill_score', label: 'Weighted Skill Score' },
  { key: 'semantic_score', label: 'Semantic Score' },
  { key: 'section_evidence_score', label: 'Section Evidence Score' },
  { key: 'skill_support_score', label: 'Skill Support Score' },
  { key: 'critical_missing_penalty', label: 'Critical Missing Penalty' },
]

export default function ScoreCard({ scores }) {
  if (!scores) return null

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Detailed Scores</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {scoreItems.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-gray-200 p-4 transition hover:shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {scores[item.key]}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}