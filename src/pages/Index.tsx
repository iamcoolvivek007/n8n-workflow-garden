import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CategoryFilter from '@/components/CategoryFilter';
import WorkflowCard from '@/components/WorkflowCard';
import StatsOverview from '@/components/StatsOverview';
import { Workflow } from '../types/workflow';
import { actualWorkflows, categories } from '../data/actualWorkflows';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'nodeCount' | 'lastModified'>('name');

  const filteredWorkflows = actualWorkflows
    .filter(workflow => {
      const matchesCategory = selectedCategory === 'All' || workflow.category === selectedCategory;
      const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nodeCount':
          return b.nodeCount - a.nodeCount;
        case 'lastModified':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const stats = {
    total: actualWorkflows.length,
    active: actualWorkflows.filter(w => w.isActive).length,
    categories: new Set(actualWorkflows.map(w => w.category)).size,
    avgNodes: Math.round(actualWorkflows.reduce((sum, w) => sum + w.nodeCount, 0) / actualWorkflows.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔄 n8n Workflow Organizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover, organize, and manage your n8n automation workflows with ease
          </p>
        </div>

        <StatsOverview stats={stats} />

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search workflows, descriptions, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={sortBy} onValueChange={(value: 'name' | 'nodeCount' | 'lastModified') => setSortBy(value)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="nodeCount">Sort by Complexity</SelectItem>
              <SelectItem value="lastModified">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
