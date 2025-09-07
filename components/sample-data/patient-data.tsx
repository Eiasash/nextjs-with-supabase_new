"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  FileText,
  Clock,
  Pill,
  Brain,
  TrendingUp
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  room: string;
  admissionDate: string;
  diagnosis: string[];
  riskFactors: string[];
  medications: string[];
  assessments: {
    mmse?: number;
    gds?: number;
    barthel?: number;
    frailty?: string;
  };
  alerts: string[];
  lastUpdated: string;
}

const samplePatients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Cohen",
    age: 78,
    gender: "F",
    room: "3A-12",
    admissionDate: "2024-01-15",
    diagnosis: ["Dementia with Behavioral Disturbance", "Hypertension", "Diabetes Type 2"],
    riskFactors: ["Fall Risk", "Polypharmacy", "Cognitive Impairment"],
    medications: ["Donepezil 10mg", "Metformin 500mg", "Lisinopril 5mg", "Risperidone 0.5mg"],
    assessments: {
      mmse: 18,
      gds: 8,
      barthel: 65,
      frailty: "Moderate"
    },
    alerts: ["Fall precautions", "Medication review needed"],
    lastUpdated: "2024-01-20 08:30"
  },
  {
    id: "P002",
    name: "David Levy",
    age: 85,
    gender: "M",
    room: "3B-05",
    admissionDate: "2024-01-18",
    diagnosis: ["Heart Failure", "Atrial Fibrillation", "Chronic Kidney Disease"],
    riskFactors: ["Anticoagulation", "Fluid Balance", "Renal Function"],
    medications: ["Warfarin 2.5mg", "Furosemide 40mg", "Metoprolol 25mg", "Atorvastatin 20mg"],
    assessments: {
      mmse: 26,
      gds: 4,
      barthel: 85,
      frailty: "Mild"
    },
    alerts: ["INR monitoring", "Daily weights"],
    lastUpdated: "2024-01-20 07:45"
  },
  {
    id: "P003",
    name: "Rachel Goldstein",
    age: 72,
    gender: "F",
    room: "3A-08",
    admissionDate: "2024-01-19",
    diagnosis: ["Major Depression", "Osteoporosis", "Hypothyroidism"],
    riskFactors: ["Suicide Risk", "Fracture Risk", "Social Isolation"],
    medications: ["Sertraline 50mg", "Alendronate 70mg weekly", "Levothyroxine 75mcg", "Calcium + D3"],
    assessments: {
      mmse: 28,
      gds: 12,
      barthel: 75,
      frailty: "Mild"
    },
    alerts: ["Depression monitoring", "Suicide precautions"],
    lastUpdated: "2024-01-20 09:15"
  },
  {
    id: "P004",
    name: "Abraham Rosen",
    age: 89,
    gender: "M",
    room: "3B-11",
    admissionDate: "2024-01-16",
    diagnosis: ["Parkinson's Disease", "Orthostatic Hypotension", "Constipation"],
    riskFactors: ["Fall Risk", "Swallowing Difficulty", "Mobility Issues"],
    medications: ["Carbidopa-Levodopa 25/100mg", "Fludrocortisone 0.1mg", "Docusate 100mg", "Multivitamin"],
    assessments: {
      mmse: 24,
      gds: 6,
      barthel: 45,
      frailty: "Severe"
    },
    alerts: ["Fall precautions", "Speech therapy consult"],
    lastUpdated: "2024-01-20 08:00"
  },
  {
    id: "P005",
    name: "Miriam Katz",
    age: 76,
    gender: "F",
    room: "3A-15",
    admissionDate: "2024-01-17",
    diagnosis: ["Mild Cognitive Impairment", "Hypertension", "Osteoarthritis"],
    riskFactors: ["Cognitive Decline", "Pain Management", "Medication Adherence"],
    medications: ["Amlodipine 5mg", "Acetaminophen 650mg PRN", "Memantine 10mg", "Omega-3"],
    assessments: {
      mmse: 22,
      gds: 5,
      barthel: 80,
      frailty: "Mild"
    },
    alerts: ["Cognitive assessment follow-up"],
    lastUpdated: "2024-01-20 07:30"
  }
];

