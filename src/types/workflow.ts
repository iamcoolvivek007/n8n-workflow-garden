
export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: 'integration' | 'automation' | 'data-processing' | 'notification' | 'ai-ml' | 'marketing' | 'crm' | 'e-commerce' | 'monitoring' | 'social-media';
  tags: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  nodeCount: number;
  lastModified: string;
  author: string;
  version: string;
  connectors: string[];
  useCase: string;
  estimatedSetupTime: string;
}

export interface WorkflowStats {
  total: number;
  byCategory: Record<string, number>;
  byComplexity: Record<string, number>;
  totalNodes: number;
  mostUsedConnectors: Array<{ name: string; count: number }>;
}
