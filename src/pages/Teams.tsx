import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users } from 'lucide-react';
import TeamCard from '../components/TeamCard';
import { useLanguage } from '../context/LanguageContext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projectUrl?: string;
  category: string;
  isWinner?: boolean;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t, dir, language } = useLanguage();
  
  // Mock data for teams
  const mockTeams: Team[] = [
    {
      id: '1',
      name: t('team_ecotrack_name'),
      description: t('team_ecotrack_desc'),
      members: [
        { id: '1', name: t('member_sarah_johnson'), role: t('role_product_manager'), avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '2', name: t('member_david_chen'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '3', name: t('member_emily_rodriguez'), role: t('role_designer'), avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '4', name: t('member_james_wilson'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ],
      projectUrl: 'https://ecotrack.example.com',
      category: t('category_environment'),
      isWinner: true
    },
    {
      id: '2',
      name: t('team_mealprep_ai_name'),
      description: t('team_mealprep_ai_desc'),
      members: [
        { id: '5', name: t('member_aisha_patel'), role: t('role_product_manager'), avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '6', name: t('member_michael_brown'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '7', name: t('member_sophia_kim'), role: t('role_designer'), avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ],
      projectUrl: 'https://mealprep.example.com',
      category: t('category_food_tech')
    },
    {
      id: '3',
      name: t('team_studybuddy_name'),
      description: t('team_studybuddy_desc'),
      members: [
        { id: '8', name: t('member_michael_chen'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '9', name: t('member_jessica_taylor'), role: t('role_product_manager'), avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '10', name: t('member_daniel_martinez'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '11', name: t('member_emma_wilson'), role: t('role_designer'), avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ],
      projectUrl: 'https://studybuddy.example.com',
      category: t('category_edtech'),
      isWinner: true
    },
    {
      id: '4',
      name: t('team_healthtracker_name'),
      description: t('team_healthtracker_desc'),
      members: [
        { id: '12', name: t('member_robert_johnson'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '13', name: t('member_lisa_wang'), role: t('role_product_manager'), avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '14', name: t('member_alex_smith'), role: t('role_designer'), avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ],
      projectUrl: 'https://healthtracker.example.com',
      category: t('category_healthtech')
    },
    {
      id: '5',
      name: t('team_localmarket_name'),
      description: t('team_localmarket_desc'),
      members: [
        { id: '15', name: t('member_thomas_lee'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '16', name: t('member_olivia_garcia'), role: t('role_product_manager'), avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '17', name: t('member_noah_williams'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '18', name: t('member_ava_martinez'), role: t('role_designer'), avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ],
      category: t('category_ecommerce')
    },
    {
      id: '6',
      name: t('team_codementor_name'),
      description: t('team_codementor_desc'),
      members: [
        { id: '19', name: t('member_ethan_brown'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '20', name: t('member_sophia_davis'), role: t('role_product_manager'), avatar: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: '21', name: t('member_liam_johnson'), role: t('role_developer'), avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ],
      projectUrl: 'https://codementor.example.com',
      category: t('category_edtech')
    }
  ];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTeams(mockTeams);
      setFilteredTeams(mockTeams);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    let result = teams;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(team => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(team => team.category === selectedCategory);
    }
    
    setFilteredTeams(result);
  }, [searchTerm, selectedCategory, teams]);
  
  const categories = Array.from(new Set(teams.map(team => team.category)));
  
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
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4" dir={dir}>
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('teams_title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('teams_subtitle')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('teams_search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">{t('teams_all_categories')}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredTeams.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">{t('teams_no_teams_found')}</h3>
            <p className="text-gray-500">
              {t('teams_no_teams_message')}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredTeams.map((team) => (
              <motion.div key={team.id} variants={fadeIn}>
                <TeamCard {...team} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Teams;