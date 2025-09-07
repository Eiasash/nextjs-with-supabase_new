"use client";

import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

interface Protocol {
  id: string;
  title: string;
  category: string;
  urgency: 'high' | 'medium' | 'low';
  symptoms: string[];
  immediateActions: string[];
  assessment: string[];
  treatment: string[];
  followUp: string[];
}

const protocols: Protocol[] = [
  {
    id: "delirium",
    title: "Delirium Management",
    category: "Cognitive",
    urgency: "high",
    symptoms: ["Acute confusion", "Altered consciousness", "Disorientation", "Hallucinations", "Agitation"],
    immediateActions: [
      "Ensure patient safety",
      "Check vital signs",
      "Assess for pain",
      "Review recent medications",
      "Check for infection signs"
    ],
    assessment: [
      "CAM-ICU or 4AT screening",
      "Complete neurological exam",
      "Review medication list",
      "Check for UTI, pneumonia, or other infections",
      "Assess for dehydration or electrolyte imbalance",
      "Review recent changes in environment"
    ],
    treatment: [
      "Address underlying cause (infection, medications, etc.)",
      "Non-pharmacological interventions first",
      "Consider haloperidol 0.5-1mg PO/IM if severely agitated",
      "Avoid benzodiazepines unless alcohol withdrawal",
      "Maintain normal sleep-wake cycle",
      "Ensure adequate nutrition and hydration"
    ],
    followUp: [
      "Reassess every 4-6 hours",
      "Document CAM-ICU score",
      "Consider psychiatry consult if persistent",
      "Plan for delirium prevention strategies"
    ]
  },
  {
    id: "fall",
    title: "Fall Assessment & Management",
    category: "Mobility",
    urgency: "high",
    symptoms: ["Patient found on floor", "Complaint of fall", "Visible injuries", "Loss of consciousness"],
    immediateActions: [
      "Ensure patient safety - do not move if spinal injury suspected",
      "Check consciousness and vital signs",
      "Assess for obvious injuries",
      "Check for head trauma",
      "Document time and circumstances"
    ],
    assessment: [
      "Complete neurological examination",
      "Check for fractures (especially hip, wrist, spine)",
      "Assess for head injury",
      "Review fall risk factors",
      "Check medications that may contribute",
      "Assess environment for hazards"
    ],
    treatment: [
      "Treat injuries as appropriate",
      "Consider imaging if fracture suspected",
      "Implement fall prevention measures",
      "Review and adjust medications",
      "Consider physical therapy evaluation",
      "Assess need for assistive devices"
    ],
    followUp: [
      "Monitor for delayed complications",
      "Implement fall prevention plan",
      "Consider occupational therapy",
      "Review home safety"
    ]
  },
  {
    id: "chest-pain",
    title: "Chest Pain in Elderly",
    category: "Cardiovascular",
    urgency: "high",
    symptoms: ["Chest pain or pressure", "Shortness of breath", "Diaphoresis", "Nausea", "Arm/jaw pain"],
    immediateActions: [
      "Obtain 12-lead ECG immediately",
      "Check vital signs",
      "Administer oxygen if needed",
      "Establish IV access",
      "Give aspirin 325mg if not contraindicated"
    ],
    assessment: [
      "Complete cardiac history",
      "Review risk factors",
      "Check troponin levels",
      "Assess for other causes (PE, dissection, etc.)",
      "Review medications",
      "Consider age-related atypical presentations"
    ],
    treatment: [
      "Follow ACS protocol",
      "Consider cardiology consult",
      "Monitor closely",
      "Adjust medications for age and comorbidities",
      "Consider frailty in treatment decisions"
    ],
    followUp: [
      "Serial ECGs and troponins",
      "Cardiology follow-up",
      "Medication optimization",
      "Cardiac rehabilitation if appropriate"
    ]
  },
  {
    id: "uti",
    title: "Urinary Tract Infection",
    category: "Infectious",
    urgency: "medium",
    symptoms: ["Dysuria", "Frequency", "Urgency", "Confusion", "Fever", "Suprapubic pain"],
    immediateActions: [
      "Obtain urine sample for culture",
      "Check vital signs",
      "Assess for sepsis signs",
      "Review recent catheterization",
      "Check for obstruction"
    ],
    assessment: [
      "Complete urinalysis",
      "Check for pyuria and bacteriuria",
      "Assess cognitive status",
      "Review antibiotic allergies",
      "Check for structural abnormalities",
      "Assess for complications"
    ],
    treatment: [
      "Start appropriate antibiotic based on local resistance",
      "Consider nitrofurantoin 100mg BID x 5 days",
      "Adjust dose for renal function",
      "Consider IV antibiotics if severe",
      "Ensure adequate hydration"
    ],
    followUp: [
      "Monitor response to treatment",
      "Follow up culture results",
      "Consider prophylaxis if recurrent",
      "Address underlying risk factors"
    ]
  },
  {
    id: "constipation",
    title: "Severe Constipation",
    category: "Gastrointestinal",
    urgency: "medium",
    symptoms: ["No bowel movement >3 days", "Abdominal distension", "Nausea", "Vomiting", "Abdominal pain"],
    immediateActions: [
      "Assess for obstruction",
      "Check vital signs",
      "Perform abdominal exam",
      "Check for fecal impaction",
      "Review medications"
    ],
    assessment: [
      "Digital rectal exam if appropriate",
      "Check for signs of obstruction",
      "Review medication list",
      "Assess fluid intake",
      "Check electrolyte levels",
      "Consider imaging if obstruction suspected"
    ],
    treatment: [
      "Disimpaction if needed",
      "Start with gentle laxatives",
      "Consider polyethylene glycol",
      "Increase fluid intake",
      "Review and adjust medications",
      "Consider suppositories if oral fails"
    ],
    followUp: [
      "Monitor bowel movements",
      "Adjust treatment as needed",
      "Prevent recurrence",
      "Consider dietary modifications"
    ]
  },
  {
    id: "agitation",
    title: "Severe Agitation",
    category: "Behavioral",
    urgency: "high",
    symptoms: ["Restlessness", "Aggressive behavior", "Yelling", "Pacing", "Resistance to care"],
    immediateActions: [
      "Ensure safety of patient and staff",
      "Attempt verbal de-escalation",
      "Check for pain or discomfort",
      "Assess for delirium",
      "Consider environmental factors"
    ],
    assessment: [
      "Complete mental status exam",
      "Check for delirium",
      "Review recent changes",
      "Assess for pain",
      "Check medications",
      "Consider psychiatric causes"
    ],
    treatment: [
      "Address underlying cause",
      "Non-pharmacological interventions first",
      "Consider haloperidol 0.5-1mg PO/IM",
      "Avoid physical restraints if possible",
      "Consider psychiatry consult",
      "Ensure adequate supervision"
    ],
    followUp: [
      "Monitor response to treatment",
      "Document behavior patterns",
      "Consider environmental modifications",
      "Plan for prevention strategies"
    ]
  }
];

