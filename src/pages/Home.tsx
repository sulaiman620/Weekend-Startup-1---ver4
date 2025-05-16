import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  // Get language context
  const { t, dir } = useLanguage();
  
  // Set specific event dates: October 30 - November 1, 2025
  const eventDate = new Date('2025-10-30T00:00:00');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection eventDate={eventDate.toISOString()} />
      
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4" dir={dir}>
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home_about_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home_about_description')}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: <Calendar size={32} className="text-indigo-600" />,
                title: t('home_feature_idea'),
                description: t('home_feature_idea_desc')
              },
              {
                icon: <Users size={32} className="text-indigo-600" />,
                title: t('home_feature_network'),
                description: t('home_feature_network_desc')
              },
              {
                icon: <Award size={32} className="text-indigo-600" />,
                title: t('home_feature_learn'),
                description: t('home_feature_learn_desc')
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(66, 153, 225, 0.4)"
                }}
              >
                <motion.div 
                  className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4" dir={dir}>
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home_how_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home_how_description')}
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                step: 1,
                title: t('home_step_1'),
                description: t('home_step_1_desc')
              },
              {
                step: 2,
                title: t('home_step_2'),
                description: t('home_step_2_desc')
              },
              {
                step: 3,
                title: t('home_step_3'),
                description: t('home_step_3_desc')
              },
              {
                step: 4,
                title: t('home_step_4'),
                description: t('home_step_4_desc')
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="flex mb-12 relative"
              >
                {index < 3 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-indigo-200"></div>
                )}
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                  {step.step}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/schedule">
              <Button variant="outline" icon={<Calendar size={16} />}>
                View Full Schedule
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Previous Winners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4" dir={dir}>
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home_winners_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home_winners_subtitle')}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                name: t('home_winner_ecotrack'),
                description: t('home_winner_ecotrack_desc'),
                image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                category: 'Environment'
              },
              {
                name: t('home_winner_mealprep'),
                description: t('home_winner_mealprep_desc'),
                image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                category: 'Food Tech'
              },
              {
                name: t('home_winner_studybuddy'),
                description: t('home_winner_studybuddy_desc'),
                image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                category: 'EdTech'
              }
            ].map((winner, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                    {winner.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{winner.name}</h3>
                  <p className="text-gray-600 mb-4">{winner.description}</p>
                  <a 
                    href="#" 
                    className="text-indigo-600 font-medium flex items-center hover:text-indigo-800"
                  >
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4" dir={dir}>
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('home_cta_title')}
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              {t('home_cta_subtitle')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  {t('home_cta_register')}
                </Button>
              </Link>
              <Link to="/submit-idea">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                  {t('home_cta_submit')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4" dir={dir}>
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home_testimonials_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home_testimonials_subtitle')}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                quote: "The WeekendStartupSVC Challenge helped me transform my idea into a viable business. The mentorship was invaluable.",
                name: "Sarah Johnson",
                role: "Founder, EcoTrack",
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                quote: "I met my co-founders during the challenge. Two years later, we've raised our seed round and have thousands of users.",
                name: "Michael Chen",
                role: "CTO, StudyBuddy",
                avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                quote: "The feedback from judges and mentors helped us pivot our business model, which was crucial to our success.",
                name: "Aisha Patel",
                role: "CEO, MealPrep AI",
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4" dir={dir}>
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home_faq_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home_faq_subtitle')}
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                question: "Who can participate in the challenge?",
                answer: "Anyone with an interest in entrepreneurship and innovation can participate. We welcome developers, designers, business professionals, and domain experts of all experience levels."
              },
              {
                question: "Do I need to have a team before registering?",
                answer: "No, you can register as an individual and form a team during the event, or you can register with an existing team."
              },
              {
                question: "What if I don't have a startup idea?",
                answer: "You can join a team with an existing idea that interests you. We'll facilitate team formation at the beginning of the event."
              },
              {
                question: "Is there a registration fee?",
                answer: "The standard registration fee is $50, which covers meals, resources, and materials for the weekend. We offer student discounts and scholarships for those who need financial assistance."
              },
              {
                question: "What should I bring to the event?",
                answer: "Bring your laptop, charger, and any other tools you need for development. We'll provide workspace, internet, meals, and plenty of coffee!"
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="mb-6 border-b border-gray-200 pb-6 last:border-0"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start">
                  <CheckCircle size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-7">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/faq">
              <Button variant="outline">
                {t('home_faq_viewall')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;