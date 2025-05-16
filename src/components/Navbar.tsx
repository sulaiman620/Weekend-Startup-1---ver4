import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, LogIn, UserCircle, Globe } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_schedule'), path: '/schedule' },
    { name: t('nav_teams'), path: '/teams' },
    { name: t('nav_submit_idea'), path: '/submit-idea' },
  ];

  const authLinks = isAuthenticated
    ? [
        { name: t('nav_dashboard'), path: '/dashboard' },
        { name: t('nav_profile'), path: '/profile' },
        ...(user?.role === 'admin' ? [{ name: t('nav_admin'), path: '/admin' }] : []),
      ]
    : [
        { name: t('nav_login'), path: '/login' },
        { name: t('nav_register'), path: '/register' },
      ];

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket size={28} className={`${scrolled ? 'text-indigo-600' : 'text-white'} mr-2`} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}
            >
              WeekendStartupSVC
            </motion.span>
          </Link>

          {/* Desktop Navigation */}            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    location.pathname === link.path
                      ? 'text-indigo-600'
                      : scrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-5 w-px bg-gray-300"></div>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className={`flex items-center text-sm font-medium transition-colors hover:text-indigo-600 language-switch ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 20 }}
                  className="language-switch-icon"
                >
                  <Globe size={16} className="mr-1" />
                </motion.div>
                <span>{t('language_switch')}</span>
              </button>

              <div className="h-5 w-px bg-gray-300"></div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                      location.pathname === link.path
                        ? 'text-indigo-600'
                        : scrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logout()}
                  className="ml-2"
                >
                  {t('nav_logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" icon={<LogIn size={16} />}>
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" icon={<UserCircle size={16} />}>
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-600 focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base font-medium px-2 py-1 rounded-md ${
                      location.pathname === link.path
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="h-px w-full bg-gray-200 my-2"></div>

                {/* Mobile Language Switcher */}
                <motion.button
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="flex items-center justify-between text-base font-medium px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100 language-switch w-full"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: 20 }}
                      className="language-switch-icon"
                    >
                      <Globe size={18} className="mr-2" />
                    </motion.div>
                    <span>{t('language_switch')}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: language === 'ar' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                    className="text-indigo-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </motion.div>
                </motion.button>

                <div className="h-px w-full bg-gray-200 my-2"></div>

                {isAuthenticated ? (
                  <>
                    {authLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`text-base font-medium px-2 py-1 rounded-md ${
                          location.pathname === link.path
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => logout()}
                      className="mt-2"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login">
                      <Button variant="outline" className="w-full" icon={<LogIn size={16} />}>
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="primary" className="w-full" icon={<UserCircle size={16} />}>
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;