"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PatientData } from "@/components/sample-data/patient-data";
import { MMSECalculator } from "@/components/clinical-tools/mmse-calculator";
import { GDSCalculator } from "@/components/clinical-tools/gds-calculator";
import { 
  Stethoscope, 
  Brain, 
  Calculator, 
  BookOpen, 
  Users, 
  FileText, 
  Heart, 
  Activity,
  Pill,
  Clock,
  Search,
  Download,
  AlertTriangle,
  CheckCircle,
  Settings
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "complete" | "phase2" | "phase3" | "coming-soon";
  category: "daily" | "academic" | "clinical";
}

const tools: Tool[] = [
  // Daily Use Tools
  {
    id: "patient-dashboard",
    name: "Patient Dashboard",
    description: "Assists with morning rounds preparation by synthesizing risk factors",
    icon: <Users className="h-6 w-6" />,
    status: "complete",
    category: "daily"
  },
  {
    id: "on-call-copilot",
    name: "On-Call Co-Pilot",
    description: "Provides protocols for geriatric scenarios during on-call hours",
    icon: <Clock className="h-6 w-6" />,
    status: "complete",
    category: "daily"
  },
  {
    id: "note-analyzer",
    name: "Note Analyzer",
    description: "Utilizes NLP to interpret Hebrew and English abbreviations in clinical notes",
    icon: <FileText className="h-6 w-6" />,
    status: "complete",
    category: "daily"
  },
  {
    id: "anticoagulation-tool",
    name: "Anticoagulation Tool",
    description: "Calculates CHA₂DS₂-VASc scores with renal dosing considerations",
    icon: <Heart className="h-6 w-6" />,
    status: "phase2",
    category: "daily"
  },
  
  // Academic & Study Tools
  {
    id: "shlav-alef-prep",
    name: "Shlav Alef Prep",
    description: "50 questions in Hebrew and English for exam preparation",
    icon: <BookOpen className="h-6 w-6" />,
    status: "complete",
    category: "academic"
  },
  {
    id: "research-mm",
    name: "Research/M&M",
    description: "Facilitates PICO searches and conference planning",
    icon: <Search className="h-6 w-6" />,
    status: "complete",
    category: "academic"
  },
  {
    id: "evidence-library",
    name: "Evidence Library",
    description: "20 landmark trials and Ministry of Health guidelines",
    icon: <BookOpen className="h-6 w-6" />,
    status: "complete",
    category: "academic"
  },
  
  // Clinical Tools & Calculators
  {
    id: "frailty-assessment",
    name: "Frailty Assessment",
    description: "Comprehensive frailty evaluation tools",
    icon: <Activity className="h-6 w-6" />,
    status: "complete",
    category: "clinical"
  },
  {
    id: "mmse",
    name: "MMSE",
    description: "Mini-Mental State Examination",
    icon: <Brain className="h-6 w-6" />,
    status: "complete",
    category: "clinical"
  },
  {
    id: "gds",
    name: "GDS",
    description: "Geriatric Depression Scale",
    icon: <Brain className="h-6 w-6" />,
    status: "complete",
    category: "clinical"
  },
  {
    id: "barthel-index",
    name: "Barthel Index",
    description: "Activities of Daily Living Assessment",
    icon: <Calculator className="h-6 w-6" />,
    status: "complete",
    category: "clinical"
  },
  {
    id: "drug-interactions",
    name: "Drug Interactions",
    description: "Medication interaction checker",
    icon: <Pill className="h-6 w-6" />,
    status: "coming-soon",
    category: "clinical"
  },
  {
    id: "deprescribing-tool",
    name: "Deprescribing Tool",
    description: "Aids in optimizing medication regimens",
    icon: <Pill className="h-6 w-6" />,
    status: "coming-soon",
    category: "clinical"
  },
  {
    id: "capacity-tool",
    name: "Capacity Tool",
    description: "Assesses decision-making capacity",
    icon: <Brain className="h-6 w-6" />,
    status: "phase3",
    category: "clinical"
  }
];

const statusColors = {
  complete: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  phase2: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  phase3: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "coming-soon": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
};

const statusLabels = {
  complete: "Complete",
  phase2: "Phase 2",
  phase3: "Phase 3",
  "coming-soon": "Coming Soon"
};

