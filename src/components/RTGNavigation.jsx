import React from 'react';

import { useState, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { ProjectManager } from '../data/projectManager';

const RTGNavigation = ({ currentLevel, onLevelChange }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    // Initialize project system
    ProjectManager.initialize();
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = ProjectManager.getProjects();
    const currentProjectId = ProjectManager.getCurrentProject();
    const current = ProjectManager.getProject(currentProjectId);
    
    setProjects(allProjects);
    setCurrentProject(current);
  };

  const handleProjectSwitch = (projectId) => {
    ProjectManager.setCurrentProject(projectId);
    setShowProjectDropdown(false);
    // Reload the page to refresh all data with new project context
    window.location.reload();
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      const newProject = ProjectManager.createProject(newProjectName.trim());
      ProjectManager.setCurrentProject(newProject.id);
      setNewProjectName('');
      setShowNewProjectModal(false);
      // Reload to switch to new project
      window.location.reload();
    }
  };

  const levels = [
    { id: 'whiteboard', label: 'L0 Whiteboard', description: 'Free-form problem mapping' },
    { id: 'program-board', label: 'L1 Program Board', description: 'Functional deliverables by streams' },
    { id: 'tracks', label: 'L2 Monitoring', description: 'Concurrent execution with target dates' },
    { id: 'schedule', label: 'Schedule', description: 'Timeline view of streams and tracks' },
    { id: 'program-view', label: 'Executive View', description: 'Comprehensive Snapshot' }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">RTG</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RTG Aligned Execution</h1>
                <p className="text-xs text-gray-500">FastLynk Software</p>
              </div>
            </div>

            {/* Project Selector */}
            <div className="relative ml-8">
              <button
                onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{currentProject?.name || 'Select Project'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showProjectDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => handleProjectSwitch(project.id)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          currentProject?.id === project.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{project.name}</div>
                        {project.description && (
                          <div className="text-xs text-gray-500">{project.description}</div>
                        )}
                      </button>
                    ))}
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setShowProjectDropdown(false);
                        setShowNewProjectModal(true);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Project</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex items-center">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="flex space-x-8 overflow-x-auto">
          {levels.map((level) => {
            const isActive = currentLevel === level.id;
            
            return (
              <button
                key={level.id}
                onClick={() => onLevelChange(level.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition duration-200 ${
                  isActive
                    ? 'border-blue-400 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{level.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCreateProject}
                  disabled={!newProjectName.trim()}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Project
                </button>
                <button
                  onClick={() => {
                    setShowNewProjectModal(false);
                    setNewProjectName('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RTGNavigation;

