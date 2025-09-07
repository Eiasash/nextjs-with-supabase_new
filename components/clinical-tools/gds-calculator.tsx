"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, Calculator, FileText, AlertTriangle } from "lucide-react";

interface GDSQuestion {
  id: number;
  question: string;
  positiveAnswer: "yes" | "no"; // Which answer indicates depression
}

const gdsQuestions: GDSQuestion[] = [
  { id: 1, question: "Are you basically satisfied with your life?", positiveAnswer: "no" },
  { id: 2, question: "Have you dropped many of your activities and interests?", positiveAnswer: "yes" },
  { id: 3, question: "Do you feel that your life is empty?", positiveAnswer: "yes" },
  { id: 4, question: "Do you often get bored?", positiveAnswer: "yes" },
  { id: 5, question: "Are you in good spirits most of the time?", positiveAnswer: "no" },
  { id: 6, question: "Are you afraid that something bad is going to happen to you?", positiveAnswer: "yes" },
  { id: 7, question: "Do you feel happy most of the time?", positiveAnswer: "no" },
  { id: 8, question: "Do you often feel helpless?", positiveAnswer: "yes" },
  { id: 9, question: "Do you prefer to stay at home, rather than going out and doing new things?", positiveAnswer: "yes" },
  { id: 10, question: "Do you feel you have more problems with memory than most?", positiveAnswer: "yes" },
  { id: 11, question: "Do you think it is wonderful to be alive now?", positiveAnswer: "no" },
  { id: 12, question: "Do you feel pretty worthless the way you are now?", positiveAnswer: "yes" },
  { id: 13, question: "Do you feel full of energy?", positiveAnswer: "no" },
  { id: 14, question: "Do you feel that your situation is hopeless?", positiveAnswer: "yes" },
  { id: 15, question: "Do you think that most people are better off than you are?", positiveAnswer: "yes" }
];

export function GDSCalculator() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = () => {
    let score = 0;
    gdsQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer === question.positiveAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const totalScore = calculateScore();
  const answeredQuestions = Object.keys(answers).length;
  const isComplete = answeredQuestions === gdsQuestions.length;

  const getInterpretation = (score: number) => {
    if (score <= 4) {
      return { 
        level: "Normal", 
        color: "text-green-600 bg-green-50 border-green-200", 
        description: "No significant depression",
        recommendation: "Continue regular monitoring and support"
      };
    }
    if (score <= 9) {
      return { 
        level: "Mild Depression", 
        color: "text-yellow-600 bg-yellow-50 border-yellow-200", 
        description: "Mild depressive symptoms",
        recommendation: "Consider counseling, monitor closely, evaluate for treatment"
      };
    }
    return { 
      level: "Severe Depression", 
      color: "text-red-600 bg-red-50 border-red-200", 
      description: "Significant depressive symptoms",
      recommendation: "Immediate psychiatric evaluation and treatment recommended"
    };
  };

  const interpretation = getInterpretation(totalScore);

  const reset = () => {
    setAnswers({});
    setPatientInfo({ name: "", age: "", date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-500" />
            Geriatric Depression Scale (GDS-15)
          </CardTitle>
          <CardDescription>
            Brief screening tool for depression in older adults
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={patientInfo.date}
                onChange={(e) => setPatientInfo({...patientInfo, date: e.target.value})}
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Instructions</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Please answer the following questions as they apply to how you have felt over the past week. 
              Choose the answer that best describes how you have been feeling.
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {gdsQuestions.map((question) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="mb-3">
                  <h3 className="font-medium text-base mb-2">
                    {question.id}. {question.question}
                  </h3>
                </div>
                
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`q${question.id}-yes`} />
                    <Label htmlFor={`q${question.id}-yes`} className="cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`q${question.id}-no`} />
                    <Label htmlFor={`q${question.id}-no`} className="cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {answeredQuestions}/15 questions answered
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredQuestions / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Results */}
          {isComplete && (
            <div className={`mt-8 p-6 rounded-lg border-2 ${interpretation.color}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Assessment Results</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{totalScore}/15</div>
                  <div className="text-sm opacity-75">Total Score</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-lg font-semibold mb-1">
                    {interpretation.level}
                  </div>
                  <div className="text-sm opacity-90">
                    {interpretation.description}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Clinical Recommendation:</div>
                  <div className="text-sm opacity-90">
                    {interpretation.recommendation}
                  </div>
                </div>

                {totalScore >= 10 && (
                  <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-800 dark:text-red-200">
                      High risk score - Consider immediate psychiatric evaluation
                    </span>
                  </div>
                )}
                
                <div className="text-xs opacity-75 pt-2 border-t">
                  <div><strong>Scoring:</strong></div>
                  <div>0-4: Normal (no depression)</div>
                  <div>5-9: Mild depression</div>
                  <div>10-15: Severe depression</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={reset} variant="outline">
              Reset Assessment
            </Button>
            {isComplete && (
              <Button className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}