import { useState } from 'react'

export default function UploadForm({ onAnalyze, loading }) {
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!resume) {
      alert('Please upload a resume file.')
      return
    }

    if (!jobDescription.trim()) {
      alert('Please paste a job description.')
      return
    }

    const formData = new FormData()
    formData.append('resume', resume)
    formData.append('job_description', jobDescription)

    onAnalyze(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-lg md:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Upload Resume (PDF or DOCX)
          </label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="block w-full rounded-xl border border-gray-300 p-3 text-sm"
          />

          {resume && (
            <p className="mt-3 text-sm text-gray-600">
              Selected file: <span className="font-medium">{resume.name}</span>
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Paste Job Description
          </label>
          <textarea
            rows="10"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume Match'}
        </button>
      </div>
    </form>
  )
}