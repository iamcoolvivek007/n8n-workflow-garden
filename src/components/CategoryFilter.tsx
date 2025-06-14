
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Workflow } from '@/types/workflow';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  workflows: Workflow[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  workflows
}) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'integration', label: 'Integration' },
    { value: 'automation', label: 'Automation' },
    { value: 'data-processing', label: 'Data Processing' },
    { value: 'notification', label: 'Notification' },
    { value: 'ai-ml', label: 'AI & ML' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'crm', label: 'CRM' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'social-media', label: 'Social Media' },
  ];

  const getCategoryCount = (category: string) => {
    if (category === 'all') return workflows.length;
    return workflows.filter(w => w.category === category).length;
  };

  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[200px] bg-white/80 border-slate-200">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            <div className="flex items-center justify-between w-full">
              <span>{category.label}</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                {getCategoryCount(category.value)}
              </Badge>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
