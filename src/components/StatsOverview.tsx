
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsOverviewProps {
  total: number;
  active: number;
  categories: number;
  avgNodes: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
  total,
  active,
  categories,
  avgNodes
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{active}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categories}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgNodes}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
