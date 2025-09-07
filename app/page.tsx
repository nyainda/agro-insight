
"use client";

import { useAuth } from '@/lib/auth';
import { LandingPage } from '@/components/landing/landing-page';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { LiveMetrics } from '@/components/dashboard/live-metrics';
import { AnimalHealthOverview } from '@/components/dashboard/animal-health-overview';
import { RecentActivities } from '@/components/dashboard/recent-activities';
import { WeatherWidget } from '@/components/dashboard/weather-widget';
import { AIInsights } from '@/components/dashboard/ai-insights';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, Calendar, Bell, Leaf, BarChart3, Sparkles, Zap, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '@/lib/data';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { animals, tasks } = useData();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  const urgentTasks = tasks.filter(task => task.priority === 'urgent' && task.status !== 'completed');
  const healthAlerts = animals.filter(animal => animal.healthScore < 70 || animal.status === 'sick');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Premium Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold tracking-tight mb-2">
                  AgroInsight Dashboard
                </h1>
                <p className="text-emerald-100 text-xl">
                  Welcome back! Here's your farm's premium insights for today.
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Farm Performance</p>
                    <p className="text-3xl font-bold">Excellent</p>
                    <p className="text-emerald-200 text-sm">+15% this month</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Productivity Index</p>
                    <p className="text-3xl font-bold">94.2%</p>
                    <p className="text-emerald-200 text-sm">Above target</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">AI Insights</p>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-emerald-200 text-sm">New recommendations</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Alert Cards */}
        {(urgentTasks.length > 0 || healthAlerts.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urgentTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Urgent Tasks</span>
                      <Badge variant="destructive" className="ml-auto">
                        {urgentTasks.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {urgentTasks.slice(0, 3).map((task, index) => (
                        <div key={task.id} className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                          <span className="text-sm font-medium">{task.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {task.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {healthAlerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Card className="border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-red-800 dark:text-red-200">
                      <Bell className="h-5 w-5" />
                      <span>Health Alerts</span>
                      <Badge variant="destructive" className="ml-auto">
                        {healthAlerts.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {healthAlerts.slice(0, 3).map((animal, index) => (
                        <div key={animal.id} className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                          <span className="text-sm font-medium">{animal.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {animal.healthScore}% health
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View Health Records
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        )}

        {/* Statistics Grid */}
        <DashboardStats />

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              <Zap className="h-4 w-4 mr-1" />
              Powered by AI
            </Badge>
          </div>
          <QuickActions />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <LiveMetrics />
            <AnimalHealthOverview />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <WeatherWidget />
            <AIInsights />
            <RecentActivities />
          </div>
        </div>

        {/* Footer Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Farm Operations Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-950/50 rounded-xl flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold">{animals.length}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Animals</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">{tasks.length}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Active Tasks</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-950/50 rounded-xl flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold">98.5%</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-xl flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold">24/7</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Monitoring</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
