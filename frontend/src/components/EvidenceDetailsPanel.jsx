import { useState } from 'react'

function EvidenceItem({ skill, info }) {
  const [open, setOpen] = useState(false)

  const badgeClass =
    info.evidence_strength === 'strong'
      ? 'bg-green-100 text-green-800'
      : info.evidence_strength === 'medium'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800'

  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{skill}</h3>
          <p className="mt-1 text-sm text-gray-600">
            Mentioned in: {info.mentioned_in?.length ? info.mentioned_in.join(', ') : 'N/A'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
            {info.evidence_strength}
          </span>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {open ? 'Hide Evidence' : 'View Evidence'}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          {info.supporting_lines?.length > 0 ? (
            info.supporting_lines.map((line, index) => (
              <div
                key={`${skill}-${index}`}
                className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700"
              >
                {line}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No supporting lines found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function EvidenceDetailsPanel({ skillEvidenceMap }) {
  if (!skillEvidenceMap || Object.keys(skillEvidenceMap).length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Evidence Details
        </h2>
        <p className="text-sm text-gray-500">No evidence details available.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Evidence Details</h2>

      <div className="space-y-4">
        {Object.entries(skillEvidenceMap).map(([skill, info]) => (
          <EvidenceItem key={skill} skill={skill} info={info} />
        ))}
      </div>
    </div>
  )
}