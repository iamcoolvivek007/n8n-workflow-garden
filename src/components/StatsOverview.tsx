
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, GitBranch, Clock, TrendingUp } from 'lucide-react';
import type { Workflow } from '@/types/workflow';

interface StatsOverviewProps {
  workflows: Workflow[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ workflows }) => {
  const totalWorkflows = workflows.length;
  const totalNodes = workflows.reduce((sum, workflow) => sum + workflow.nodeCount, 0);
  const avgNodesPerWorkflow = totalWorkflows > 0 ? Math.round(totalNodes / totalWorkflows) : 0;
  
  const complexityStats = workflows.reduce((acc, workflow) => {
    acc[workflow.complexity] = (acc[workflow.complexity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(
    workflows.reduce((acc, workflow) => {
      acc[workflow.category] = (acc[workflow.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const topConnectors = Object.entries(
    workflows.reduce((acc, workflow) => {
      workflow.connectors.forEach(connector => {
        acc[connector] = (acc[connector] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Workflows */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-indigo-700">Total Workflows</CardTitle>
          <Zap className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-900">{totalWorkflows}</div>
          <p className="text-xs text-indigo-600 mt-1">Ready to automate</p>
        </CardContent>
      </Card>

      {/* Total Nodes */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">Total Nodes</CardTitle>
          <GitBranch className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{totalNodes}</div>
          <p className="text-xs text-purple-600 mt-1">
            Avg {avgNodesPerWorkflow} per workflow
          </p>
        </CardContent>
      </Card>

      {/* Complexity Distribution */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Complexity</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 mb-2">
            {Object.entries(complexityStats).map(([complexity, count]) => (
              <Badge 
                key={complexity} 
                variant="outline" 
                className="text-xs"
              >
                {complexity}: {count}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-green-600">Skill level distribution</p>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">Top Categories</CardTitle>
          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex justify-between text-xs">
                <span className="capitalize text-orange-800">
                  {category.replace('-', ' ')}
                </span>
                <span className="font-medium text-orange-900">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Connectors - Spans full width on larger screens */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 shadow-lg lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Most Used Connectors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topConnectors.map(([connector, count]) => (
              <Badge 
                key={connector} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {connector}
                <span className="bg-slate-600 text-white rounded-full px-1.5 py-0.5 text-xs min-w-[1.25rem] text-center">
                  {count}
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
