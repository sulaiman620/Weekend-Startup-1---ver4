import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, Calendar, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import ProtectedRoute from '../components/ProtectedRoute';
import useAuth from '../hooks/useAuth';
import { ideaService } from '../services/ideaService';
import { formatDate, formatRelativeTime } from '../utils/formatDate';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  teamSize: number;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ideas');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setIsLoading(true);
        const response = await ideaService.getIdeas();
        setIdeas(response as Idea[]);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchIdeas();
  }, []);
  
  const handleDeleteIdea = async (id: string) => {
    try {
      await ideaService.deleteIdea(id);
      setIdeas(ideas.filter(idea => idea.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-gradient-to-br from-indigo-600 to-purple-600 md:w-48 flex items-center justify-center p-8">
                  <img
                    className="h-24 w-24 rounded-full border-4 border-white/30 object-cover"
                    src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    alt={user?.name}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                    <Link to="/profile">
                      <Button variant="outline" size="sm" icon={<Edit size={16} />}>
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-full mr-4">
                          <Lightbulb size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">My Ideas</h3>
                          <p className="text-2xl font-bold text-gray-900">{ideas.length}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-full mr-4">
                          <Users size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">My Teams</h3>
                          <p className="text-2xl font-bold text-gray-900">2</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-full mr-4">
                          <Calendar size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Next Event</h3>
                          <p className="text-lg font-bold text-gray-900">In 30 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'ideas'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('ideas')}
                  >
                    My Ideas
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'teams'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('teams')}
                  >
                    My Teams
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'ideas' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">My Ideas</h2>
                      <Link to="/submit-idea">
                        <Button size="sm" icon={<Plus size={16} />}>
                          Submit New Idea
                        </Button>
                      </Link>
                    </div>
                    
                    {isLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
                      </div>
                    ) : ideas.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Lightbulb size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No ideas yet</h3>
                        <p className="text-gray-500 mb-6">
                          You haven't submitted any ideas yet. Ready to share your startup concept?
                        </p>
                        <Link to="/submit-idea">
                          <Button icon={<Plus size={16} />}>
                            Submit Your First Idea
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Idea
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Team Size
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Submitted
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {ideas.map((idea) => (
                                <motion.tr key={idea.id} variants={fadeIn}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <Lightbulb size={20} className="text-indigo-600" />
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{idea.title}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1">{idea.description}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                      {idea.category}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {idea.teamSize} members
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="text-sm text-gray-900">{formatDate(idea.createdAt)}</div>
                                    <div className="text-sm text-gray-500">{formatRelativeTime(idea.createdAt)}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {deleteConfirm === idea.id ? (
                                      <div className="flex items-center justify-end space-x-2">
                                        <span className="text-gray-700 mr-2">Confirm?</span>
                                        <button
                                          onClick={() => handleDeleteIdea(idea.id)}
                                          className="text-red-600 hover:text-red-800"
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => setDeleteConfirm(null)}
                                          className="text-gray-600 hover:text-gray-800"
                                        >
                                          No
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-end space-x-3">
                                        <button
                                          className="text-indigo-600 hover:text-indigo-800"
                                          onClick={() => {}}
                                        >
                                          <Edit size={16} />
                                        </button>
                                        <button
                                          className="text-red-600 hover:text-red-800"
                                          onClick={() => setDeleteConfirm(idea.id)}
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
                
                {activeTab === 'teams' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">My Teams</h2>
                      <Link to="/teams">
                        <Button size="sm" icon={<Users size={16} />}>
                          Browse Teams
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle size={24} className="text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            Team formation will be available when the event starts. Stay tuned!
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Users size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No teams yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't joined any teams yet. Teams will be formed during the event.
                      </p>
                      <Link to="/teams">
                        <Button variant="outline" icon={<Users size={16} />}>
                          Browse Existing Teams
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;