import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Geriatrics Fellowship Platform</h1>
          <p className="text-gray-600 mt-2">Shaare Zedek Medical Center - Dr. Eias Ashhab</p>
          <p className="text-sm text-gray-500 mt-1">Starting: September 1, 2025</p>
        </header>

        {/* Priority Tools Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-indigo-600">🔥 Daily Use Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/patient-dashboard" className="module-card bg-white rounded-lg shadow-lg p-6 relative border-2 border-indigo-500 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
              <span className="priority-badge bg-red-500 text-white text-xs px-2 py-1 rounded absolute top-2 right-2">PRIORITY</span>
              <div className="text-3xl mb-3">🏥</div>
              <h3 className="text-lg font-bold mb-2">Patient Dashboard</h3>
              <p className="text-gray-600 text-sm">Morning rounds prep with risk synthesis</p>
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
              </div>
            </Link>

            <Link href="/oncall-copilot" className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
              <div className="text-3xl mb-3">🚨</div>
              <h3 className="text-lg font-bold mb-2">On-Call Co-Pilot</h3>
              <p className="text-gray-600 text-sm">3AM protocols for geriatric scenarios</p>
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
              </div>
            </Link>

            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold mb-2">Note Analyzer</h3>
              <p className="text-gray-600 text-sm">NLP for Hebrew/English abbreviations</p>
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
              </div>
            </div>

            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">💊</div>
              <h3 className="text-lg font-bold mb-2">Anticoagulation Tool</h3>
              <p className="text-gray-600 text-sm">CHA₂DS₂-VASc with renal dosing</p>
              <div className="mt-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Phase 2</span>
              </div>
            </div>
          </div>
        </section>

        {/* Academic & Study Tools */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-600">📚 Academic & Study Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="text-lg font-bold mb-2">Shlav Alef Prep</h3>
              <p className="text-gray-600 text-sm">50 questions in Hebrew & English</p>
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
              </div>
            </div>

            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-lg font-bold mb-2">Research/M&M</h3>
              <p className="text-gray-600 text-sm">PICO searches & conference planning</p>
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
              </div>
            </div>

            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold mb-2">Evidence Library</h3>
              <p className="text-gray-600 text-sm">20 landmark trials & guidelines</p>
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Tools & Calculators */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-600">🩺 Clinical Tools & Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/calculators" className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
              <div className="text-3xl mb-3">🧮</div>
              <h3 className="text-lg font-bold mb-2">All Calculators</h3>
              <p className="text-gray-600 text-sm">Frailty, MMSE, GDS, Barthel & more</p>
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
              </div>
            </Link>

            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">💊</div>
              <h3 className="text-lg font-bold mb-2">Drug Interactions</h3>
              <p className="text-gray-600 text-sm">Medication interaction checker</p>
              <div className="mt-3">
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>

            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">📉</div>
              <h3 className="text-lg font-bold mb-2">Deprescribing Tool</h3>
              <p className="text-gray-600 text-sm">Optimize medication regimens</p>
              <div className="mt-3">
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>

            <div className="module-card bg-white rounded-lg shadow-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="text-lg font-bold mb-2">Capacity Tool</h3>
              <p className="text-gray-600 text-sm">Decision-making capacity assessment</p>
              <div className="mt-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Phase 3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-purple-600">⚡ Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              📊 Export Morning Report
            </button>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              🚨 Emergency Protocols
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              🗑️ Clear All Data
            </button>
          </div>
        </section>

        {/* Development Progress */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">🚧 Development Progress</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Phase 1: Foundation</span>
                <span className="text-green-600 font-bold">✅ Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Phase 2: Core Tools (Sept-Nov)</span>
                <span className="text-yellow-600 font-bold">🚧 In Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Phase 3: Advanced Integration (Dec-Feb)</span>
                <span className="text-gray-600 font-bold">⏳ Planned</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>Powered by Next.js & Supabase</p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