export function GeriatricsPlatform() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const categoryStats = {
    daily: tools.filter(t => t.category === "daily").length,
    academic: tools.filter(t => t.category === "academic").length,
    clinical: tools.filter(t => t.category === "clinical").length,
  };

  const developmentPhases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      status: "Complete",
      description: "Basic platform setup and core infrastructure"
    },
    {
      phase: "Phase 2",
      title: "Core Tools",
      status: "Sept-Nov",
      description: "Daily use tools and essential calculators"
    },
    {
      phase: "Phase 3",
      title: "Advanced Integration",
      status: "Dec-Feb",
      description: "Advanced features and comprehensive integration"
    }
  ];

  const launchTool = (toolId: string) => {
    setActiveTool(toolId);
    setSelectedTool(null);
  };

  const closeTool = () => {
    setActiveTool(null);
  };

  // Render active tool
  if (activeTool) {
    switch (activeTool) {
      case "patient-dashboard":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Patient Dashboard</h1>
              <Button onClick={closeTool} variant="outline">
                ← Back to Platform
              </Button>
            </div>
            <PatientData />
          </div>
        );
      case "mmse":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">MMSE Calculator</h1>
              <Button onClick={closeTool} variant="outline">
                ← Back to Platform
              </Button>
            </div>
            <MMSECalculator />
          </div>
        );
      case "gds":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">GDS Calculator</h1>
              <Button onClick={closeTool} variant="outline">
                ← Back to Platform
              </Button>
            </div>
            <GDSCalculator />
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <div className="mb-4">
              <Settings className="h-16 w-16 mx-auto text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Tool Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This tool is currently under development.
            </p>
            <Button onClick={closeTool} variant="outline">
              ← Back to Platform
            </Button>
          </div>
        );
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Geriatrics Fellowship Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Comprehensive suite of tools and resources for geriatric care at Shaare Zedek Medical Center
        </p>
      </div>

      {/* Development Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Development Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {developmentPhases.map((phase, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex-shrink-0">
                  {index === 0 ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Clock className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {phase.phase}: {phase.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {phase.status}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={() => launchTool("patient-dashboard")}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Patient Dashboard
        </Button>
        <Button 
          onClick={() => launchTool("mmse")}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Brain className="h-4 w-4" />
          MMSE Calculator
        </Button>
        <Button 
          onClick={() => launchTool("gds")}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Heart className="h-4 w-4" />
          GDS Calculator
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Morning Report
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Emergency Protocols
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className="flex items-center gap-2"
        >
          All Tools ({tools.length})
        </Button>
        <Button 
          variant={selectedCategory === "daily" ? "default" : "outline"}
          onClick={() => setSelectedCategory("daily")}
          className="flex items-center gap-2"
        >
          <Stethoscope className="h-4 w-4" />
          Daily Use ({categoryStats.daily})
        </Button>
        <Button 
          variant={selectedCategory === "academic" ? "default" : "outline"}
          onClick={() => setSelectedCategory("academic")}
          className="flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Academic & Study ({categoryStats.academic})
        </Button>
        <Button 
          variant={selectedCategory === "clinical" ? "default" : "outline"}
          onClick={() => setSelectedCategory("clinical")}
          className="flex items-center gap-2"
        >
          <Calculator className="h-4 w-4" />
          Clinical Tools ({categoryStats.clinical})
        </Button>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <Card 
            key={tool.id} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => setSelectedTool(tool)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  {tool.icon}
                </div>
                <Badge className={statusColors[tool.status]}>
                  {statusLabels[tool.status]}
                </Badge>
              </div>
              <CardTitle className="text-lg">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {tool.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Detail Modal/Panel */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                    {selectedTool.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedTool.name}</CardTitle>
                    <Badge className={statusColors[selectedTool.status]}>
                      {statusLabels[selectedTool.status]}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedTool(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {selectedTool.description}
              </p>
              
              {selectedTool.status === "complete" ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Tool Features:</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This tool is fully functional and ready to use. Click below to access the full functionality.
                    </p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => launchTool(selectedTool.id)}
                  >
                    Launch {selectedTool.name}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Development Status:</h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      This tool is currently in development. Expected completion: {
                        selectedTool.status === "phase2" ? "November 2024" :
                        selectedTool.status === "phase3" ? "February 2025" :
                        "To be announced"
                      }
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}