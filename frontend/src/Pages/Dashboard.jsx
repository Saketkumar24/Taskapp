import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if token is stored differently
        },
      });

      if (!response.ok) throw new Error('Failed to fetch projects');

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    navigate('/create-project');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Your Projects</h1>
          <button
            onClick={handleAddProject}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">{project.name}</h2>
              <p className="text-gray-600 mb-1">Tasks: {project.tasks.length}</p>
              <p
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${project.tasks.every(t => t.status === 'Completed')
                  ? 'bg-green-100 text-green-700'
                  : project.tasks.some(t => t.status === 'In Progress')
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {
                  project.tasks.every(t => t.status === 'Completed')
                    ? 'Completed'
                    : project.tasks.some(t => t.status === 'In Progress')
                      ? 'In Progress'
                      : 'Pending'
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
