import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, ExternalLink } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface TeamCardProps {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projectUrl?: string;
  category: string;
  isWinner?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  description,
  members,
  projectUrl,
  category,
  isWinner = false,
}) => {
  const { t, dir } = useLanguage();
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
      dir={dir}
    >
      {isWinner && (
        <div className="bg-yellow-500 text-white px-4 py-1 text-sm font-semibold flex items-center justify-center">
          <Award size={16} className="mr-1" />
          {t('winner')}
        </div>
      )}
      
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {category}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-2">{name}</h3>
          </div>
          <div className="bg-indigo-100 p-2 rounded-full">
            <Users size={20} className="text-indigo-600" />
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">{t('team_members')}</h4>
          <div className="flex -space-x-2 overflow-hidden">
            {members.map((member) => (
              <img
                key={member.id}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={member.avatar}
                alt={member.name}
                title={`${member.name} - ${member.role}`}
              />
            ))}
            {members.length > 4 && (
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs font-medium text-gray-800 ring-2 ring-white">
                +{members.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        {projectUrl ? (
          <Button
            variant="outline"
            className="w-full"
            icon={<ExternalLink size={16} />}
            onClick={() => window.open(projectUrl, '_blank')}
          >
            {t('view_project')}
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            {t('project_coming_soon')}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default TeamCard;