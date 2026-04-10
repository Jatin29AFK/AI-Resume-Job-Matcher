function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}

export default function ExportButtons({ result }) {
  if (!result) return null

  const handleExportJSON = () => {
    const json = JSON.stringify(result, null, 2)
    downloadFile(json, 'resume_match_report.json', 'application/json')
  }

  const handleExportText = () => {
    const text = `
AI Resume–Job Matcher Report

Filename: ${result.filename}

Overall Score: ${result.scores?.overall_score}%
Fit Label: ${result.scores?.fit_label}

Matched Skills:
${(result.matched_skills || []).map((s) => `- ${s}`).join('\n')}

Missing Skills:
${(result.missing_skills || []).map((s) => `- ${s}`).join('\n')}

Critical Missing Skills:
${(result.critical_missing_skills || []).map((s) => `- ${s}`).join('\n')}

Suggestions:
${(result.suggestions || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}
    `.trim()

    downloadFile(text, 'resume_match_report.txt', 'text/plain')
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg md:flex-row md:justify-end">
      <button
        type="button"
        onClick={handleExportJSON}
        className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Export JSON
      </button>

      <button
        type="button"
        onClick={handleExportText}
        className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Export Text Report
      </button>
    </div>
  )
}