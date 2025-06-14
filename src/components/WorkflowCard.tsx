
import React from 'react';
import { Clock, GitBranch, Zap, User, Tag, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Workflow } from '@/types/workflow';

interface WorkflowCardProps {
  workflow: Workflow;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow }) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Complex':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconClass = "h-4 w-4";
    switch (category) {
      case 'integration':
        return <GitBranch className={iconClass} />;
      case 'automation':
        return <Zap className={iconClass} />;
      default:
        return <Tag className={iconClass} />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'integration': 'bg-blue-100 text-blue-800 border-blue-200',
      'automation': 'bg-purple-100 text-purple-800 border-purple-200',
      'data-processing': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'notification': 'bg-orange-100 text-orange-800 border-orange-200',
      'ai-ml': 'bg-pink-100 text-pink-800 border-pink-200',
      'marketing': 'bg-green-100 text-green-800 border-green-200',
      'crm': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'e-commerce': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'monitoring': 'bg-red-100 text-red-800 border-red-200',
      'social-media': 'bg-violet-100 text-violet-800 border-violet-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(workflow.category)}
            <Badge 
              variant="outline" 
              className={`text-xs capitalize ${getCategoryColor(workflow.category)}`}
            >
              {workflow.category.replace('-', ' ')}
            </Badge>
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs ${getComplexityColor(workflow.complexity)}`}
          >
            {workflow.complexity}
          </Badge>
        </div>
        
        <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
          {workflow.name}
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 line-clamp-2">
          {workflow.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Use Case */}
        <div className="p-3 bg-slate-50/80 rounded-lg">
          <p className="text-sm font-medium text-slate-700 mb-1">Use Case</p>
          <p className="text-sm text-slate-600">{workflow.useCase}</p>
        </div>

        {/* Workflow Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Zap className="h-4 w-4 text-indigo-500" />
            <span>{workflow.nodeCount} nodes</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="h-4 w-4 text-indigo-500" />
            <span>{workflow.estimatedSetupTime}</span>
          </div>
        </div>

        {/* Connectors */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Connectors</p>
          <div className="flex flex-wrap gap-1">
            {workflow.connectors.slice(0, 3).map((connector, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {connector}
              </Badge>
            ))}
            {workflow.connectors.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{workflow.connectors.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Tags</p>
          <div className="flex flex-wrap gap-1">
            {workflow.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {workflow.tags.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{workflow.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <User className="h-3 w-3" />
            <span>{workflow.author}</span>
            <span>•</span>
            <span>v{workflow.version}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