export default function OnCallCoPilot() {
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(protocols.map(p => p.category)))];

  const filteredProtocols = protocols.filter(protocol => {
    const matchesSearch = protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || protocol.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">On-Call Co-Pilot</h1>
            <p className="text-gray-600">3AM protocols for geriatric scenarios</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              ← Back to Platform
            </Link>
            <ThemeSwitcher />
          </div>
        </header>

        {/* Search and Filters */}
        <div className="mb-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search protocols or symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              🚨 Emergency
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Protocol List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Emergency Protocols ({filteredProtocols.length})
            </h2>
            <div className="space-y-3">
              {filteredProtocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProtocol?.id === protocol.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-indigo-300'
                  }`}
                  onClick={() => setSelectedProtocol(protocol)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{protocol.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded border ${getUrgencyColor(protocol.urgency)}`}>
                      {protocol.urgency.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{protocol.category}</p>
                  <div className="text-xs text-gray-500">
                    <p>Key symptoms: {protocol.symptoms.slice(0, 2).join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Details */}
          <div className="lg:col-span-2">
            {selectedProtocol ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedProtocol.title}</h3>
                    <p className="text-gray-600">{selectedProtocol.category} • {selectedProtocol.urgency.toUpperCase()} Priority</p>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded border ${getUrgencyColor(selectedProtocol.urgency)}`}>
                    {selectedProtocol.urgency.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Symptoms */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      🚨 Key Symptoms
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProtocol.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Immediate Actions */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      ⚡ Immediate Actions
                    </h4>
                    <ol className="space-y-2">
                      {selectedProtocol.immediateActions.map((action, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="bg-red-100 text-red-800 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          {action}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Assessment */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      🔍 Assessment
                    </h4>
                    <ul className="space-y-2">
                      {selectedProtocol.assessment.map((item, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      💊 Treatment
                    </h4>
                    <ul className="space-y-2">
                      {selectedProtocol.treatment.map((item, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Follow-up */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      📋 Follow-up
                    </h4>
                    <ul className="space-y-2">
                      {selectedProtocol.followUp.map((item, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      📋 Print Protocol
                    </button>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      📊 Log Incident
                    </button>
                    <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      📞 Call Attending
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center text-gray-500">
                <div className="text-4xl mb-4">🚨</div>
                <p className="text-lg">Select a protocol to view detailed management steps</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Reference Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900">Emergency</h4>
              <p className="text-red-800">Code Blue: 911</p>
              <p className="text-red-800">Security: Ext. 1234</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900">Urgent</h4>
              <p className="text-yellow-800">Attending: Ext. 5678</p>
              <p className="text-yellow-800">Pharmacy: Ext. 9012</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900">Routine</h4>
              <p className="text-green-800">Nursing: Ext. 3456</p>
              <p className="text-green-800">Social Work: Ext. 7890</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}