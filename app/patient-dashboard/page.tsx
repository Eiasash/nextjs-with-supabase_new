"use client";

import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

interface Patient {
  id: string;
  name: string;
  age: number;
  room: string;
  diagnosis: string;
  riskLevel: 'high' | 'medium' | 'low';
  lastUpdate: string;
  vitals: {
    bp: string;
    hr: number;
    temp: number;
    o2: number;
  };
  medications: string[];
  alerts: string[];
}

const samplePatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Cohen",
    age: 78,
    room: "301A",
    diagnosis: "Dementia, HTN, DM2",
    riskLevel: "high",
    lastUpdate: "2 hours ago",
    vitals: { bp: "145/90", hr: 88, temp: 37.2, o2: 94 },
    medications: ["Donepezil 5mg", "Metformin 1000mg", "Lisinopril 10mg"],
    alerts: ["Fall risk", "Wandering behavior", "Medication non-compliance"]
  },
  {
    id: "2",
    name: "Moshe Levy",
    age: 82,
    room: "302B",
    diagnosis: "Parkinson's, Depression",
    riskLevel: "medium",
    lastUpdate: "1 hour ago",
    vitals: { bp: "130/85", hr: 72, temp: 36.8, o2: 96 },
    medications: ["Levodopa 100mg", "Sertraline 50mg", "Pramipexole 0.5mg"],
    alerts: ["Mobility issues", "Depression screening needed"]
  },
  {
    id: "3",
    name: "Ruth Goldstein",
    age: 85,
    room: "303A",
    diagnosis: "Osteoporosis, AFib",
    riskLevel: "high",
    lastUpdate: "30 minutes ago",
    vitals: { bp: "140/88", hr: 95, temp: 37.0, o2: 92 },
    medications: ["Warfarin 3mg", "Alendronate 70mg", "Calcium 1000mg"],
    alerts: ["Bleeding risk", "Fracture risk", "INR monitoring needed"]
  },
  {
    id: "4",
    name: "David Rosen",
    age: 76,
    room: "304B",
    diagnosis: "CHF, CKD Stage 3",
    riskLevel: "medium",
    lastUpdate: "45 minutes ago",
    vitals: { bp: "125/80", hr: 85, temp: 36.9, o2: 95 },
    medications: ["Furosemide 40mg", "Enalapril 5mg", "Metoprolol 25mg"],
    alerts: ["Fluid restriction", "Weight monitoring", "Kidney function"]
  },
  {
    id: "5",
    name: "Miriam Schwartz",
    age: 79,
    room: "305A",
    diagnosis: "Delirium, UTI",
    riskLevel: "high",
    lastUpdate: "1 hour ago",
    vitals: { bp: "155/95", hr: 102, temp: 38.1, o2: 89 },
    medications: ["Ciprofloxacin 500mg", "Haloperidol 0.5mg", "Acetaminophen 650mg"],
    alerts: ["Infection", "Delirium", "Fever", "Oxygen support"]
  }
];

export default function PatientDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = samplePatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Unknown';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600">Morning rounds preparation with risk synthesis</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              ← Back to Platform
            </Link>
            <ThemeSwitcher />
          </div>
        </header>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search patients by name or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              📊 Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Patient List ({filteredPatients.length})</h2>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${getRiskColor(patient.riskLevel)} hover:shadow-xl transition-shadow cursor-pointer`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${patient.riskLevel === 'high' ? 'bg-red-100 text-red-800' : patient.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {getRiskText(patient.riskLevel)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">Room {patient.room} • Age {patient.age}</p>
                      <p className="text-gray-700 font-medium mb-2">{patient.diagnosis}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>BP: {patient.vitals.bp}</span>
                        <span>HR: {patient.vitals.hr}</span>
                        <span>Temp: {patient.vitals.temp}°C</span>
                        <span>O₂: {patient.vitals.o2}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Last update: {patient.lastUpdate}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl mb-2">
                        {patient.riskLevel === 'high' ? '🔴' : patient.riskLevel === 'medium' ? '🟡' : '🟢'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-1">
            {selectedPatient ? (
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{selectedPatient.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Vital Signs</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-600">Blood Pressure:</span>
                        <div className="font-bold">{selectedPatient.vitals.bp}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-600">Heart Rate:</span>
                        <div className="font-bold">{selectedPatient.vitals.hr} bpm</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-600">Temperature:</span>
                        <div className="font-bold">{selectedPatient.vitals.temp}°C</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-600">Oxygen:</span>
                        <div className="font-bold">{selectedPatient.vitals.o2}%</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Current Medications</h4>
                    <ul className="space-y-1">
                      {selectedPatient.medications.map((med, index) => (
                        <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {med}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Alerts & Warnings</h4>
                    <ul className="space-y-1">
                      {selectedPatient.alerts.map((alert, index) => (
                        <li key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded border-l-2 border-red-300">
                          ⚠️ {alert}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                      View Full Chart
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
                <div className="text-4xl mb-4">👆</div>
                <p>Select a patient to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              📋 Generate Rounds List
            </button>
            <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
              📊 Export All Data
            </button>
            <button className="bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
              ⚠️ High Risk Patients
            </button>
            <button className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}