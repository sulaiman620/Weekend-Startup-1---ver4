import apiClient from './apiClient';

// Mock data for ideas
const MOCK_IDEAS = [
  {
    id: '1',
    title: 'EcoTrack',
    description: 'A mobile app that helps users track and reduce their carbon footprint through daily activities.',
    category: 'Environment',
    teamSize: 4,
    createdBy: '1',
    createdAt: new Date(2023, 2, 15).toISOString(),
    pitchDeckUrl: '#',
  },
  {
    id: '2',
    title: 'MealPrep AI',
    description: 'AI-powered meal planning and grocery shopping assistant that reduces food waste.',
    category: 'Food Tech',
    teamSize: 3,
    createdBy: '2',
    createdAt: new Date(2023, 2, 14).toISOString(),
    pitchDeckUrl: '#',
  },
];

export const ideaService = {
  async getIdeas() {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_IDEAS);
      }, 500);
    });
  },

  async getIdeaById(id: string) {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idea = MOCK_IDEAS.find(idea => idea.id === id);
        if (idea) {
          resolve(idea);
        } else {
          reject(new Error('Idea not found'));
        }
      }, 300);
    });
  },

  async createIdea(ideaData: any) {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newIdea = {
          id: Math.random().toString(36).substr(2, 9),
          ...ideaData,
          createdAt: new Date().toISOString(),
        };
        resolve(newIdea);
      }, 800);
    });
  },

  async updateIdea(id: string, ideaData: any) {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ideaIndex = MOCK_IDEAS.findIndex(idea => idea.id === id);
        if (ideaIndex !== -1) {
          const updatedIdea = {
            ...MOCK_IDEAS[ideaIndex],
            ...ideaData,
          };
          resolve(updatedIdea);
        } else {
          reject(new Error('Idea not found'));
        }
      }, 500);
    });
  },

  async deleteIdea(id: string) {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};