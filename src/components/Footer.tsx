import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8" dir={dir}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ rotate: 20, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Rocket size={24} className="text-indigo-600 mr-2" />
              </motion.div>
              <span className="font-bold text-xl text-gray-800">WeekendStartupSVC</span>
            </Link>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 text-gray-600 max-w-md"
            >
              {t('hero_subtitle')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex space-x-4"
            >
              <motion.a 
                whileHover={{ y: -3, scale: 1.2 }}
                href="#" 
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.2 }}
                href="#" 
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.2 }}
                href="#" 
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.2 }}
                href="mailto:info@weekendstartupsvc.com" 
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t('nav_home')}</h3>
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">{t('nav_home')}</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/schedule" className="text-gray-600 hover:text-indigo-600 transition-colors">{t('nav_schedule')}</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/teams" className="text-gray-600 hover:text-indigo-600 transition-colors">{t('nav_teams')}</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/submit-idea" className="text-gray-600 hover:text-indigo-600 transition-colors">{t('nav_submit_idea')}</Link>
              </motion.li>
            </motion.ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t('footer_contact')}</h3>
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <li className="text-gray-600">
                <span className="block">Email:</span>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="mailto:info@weekendstartupsvc.com" 
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  info@weekendstartupsvc.com
                </motion.a>
              </li>
              <li className="text-gray-600">
                <span className="block">{t('schedule_location')}</span>
                <span>Sur, Oman</span>
              </li>
              <li className="text-gray-600">
                <span className="block">Follow us:</span>
                <span>@weekendstartupsvc</span>
              </li>
            </motion.ul>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WeekendStartupSVC Challenge. {t('footer_rights')}
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/privacy" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                {t('footer_privacy')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/terms" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                {t('footer_terms')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/contact" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                {t('footer_contact')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;