export function PatientData() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");

  const getRiskColor = (risk: string) => {
    const highRisk = ["Fall Risk", "Suicide Risk", "Anticoagulation"];
    const mediumRisk = ["Cognitive Impairment", "Polypharmacy", "Fluid Balance"];
    
    if (highRisk.includes(risk)) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    if (mediumRisk.includes(risk)) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  };

  const getAssessmentColor = (type: string, value: number | string) => {
    if (type === "mmse") {
      const score = value as number;
      if (score >= 24) return "text-green-600";
      if (score >= 18) return "text-yellow-600";
      return "text-red-600";
    }
    if (type === "gds") {
      const score = value as number;
      if (score <= 4) return "text-green-600";
      if (score <= 9) return "text-yellow-600";
      return "text-red-600";
    }
    if (type === "barthel") {
      const score = value as number;
      if (score >= 80) return "text-green-600";
      if (score >= 60) return "text-yellow-600";
      return "text-red-600";
    }
    return "text-gray-600";
  };

  const stats = {
    totalPatients: samplePatients.length,
    highRiskPatients: samplePatients.filter(p => 
      p.riskFactors.some(r => ["Fall Risk", "Suicide Risk", "Anticoagulation"].includes(r))
    ).length,
    avgAge: Math.round(samplePatients.reduce((sum, p) => sum + p.age, 0) / samplePatients.length),
    pendingAssessments: samplePatients.filter(p => p.alerts.length > 0).length
  };

  if (viewMode === "detail" && selectedPatient) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => {setViewMode("list"); setSelectedPatient(null);}}
          >
            ← Back to Patient List
          </Button>
          <Badge variant="outline">Room {selectedPatient.room}</Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                <CardDescription className="text-lg">
                  {selectedPatient.age} years old • {selectedPatient.gender === "M" ? "Male" : "Female"} • 
                  Admitted {new Date(selectedPatient.admissionDate).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="text-sm font-medium">{selectedPatient.lastUpdated}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Diagnoses */}
              <div className="lg:col-span-3">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Primary Diagnoses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.diagnosis.map((dx, index) => (
                    <Badge key={index} variant="outline">{dx}</Badge>
                  ))}
                </div>
              </div>

              {/* Risk Factors */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Factors
                </h3>
                <div className="space-y-2">
                  {selectedPatient.riskFactors.map((risk, index) => (
                    <Badge key={index} className={getRiskColor(risk)}>
                      {risk}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Current Medications
                </h3>
                <div className="space-y-1 text-sm">
                  {selectedPatient.medications.map((med, index) => (
                    <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      {med}
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessments */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Assessment Scores
                </h3>
                <div className="space-y-3">
                  {selectedPatient.assessments.mmse && (
                    <div className="flex justify-between">
                      <span className="text-sm">MMSE:</span>
                      <span className={`font-medium ${getAssessmentColor("mmse", selectedPatient.assessments.mmse)}`}>
                        {selectedPatient.assessments.mmse}/30
                      </span>
                    </div>
                  )}
                  {selectedPatient.assessments.gds && (
                    <div className="flex justify-between">
                      <span className="text-sm">GDS:</span>
                      <span className={`font-medium ${getAssessmentColor("gds", selectedPatient.assessments.gds)}`}>
                        {selectedPatient.assessments.gds}/15
                      </span>
                    </div>
                  )}
                  {selectedPatient.assessments.barthel && (
                    <div className="flex justify-between">
                      <span className="text-sm">Barthel:</span>
                      <span className={`font-medium ${getAssessmentColor("barthel", selectedPatient.assessments.barthel)}`}>
                        {selectedPatient.assessments.barthel}/100
                      </span>
                    </div>
                  )}
                  {selectedPatient.assessments.frailty && (
                    <div className="flex justify-between">
                      <span className="text-sm">Frailty:</span>
                      <span className="font-medium">{selectedPatient.assessments.frailty}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Alerts */}
            {selectedPatient.alerts.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <AlertTriangle className="h-4 w-4" />
                  Active Alerts
                </h3>
                <div className="space-y-1">
                  {selectedPatient.alerts.map((alert, index) => (
                    <div key={index} className="text-sm text-yellow-800 dark:text-yellow-200">
                      • {alert}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                New Assessment
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Follow-up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Currently admitted</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highRiskPatients}</div>
            <p className="text-xs text-muted-foreground">Require monitoring</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Age</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgAge}</div>
            <p className="text-xs text-muted-foreground">Years</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssessments}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Patients
          </CardTitle>
          <CardDescription>
            Geriatrics ward patient list with key indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {samplePatients.map((patient) => (
              <div 
                key={patient.id}
                className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => {setSelectedPatient(patient); setViewMode("detail");}}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <Badge variant="outline">Room {patient.room}</Badge>
                      <Badge variant="outline">{patient.age}y {patient.gender}</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-600 dark:text-gray-400">Primary Diagnosis</div>
                        <div>{patient.diagnosis[0]}</div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-600 dark:text-gray-400">Key Assessments</div>
                        <div className="flex gap-2">
                          {patient.assessments.mmse && (
                            <span className={getAssessmentColor("mmse", patient.assessments.mmse)}>
                              MMSE: {patient.assessments.mmse}
                            </span>
                          )}
                          {patient.assessments.barthel && (
                            <span className={getAssessmentColor("barthel", patient.assessments.barthel)}>
                              Barthel: {patient.assessments.barthel}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-600 dark:text-gray-400">Risk Factors</div>
                        <div className="flex flex-wrap gap-1">
                          {patient.riskFactors.slice(0, 2).map((risk, index) => (
                            <Badge key={index} className={`text-xs ${getRiskColor(risk)}`}>
                              {risk}
                            </Badge>
                          ))}
                          {patient.riskFactors.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{patient.riskFactors.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {patient.alerts.length > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                        {patient.alerts.length} alert{patient.alerts.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}