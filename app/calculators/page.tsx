"use client";

import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

interface CalculatorResult {
  score: number;
  interpretation: string;
  recommendations: string[];
}

export default function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);
  const [mmseScore, setMmseScore] = useState(0);
  const [gdsScore, setGdsScore] = useState(0);
  const [barthelScore, setBarthelScore] = useState(0);
  const [frailtyScore, setFrailtyScore] = useState(0);
  const [chadsScore, setChadsScore] = useState(0);

  const calculators = [
    {
      id: "mmse",
      name: "Mini-Mental State Examination (MMSE)",
      description: "Cognitive assessment tool",
      icon: "🧠",
      maxScore: 30
    },
    {
      id: "gds",
      name: "Geriatric Depression Scale (GDS-15)",
      description: "Depression screening",
      icon: "😔",
      maxScore: 15
    },
    {
      id: "barthel",
      name: "Barthel Index",
      description: "Activities of daily living",
      icon: "🚶",
      maxScore: 100
    },
    {
      id: "frailty",
      name: "Clinical Frailty Scale",
      description: "Frailty assessment",
      icon: "👴",
      maxScore: 9
    },
    {
      id: "chads",
      name: "CHA₂DS₂-VASc Score",
      description: "Stroke risk in AFib",
      icon: "❤️",
      maxScore: 9
    }
  ];

  const getMmseInterpretation = (score: number): CalculatorResult => {
    if (score >= 24) return {
      score,
      interpretation: "Normal cognitive function",
      recommendations: ["Continue current care", "Annual reassessment"]
    };
    if (score >= 18) return {
      score,
      interpretation: "Mild cognitive impairment",
      recommendations: ["Consider neuropsychological evaluation", "Monitor for progression", "Implement cognitive interventions"]
    };
    if (score >= 12) return {
      score,
      interpretation: "Moderate cognitive impairment",
      recommendations: ["Comprehensive dementia evaluation", "Safety assessment", "Caregiver support"]
    };
    return {
      score,
      interpretation: "Severe cognitive impairment",
      recommendations: ["Full dementia workup", "Safety precautions", "24/7 supervision", "Advanced care planning"]
    };
  };

  const getGdsInterpretation = (score: number): CalculatorResult => {
    if (score <= 4) return {
      score,
      interpretation: "No depression",
      recommendations: ["Continue current care", "Annual screening"]
    };
    if (score <= 9) return {
      score,
      interpretation: "Mild depression",
      recommendations: ["Monitor closely", "Consider counseling", "Reassess in 2-4 weeks"]
    };
    return {
      score,
      interpretation: "Moderate to severe depression",
      recommendations: ["Immediate psychiatric evaluation", "Consider antidepressant therapy", "Safety assessment", "Regular follow-up"]
    };
  };

  const getBarthelInterpretation = (score: number): CalculatorResult => {
    if (score >= 100) return {
      score,
      interpretation: "Independent",
      recommendations: ["Continue current level of care", "Annual reassessment"]
    };
    if (score >= 60) return {
      score,
      interpretation: "Mild dependence",
      recommendations: ["Occupational therapy evaluation", "Home safety assessment", "Assistive devices"]
    };
    if (score >= 40) return {
      score,
      interpretation: "Moderate dependence",
      recommendations: ["Comprehensive care plan", "Caregiver training", "Home health services"]
    };
    return {
      score,
      interpretation: "Severe dependence",
      recommendations: ["24-hour care consideration", "Long-term care planning", "Advanced directives"]
    };
  };

  const getFrailtyInterpretation = (score: number): CalculatorResult => {
    if (score <= 3) return {
      score,
      interpretation: "Very fit to managing well",
      recommendations: ["Continue healthy lifestyle", "Preventive care"]
    };
    if (score <= 5) return {
      score,
      interpretation: "Vulnerable",
      recommendations: ["Comprehensive geriatric assessment", "Fall prevention", "Medication review"]
    };
    if (score <= 7) return {
      score,
      interpretation: "Mildly to severely frail",
      recommendations: ["Multidisciplinary care team", "Advanced care planning", "Palliative care consideration"]
    };
    return {
      score,
      interpretation: "Very severely frail",
      recommendations: ["Comfort care focus", "Palliative care", "End-of-life planning"]
    };
  };

  const getChadsInterpretation = (score: number): CalculatorResult => {
    if (score === 0) return {
      score,
      interpretation: "Low risk (0.5% annual stroke risk)",
      recommendations: ["No anticoagulation needed", "Aspirin may be considered"]
    };
    if (score === 1) return {
      score,
      interpretation: "Low-moderate risk (1.3% annual stroke risk)",
      recommendations: ["Consider anticoagulation", "Individualize decision"]
    };
    if (score === 2) return {
      score,
      interpretation: "Moderate risk (2.2% annual stroke risk)",
      recommendations: ["Anticoagulation recommended", "Warfarin or DOAC"]
    };
    if (score >= 3) return {
      score,
      interpretation: "High risk (3.2-15.2% annual stroke risk)",
      recommendations: ["Anticoagulation strongly recommended", "Regular INR monitoring if warfarin"]
    };
    return {
      score,
      interpretation: "Very high risk",
      recommendations: ["Urgent anticoagulation", "Consider cardiology consultation"]
    };
  };

  const renderCalculator = (calculatorId: string) => {
    switch (calculatorId) {
      case "mmse":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MMSE Score (0-30)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={mmseScore}
                onChange={(e) => setMmseScore(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {mmseScore > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900">Interpretation:</h4>
                <p className="text-blue-800">{getMmseInterpretation(mmseScore).interpretation}</p>
                <div className="mt-2">
                  <h5 className="font-medium text-blue-900">Recommendations:</h5>
                  <ul className="list-disc list-inside text-blue-800">
                    {getMmseInterpretation(mmseScore).recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "gds":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GDS-15 Score (0-15)
              </label>
              <input
                type="number"
                min="0"
                max="15"
                value={gdsScore}
                onChange={(e) => setGdsScore(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {gdsScore > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900">Interpretation:</h4>
                <p className="text-green-800">{getGdsInterpretation(gdsScore).interpretation}</p>
                <div className="mt-2">
                  <h5 className="font-medium text-green-900">Recommendations:</h5>
                  <ul className="list-disc list-inside text-green-800">
                    {getGdsInterpretation(gdsScore).recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "barthel":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barthel Index Score (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={barthelScore}
                onChange={(e) => setBarthelScore(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {barthelScore > 0 && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900">Interpretation:</h4>
                <p className="text-purple-800">{getBarthelInterpretation(barthelScore).interpretation}</p>
                <div className="mt-2">
                  <h5 className="font-medium text-purple-900">Recommendations:</h5>
                  <ul className="list-disc list-inside text-purple-800">
                    {getBarthelInterpretation(barthelScore).recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "frailty":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinical Frailty Scale (1-9)
              </label>
              <input
                type="number"
                min="1"
                max="9"
                value={frailtyScore}
                onChange={(e) => setFrailtyScore(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {frailtyScore > 0 && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900">Interpretation:</h4>
                <p className="text-orange-800">{getFrailtyInterpretation(frailtyScore).interpretation}</p>
                <div className="mt-2">
                  <h5 className="font-medium text-orange-900">Recommendations:</h5>
                  <ul className="list-disc list-inside text-orange-800">
                    {getFrailtyInterpretation(frailtyScore).recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "chads":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CHA₂DS₂-VASc Score (0-9)
              </label>
              <input
                type="number"
                min="0"
                max="9"
                value={chadsScore}
                onChange={(e) => setChadsScore(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {chadsScore > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900">Interpretation:</h4>
                <p className="text-red-800">{getChadsInterpretation(chadsScore).interpretation}</p>
                <div className="mt-2">
                  <h5 className="font-medium text-red-900">Recommendations:</h5>
                  <ul className="list-disc list-inside text-red-800">
                    {getChadsInterpretation(chadsScore).recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <div>Select a calculator to begin</div>;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clinical Calculators</h1>
            <p className="text-gray-600">Geriatric assessment tools and scoring systems</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              ← Back to Platform
            </Link>
            <ThemeSwitcher />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Available Calculators</h2>
            <div className="space-y-3">
              {calculators.map((calc) => (
                <div
                  key={calc.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeCalculator === calc.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-indigo-300'
                  }`}
                  onClick={() => setActiveCalculator(calc.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{calc.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{calc.name}</h3>
                      <p className="text-sm text-gray-600">{calc.description}</p>
                      <p className="text-xs text-gray-500">Max score: {calc.maxScore}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeCalculator ? (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {calculators.find(c => c.id === activeCalculator)?.name}
                  </h3>
                  {renderCalculator(activeCalculator)}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-4xl mb-4">🧮</div>
                  <p>Select a calculator from the list to begin</p>
                </div>
              )}
            </div>

            {/* Quick Reference */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Reference</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">MMSE Scoring:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 24-30: Normal</li>
                    <li>• 18-23: Mild impairment</li>
                    <li>• 12-17: Moderate impairment</li>
                    <li>• &lt;12: Severe impairment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">GDS-15 Scoring:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 0-4: No depression</li>
                    <li>• 5-9: Mild depression</li>
                    <li>• 10-15: Moderate-severe depression</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Barthel Index:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 100: Independent</li>
                    <li>• 60-99: Mild dependence</li>
                    <li>• 40-59: Moderate dependence</li>
                    <li>• &lt;40: Severe dependence</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">CHA₂DS₂-VASc:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 0: No anticoagulation</li>
                    <li>• 1: Consider anticoagulation</li>
                    <li>• ≥2: Anticoagulation recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}