"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Heart, Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '@/lib/data';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'health-excellent';
    case 'sick': return 'health-critical';
    case 'pregnant': return 'health-good';
    case 'quarantine': return 'health-warning';
    default: return 'health-good';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'healthy': return CheckCircle;
    case 'sick': return AlertTriangle;
    case 'pregnant': return TrendingUp;
    case 'quarantine': return AlertTriangle;
    default: return Activity;
  }
};

export function AnimalHealthOverview() {
  const { animals } = useData();

  // Show first 4 animals for the overview
  const displayAnimals = animals.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="glass border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Animal Health Overview</span>
            <Badge variant="secondary" className="ml-auto">
              Live Monitoring
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {displayAnimals.length > 0 ? (
              displayAnimals.map((animal, index) => {
                const StatusIcon = getStatusIcon(animal.status);
                return (
                  <motion.div
                    key={animal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={animal.image} alt={animal.name} />
                      <AvatarFallback>{animal.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {animal.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {animal.species} • {animal.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`h-4 w-4 ${getStatusColor(animal.status).replace('bg-', 'text-').replace('border-', 'text-').split(' ')[0]}`} />
                            <span className="font-semibold text-lg">
                              {animal.healthScore}%
                            </span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(animal.status)} text-xs`}
                          >
                            {animal.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Progress 
                          value={animal.healthScore} 
                          className="h-2"
                        />
                      </div>
                      
                      {animal.status !== 'healthy' && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge 
                            variant="destructive" 
                            className="text-xs flex items-center space-x-1"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            <span>
                              {animal.status === 'sick' ? 'Requires attention' :
                               animal.status === 'pregnant' ? 'Expecting' :
                               animal.status === 'quarantine' ? 'In quarantine' : 'Monitor closely'}
                            </span>
                          </Badge>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No Animals Yet</h3>
                <p className="text-sm">Add your first animal to start monitoring health data</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFarmAnimals } from '@/lib/data';

export function AnimalHealthOverview() {
  const animals = useFarmAnimals();

  const healthyAnimals = animals.filter(animal => animal.status === 'healthy').length;
  const sickAnimals = animals.filter(animal => animal.status === 'sick').length;
  const pregnantAnimals = animals.filter(animal => animal.status === 'pregnant').length;
  const treatmentAnimals = animals.filter(animal => animal.status === 'treatment').length;

  const averageHealthScore = animals.length > 0 
    ? Math.round(animals.reduce((sum, animal) => sum + animal.healthScore, 0) / animals.length)
    : 0;

  const healthStats = [
    {
      label: 'Healthy',
      count: healthyAnimals,
      percentage: animals.length > 0 ? Math.round((healthyAnimals / animals.length) * 100) : 0,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-950/50',
      icon: CheckCircle,
    },
    {
      label: 'Sick',
      count: sickAnimals,
      percentage: animals.length > 0 ? Math.round((sickAnimals / animals.length) * 100) : 0,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-950/50',
      icon: AlertTriangle,
    },
    {
      label: 'Pregnant',
      count: pregnantAnimals,
      percentage: animals.length > 0 ? Math.round((pregnantAnimals / animals.length) * 100) : 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-950/50',
      icon: Heart,
    },
    {
      label: 'Treatment',
      count: treatmentAnimals,
      percentage: animals.length > 0 ? Math.round((treatmentAnimals / animals.length) * 100) : 0,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-950/50',
      icon: Activity,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="glass border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Animal Health Overview</span>
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300">
              {averageHealthScore}% Avg Health
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Health Score */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-900 dark:text-green-100">Overall Health Score</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="space-y-2">
              <Progress value={averageHealthScore} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-green-700 dark:text-green-300">Excellent Health</span>
                <span className="font-semibold text-green-600">{averageHealthScore}%</span>
              </div>
            </div>
          </div>

          {/* Health Statistics */}
          <div className="grid grid-cols-2 gap-4">
            {healthStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`p-4 rounded-lg ${stat.bgColor} border border-gray-200/50 dark:border-gray-700/50`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.count}
                        </span>
                        <span className={`text-sm font-medium ${stat.color}`}>
                          {stat.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Health Alerts */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white">Recent Health Alerts</h4>
            <div className="space-y-2">
              {animals
                .filter(animal => animal.healthScore < 80)
                .slice(0, 3)
                .map((animal, index) => (
                  <motion.div
                    key={animal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {animal.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Health Score: {animal.healthScore}%
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={animal.healthScore < 60 ? 'text-red-600 border-red-300' : 'text-orange-600 border-orange-300'}
                    >
                      {animal.healthScore < 60 ? 'Critical' : 'Warning'}
                    </Badge>
                  </motion.div>
                ))}
              
              {animals.filter(animal => animal.healthScore < 80).length === 0 && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>All animals are in good health!</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
