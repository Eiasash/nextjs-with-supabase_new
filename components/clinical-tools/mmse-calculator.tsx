"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, Calculator, FileText } from "lucide-react";

interface MMSEItem {
  id: string;
  category: string;
  question: string;
  points: number;
  checked: boolean;
}

export function MMSECalculator() {
  const [items, setItems] = useState<MMSEItem[]>([
    // Orientation to Time (5 points)
    { id: "time1", category: "Orientation to Time", question: "What is the year?", points: 1, checked: false },
    { id: "time2", category: "Orientation to Time", question: "What is the season?", points: 1, checked: false },
    { id: "time3", category: "Orientation to Time", question: "What is the date?", points: 1, checked: false },
    { id: "time4", category: "Orientation to Time", question: "What is the day of the week?", points: 1, checked: false },
    { id: "time5", category: "Orientation to Time", question: "What is the month?", points: 1, checked: false },
    
    // Orientation to Place (5 points)
    { id: "place1", category: "Orientation to Place", question: "What country are we in?", points: 1, checked: false },
    { id: "place2", category: "Orientation to Place", question: "What state/province are we in?", points: 1, checked: false },
    { id: "place3", category: "Orientation to Place", question: "What city are we in?", points: 1, checked: false },
    { id: "place4", category: "Orientation to Place", question: "What is the name of this hospital?", points: 1, checked: false },
    { id: "place5", category: "Orientation to Place", question: "What floor are we on?", points: 1, checked: false },
    
    // Registration (3 points)
    { id: "reg1", category: "Registration", question: "Repeat: Apple", points: 1, checked: false },
    { id: "reg2", category: "Registration", question: "Repeat: Penny", points: 1, checked: false },
    { id: "reg3", category: "Registration", question: "Repeat: Table", points: 1, checked: false },
    
    // Attention and Calculation (5 points)
    { id: "calc1", category: "Attention & Calculation", question: "100 - 7 = 93", points: 1, checked: false },
    { id: "calc2", category: "Attention & Calculation", question: "93 - 7 = 86", points: 1, checked: false },
    { id: "calc3", category: "Attention & Calculation", question: "86 - 7 = 79", points: 1, checked: false },
    { id: "calc4", category: "Attention & Calculation", question: "79 - 7 = 72", points: 1, checked: false },
    { id: "calc5", category: "Attention & Calculation", question: "72 - 7 = 65", points: 1, checked: false },
    
    // Recall (3 points)
    { id: "recall1", category: "Recall", question: "Recall: Apple", points: 1, checked: false },
    { id: "recall2", category: "Recall", question: "Recall: Penny", points: 1, checked: false },
    { id: "recall3", category: "Recall", question: "Recall: Table", points: 1, checked: false },
    
    // Language (9 points)
    { id: "lang1", category: "Language", question: "Name: Pencil", points: 1, checked: false },
    { id: "lang2", category: "Language", question: "Name: Watch", points: 1, checked: false },
    { id: "lang3", category: "Language", question: "Repeat: 'No ifs, ands, or buts'", points: 1, checked: false },
    { id: "lang4", category: "Language", question: "Follow 3-step command: Take paper", points: 1, checked: false },
    { id: "lang5", category: "Language", question: "Follow 3-step command: Fold in half", points: 1, checked: false },
    { id: "lang6", category: "Language", question: "Follow 3-step command: Put on floor", points: 1, checked: false },
    { id: "lang7", category: "Language", question: "Read and obey: 'Close your eyes'", points: 1, checked: false },
    { id: "lang8", category: "Language", question: "Write a sentence", points: 1, checked: false },
    { id: "lang9", category: "Language", question: "Copy design (pentagons)", points: 1, checked: false },
  ]);

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    education: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleItemCheck = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const totalScore = items.filter(item => item.checked).reduce((sum, item) => sum + item.points, 0);
  const maxScore = 30;

  const getInterpretation = (score: number) => {
    if (score >= 24) return { level: "Normal", color: "text-green-600", description: "No cognitive impairment" };
    if (score >= 18) return { level: "Mild", color: "text-yellow-600", description: "Mild cognitive impairment" };
    if (score >= 10) return { level: "Moderate", color: "text-orange-600", description: "Moderate cognitive impairment" };
    return { level: "Severe", color: "text-red-600", description: "Severe cognitive impairment" };
  };

  const interpretation = getInterpretation(totalScore);

  const categories = [...new Set(items.map(item => item.category))];

  const reset = () => {
    setItems(items.map(item => ({ ...item, checked: false })));
    setPatientInfo({ name: "", age: "", education: "", date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            Mini-Mental State Examination (MMSE)
          </CardTitle>
          <CardDescription>
            Cognitive assessment tool for detecting cognitive impairment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1">Patient Name</label>
              <input
                type="text"
                value={patientInfo.name}
                onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                value={patientInfo.age}
                onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                className="w-full p-2 border rounded text-sm"
                placeholder="Age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Education Level</label>
              <input
                type="text"
                value={patientInfo.education}
                onChange={(e) => setPatientInfo({...patientInfo, education: e.target.value})}
                className="w-full p-2 border rounded text-sm"
                placeholder="Years/Level"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={patientInfo.date}
                onChange={(e) => setPatientInfo({...patientInfo, date: e.target.value})}
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>

          {/* Assessment Items */}
          <div className="space-y-6">
            {categories.map(category => {
              const categoryItems = items.filter(item => item.category === category);
              const categoryScore = categoryItems.filter(item => item.checked).reduce((sum, item) => sum + item.points, 0);
              const categoryMax = categoryItems.reduce((sum, item) => sum + item.points, 0);
              
              return (
                <div key={category} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">{category}</h3>
                    <Badge variant="outline">
                      {categoryScore}/{categoryMax} points
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {categoryItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => handleItemCheck(item.id)}
                        />
                        <span className="flex-1 text-sm">{item.question}</span>
                        <span className="text-xs text-gray-500">{item.points} pt</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Assessment Results</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{totalScore}/{maxScore}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Score</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">Interpretation</div>
                <div className={`text-lg font-semibold ${interpretation.color}`}>
                  {interpretation.level} Cognitive Function
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {interpretation.description}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Score Breakdown</div>
                <div className="text-xs space-y-1">
                  <div>≥24: Normal cognitive function</div>
                  <div>18-23: Mild cognitive impairment</div>
                  <div>10-17: Moderate cognitive impairment</div>
                  <div>&lt;10: Severe cognitive impairment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={reset} variant="outline">
              Reset Assessment
            </Button>
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}