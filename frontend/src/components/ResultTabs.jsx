import { useState } from 'react'

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'requirements', label: 'Requirements' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'suggestions', label: 'Suggestions' },
]

export default function ResultTabs({ childrenByTab }) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 shadow hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div>{childrenByTab[activeTab]}</div>
    </div>
  )
}