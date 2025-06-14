
import React, { useState, useEffect } from 'react';
import { Search, Filter, GitBranch, Clock, Tag, Users, Zap } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorkflowCard from '@/components/WorkflowCard';
import CategoryFilter from '@/components/CategoryFilter';
import StatsOverview from '@/components/StatsOverview';
import { mockWorkflows } from '@/data/mockWorkflows';
import type { Workflow } from '@/types/workflow';

const Index = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState<Workflow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading workflows (in real app, this would fetch from GitHub API)
    setTimeout(() => {
      setWorkflows(mockWorkflows);
      setFilteredWorkflows(mockWorkflows);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = workflows.filter(workflow => {
      const matchesSearch = 
        workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort workflows
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'complexity':
          const complexityOrder = { 'Simple': 1, 'Medium': 2, 'Complex': 3 };
          return complexityOrder[a.complexity] - complexityOrder[b.complexity];
        default:
          return 0;
      }
    });

    setFilteredWorkflows(filtered);
  }, [workflows, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Loading n8n workflows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  n8n Workflow Hub
                </h1>
                <p className="text-slate-600">Organize and explore your automation workflows</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                <GitBranch className="h-4 w-4 mr-1" />
                Zie619/n8n-workflows
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <StatsOverview workflows={workflows} />

        {/* Filters and Search */}
        <div className="mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search workflows, descriptions, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/80 border-slate-200"
                    />
                  </div>
                </div>
                
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  workflows={workflows}
                />
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-white/80 border-slate-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="date">Recently Modified</SelectItem>
                    <SelectItem value="complexity">Complexity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredWorkflows.length} of {workflows.length} workflows
            {selectedCategory !== 'all' && (
              <Badge variant="outline" className="ml-2 capitalize">
                {selectedCategory}
              </Badge>
            )}
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No workflows found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
