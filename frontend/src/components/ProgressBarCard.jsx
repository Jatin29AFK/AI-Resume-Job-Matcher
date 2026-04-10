function ScoreBar({ label, value }) {
  const safeValue = Math.max(0, Math.min(Number(value) || 0, 100))

  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{safeValue}%</p>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-black transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

export default function ProgressBarCard({ scores }) {
  if (!scores) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ScoreBar label="Required Skill Score" value={scores.required_skill_score} />
      <ScoreBar label="Preferred Skill Score" value={scores.preferred_skill_score} />
      <ScoreBar label="General Skill Score" value={scores.general_skill_score} />
      <ScoreBar label="Weighted Skill Score" value={scores.weighted_skill_score} />
      <ScoreBar label="Semantic Score" value={scores.semantic_score} />
      <ScoreBar label="Section Evidence Score" value={scores.section_evidence_score} />
      <ScoreBar label="Skill Support Score" value={scores.skill_support_score} />
      <ScoreBar label="Critical Missing Penalty" value={scores.critical_missing_penalty} />
    </div>
  )
}