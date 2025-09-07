"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  Activity, 
  FileText, 
  Clock, 
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  Pill,
  Heart,
  Brain
} from "lucide-react";

interface UserClaims {
  sub: string;
  email?: string;
  [key: string]: unknown;
}

interface UserDashboardProps {
  userClaims: UserClaims;
}

export function UserDashboard({ userClaims }: UserDashboardProps) {

  // Mock data for demonstration
  const recentActivity = [
    {
      id: 1,
      action: "Completed MMSE assessment",
      patient: "Patient A",
      time: "2 hours ago",
      icon: <Brain className="h-4 w-4" />,
      type: "assessment"
    },
    {
      id: 2,
      action: "Used Anticoagulation Tool",
      patient: "Patient B",
      time: "4 hours ago",
      icon: <Heart className="h-4 w-4" />,
      type: "calculation"
    },
    {
      id: 3,
      action: "Reviewed Evidence Library",
      patient: "Research",
      time: "Yesterday",
      icon: <FileText className="h-4 w-4" />,
      type: "study"
    }
  ];

  const todayStats = {
    patientsReviewed: 12,
    assessmentsCompleted: 5,
    protocolsAccessed: 3,
    studyTime: "2.5 hours"
  };

  const upcomingTasks = [
    {
      id: 1,
      task: "Morning rounds preparation",
      time: "08:00",
      priority: "high",
      patients: 8
    },
    {
      id: 2,
      task: "Medication review - Ward 3",
      time: "10:30",
      priority: "medium",
      patients: 4
    },
    {
      id: 3,
      task: "Family meeting",
      time: "14:00",
      priority: "high",
      patients: 1
    }
  ];

  const quickActions = [
    {
      name: "Start Morning Rounds",
      description: "Prepare for today&apos;s patient rounds",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      name: "Emergency Protocols",
      description: "Quick access to emergency procedures",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "bg-red-500"
    },
    {
      name: "Medication Calculator",
      description: "Calculate dosages and interactions",
      icon: <Pill className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      name: "Assessment Tools",
      description: "MMSE, GDS, Frailty assessments",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, Dr. {userClaims.email?.split('@')[0] || 'Fellow'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Geriatrics Fellowship Dashboard - {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active Session
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients Today</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.patientsReviewed}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.assessmentsCompleted}</div>
              <p className="text-xs text-muted-foreground">Completed today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protocols Used</CardTitle>
              <FileText className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.protocolsAccessed}</div>
              <p className="text-xs text-muted-foreground">Emergency & routine</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.studyTime}</div>
              <p className="text-xs text-muted-foreground">Learning activities</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Upcoming */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Frequently used tools and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 justify-start space-x-3"
                    >
                      <div className={`p-2 rounded-md ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{action.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today&apos;s Schedule
                </CardTitle>
                <CardDescription>
                  Upcoming tasks and appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{task.task}</div>
                        <div className="text-xs text-muted-foreground">
                          {task.patients} patient{task.patients !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {task.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your recent platform usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.patient}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{userClaims.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Role</div>
                    <div className="text-sm text-muted-foreground">Geriatrics Fellow</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Department</div>
                    <div className="text-sm text-muted-foreground">Shaare Zedek Medical Center</div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}