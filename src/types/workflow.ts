
export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  nodeCount: number;
  lastModified: string;
  author: string;
  version: string;
  isActive: boolean;
  nodes: any[];
  useCase: string;
  estimatedSetupTime: string;
  connectors: string[];
}

export interface WorkflowStats {
  total: number;
  byCategory: Record<string, number>;
  byComplexity: Record<string, number>;
  totalNodes: number;
  mostUsedConnectors: Array<{ name: string; count: number }>;
}
