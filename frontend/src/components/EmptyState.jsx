export default function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Ready to analyze</h2>
      <p className="mx-auto mt-3 max-w-2xl text-gray-600">
        Upload a resume and paste a job description to get a detailed match report
        with required skill coverage, evidence strength, and improvement suggestions.
      </p>
    </div>
  )
}