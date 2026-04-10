import { useState } from 'react'
import UploadForm from './components/UploadForm'
import ScoreCard from './components/ScoreCard'
import SkillsSection from './components/SkillsSection'
import SuggestionsSection from './components/SuggestionsSection'
import LoadingSpinner from './components/LoadingSpinner'
import SummaryHero from './components/SummaryHero'
import JDRequirementsCard from './components/JDRequirementsCard'
import CategorizedSkillsPanel from './components/CategorizedSkillsPanel'
import EvidencePanel from './components/EvidencePanel'
import ExperiencePanel from './components/ExperiencePanel'
import ProgressBarCard from './components/ProgressBarCard'
import CollapsibleSection from './components/CollapsibleSection'
import EvidenceDetailsPanel from './components/EvidenceDetailsPanel'
import EmptyState from './components/EmptyState'
import ActionBar from './components/ActionBar'
import ExportButtons from './components/ExportButtons'
import ResultTabs from './components/ResultTabs'
import { analyzeResume } from './services/api'
import LLMExplanationPanel from './components/LLMExplanationPanel'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async (formData) => {
    try {
      setLoading(true)
      setError('')
      setResult(null)

      const data = await analyzeResume(formData)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Failed to analyze resume.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError('')
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            AI Resume–Job Matcher
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-gray-600">
            Upload a resume, paste a job description, and get a structured AI-powered
            compatibility report with skill matching, requirement weighting, evidence strength,
            and improvement suggestions.
          </p>
        </div>

        <UploadForm onAnalyze={handleAnalyze} loading={loading} />

        {!loading && !error && !result && <EmptyState />}

        {loading && <LoadingSpinner />}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-8">
            <SummaryHero filename={result.filename} scores={result.scores} />

            <div className="grid gap-4 lg:grid-cols-2">
              <ActionBar suggestions={result.suggestions} onReset={handleReset} />
              <ExportButtons result={result} />
            </div>

            <ResultTabs
              childrenByTab={{
                overview: (
                  <div className="space-y-8">
                    <CollapsibleSection title="Score Overview" defaultOpen>
                      <div className="space-y-6">
                        <ScoreCard scores={result.scores} />
                        <ProgressBarCard scores={result.scores} />
                      </div>
                    </CollapsibleSection>

                    <CollapsibleSection title="Matched vs Missing Skills" defaultOpen>
                      <SkillsSection
                        matchedSkills={result.matched_skills}
                        missingSkills={result.missing_skills}
                        criticalMissingSkills={result.critical_missing_skills}
                      />
                    </CollapsibleSection>

                    <CollapsibleSection title="Experience Alignment" defaultOpen>
                      <ExperiencePanel
                        experienceEstimate={result.experience_estimate}
                        experienceComparison={result.experience_comparison}
                        jdRequirements={result.jd_requirements}
                      />
                    </CollapsibleSection>
                  </div>
                ),
                requirements: (
                  <div className="space-y-8">
                    <JDRequirementsCard jdRequirements={result.jd_requirements} />
                    <CategorizedSkillsPanel
                      categorizedResumeSkills={result.categorized_resume_skills}
                      categorizedJdSkills={result.categorized_jd_skills}
                    />
                  </div>
                ),
                evidence: (
                  <div className="space-y-8">
                    <EvidencePanel evidenceSummary={result.evidence_summary} />
                    <EvidenceDetailsPanel skillEvidenceMap={result.skill_evidence_map} />
                  </div>
                ),
                suggestions: (
  <div className="space-y-8">
    <LLMExplanationPanel explanation={result.llm_explanation} />
    <SuggestionsSection suggestions={result.suggestions} />
  </div>
),
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}