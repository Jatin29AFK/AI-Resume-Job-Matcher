export default function LoadingSpinner() {
  return (
    <div className="rounded-3xl bg-white py-12 text-center shadow-lg">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      <p className="mt-4 text-sm font-medium text-gray-600">
        Analyzing resume, extracting skills, validating evidence, and scoring job fit...
      </p>
    </div>
  )
}