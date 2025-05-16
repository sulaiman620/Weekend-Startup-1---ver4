import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatDate, getCountdown } from '../utils/formatDate';
import { useLanguage } from '../context/LanguageContext';

const Schedule: React.FC = () => {
  // Get language context
  const { t, language, dir } = useLanguage();
  
  // Set specific event dates: October 30 - November 1, 2025
  const eventStartDate = new Date('2025-10-30T00:00:00');
  const eventEndDate = new Date('2025-11-01T00:00:00');
  
  const [countdown, setCountdown] = useState(getCountdown(eventStartDate));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(eventStartDate));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [eventStartDate]);
  
  const scheduleItems = [
    // Day 1
    {
      day: 1,
      date: eventStartDate,
      arabicDate: 'الخميس ٣٠ / ١٠ / ٢٠٢٥',
      events: [
        {
          time: '16:00',
          title: 'التسجيل',
          description: 'تسجيل الحضور واستلام المستندات',
          location: 'القاعة الرئيسية'
        },
        {
          time: '17:00',
          title: 'برنامج الافتتاح',
          description: 'كلمة ترحيبية وتقديم المرشدين ونظرة عامة على البرنامج',
          location: 'المسرح'
        },
        {
          time: '17:30',
          title: 'ورشة تعريفية: كسر الجليد',
          description: 'نشاط تفاعلي للتعارف بين المشاركين',
          location: 'قاعة الورش أ'
        },
        {
          time: '17:45',
          title: 'ورشة صناعة الأفكار الابتكارية',
          description: 'تعلم تقنيات إنشاء أفكار مبتكرة وإبداعية',
          location: 'قاعة الورش أ'
        },
        {
          time: '18:15',
          title: 'ورشة تحليل المشاكل',
          description: 'كيفية تحديد وتحليل المشكلات بطريقة منهجية',
          location: 'قاعة الورش أ'
        },
        {
          time: '18:45',
          title: 'ورشة التفكير التصميمي',
          description: 'استخدام منهجية التفكير التصميمي لحل المشكلات',
          location: 'قاعة الورش أ'
        },
        {
          time: '19:15',
          title: 'عرض الأفكار والتصويت عليها',
          description: 'تقديم الأفكار وتقييمها من قبل المشاركين',
          location: 'المسرح'
        },
        {
          time: '20:15',
          title: 'بناء فرق العمل',
          description: 'تشكيل الفرق حول الأفكار المختارة',
          location: 'القاعة الرئيسية'
        },
        {
          time: '21:00',
          title: 'البدء في العمل',
          description: 'بدء الفرق في العمل على مشاريعهم بدعم المرشدين',
          location: 'مساحات العمل المشتركة'
        }
      ]
    },
    // Day 2
    {
      day: 2,
      date: new Date('2025-10-31T00:00:00'),
      arabicDate: 'الجمعة ٣١ / ١٠ / ٢٠٢٥',
      events: [
        {
          time: '08:00',
          title: 'التسجيل ووجبة الإفطار',
          description: 'بدء اليوم بإفطار وقهوة مع استمرار التسجيل للمشاركين الجدد',
          location: 'منطقة الطعام'
        },
        {
          time: '09:15',
          title: 'عرض برنامج اليوم الثاني',
          description: 'نظرة عامة على أنشطة اليوم الثاني',
          location: 'القاعة الرئيسية'
        },
        {
          time: '09:30',
          title: 'العمل على المشروع التجاري',
          description: 'استمرار الفرق بالعمل على مشاريعهم مع توجيه من المرشدين',
          location: 'مساحات العمل المشتركة'
        },
        {
          time: '13:00',
          title: 'استراحة الغداء',
          description: 'استراحة غداء مع الاستمرار بالعمل',
          location: 'منطقة الطعام'
        },
        {
          time: '14:00',
          title: 'ورشة التقديم',
          description: 'تعلم كيفية إنشاء عرض تقديمي مقنع لمشروعك',
          location: 'قاعة الورش ب'
        },
        {
          time: '15:00',
          title: 'العمل مع الفرق – عرض قصير',
          description: 'استمرار العمل مع تقديم عرض موجز للتقدم المحرز',
          location: 'مساحات العمل المشتركة'
        },
        {
          time: '18:30',
          title: 'عمل الفرق وجلسات التوجيه',
          description: 'الاستمرار بالعمل مع توجيه مكثف من المرشدين',
          location: 'مساحات العمل المشتركة'
        },
        {
          time: '19:30',
          title: 'استراحة العشاء',
          description: 'استراحة عشاء مع الاستمرار بالعمل',
          location: 'منطقة الطعام'
        },
        {
          time: '20:30',
          title: 'استعراض الأعمال لجميع الفرق – عرض قصير',
          description: 'تقديم عرض موجز للتقدم المحرز من جميع الفرق',
          location: 'القاعة الرئيسية'
        }
      ]
    },
    // Day 3
    {
      day: 3,
      date: eventEndDate,
      arabicDate: 'السبت ١ / ١١ / ٢٠٢٥',
      events: [
        {
          time: '09:00',
          title: 'التسجيل ووجبة الإفطار',
          description: 'إفطار اليوم الأخير وقهوة',
          location: 'منطقة الطعام'
        },
        {
          time: '09:15',
          title: 'عرض برنامج اليوم الثالث',
          description: 'نظرة عامة على أنشطة اليوم الأخير',
          location: 'القاعة الرئيسية'
        },
        {
          time: '09:30',
          title: 'العمل على النموذج الأول وجلسات التوجيه',
          description: 'اللمسات الأخيرة على المشاريع والعروض التقديمية',
          location: 'مساحات العمل المشتركة'
        },
        {
          time: '13:00',
          title: 'استراحة الغداء',
          description: 'وجبة الغداء الأخيرة قبل العروض النهائية',
          location: 'منطقة الطعام'
        },
        {
          time: '14:00',
          title: 'التدريب على العرض النهائي',
          description: 'التدرب على العرض النهائي وتلقي ملاحظات',
          location: 'قاعة الورش أ'
        },
        {
          time: '15:00',
          title: 'العروض والتقييم النهائي',
          description: 'تقديم الفرق لمشاريعهم أمام الحكام والجمهور',
          location: 'المسرح'
        },
        {
          time: '17:00',
          title: 'الحفل الختامي وإعلان الفائزين',
          description: 'إعلان الفائزين وتوزيع الجوائز',
          location: 'المسرح'
        }
      ]
    }
  ];
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            جدول ستارت أب ويكند
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            برنامج فعاليات ستارت أب ويكند
          </p>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Event Starts In</h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="bg-indigo-100 rounded-lg p-3 md:p-4">
                    <div className="text-2xl md:text-3xl font-bold text-indigo-700">{item.value}</div>
                    <div className="text-xs md:text-sm mt-1 text-indigo-600">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-700 mb-1" dir="ltr">
                <Calendar className="inline-block mr-2" size={18} />
                {formatDate(eventStartDate)} - {formatDate(eventEndDate)}
              </p>
              <p className="text-gray-700 mb-2 font-bold text-right" dir="rtl">
                <span>الفعالية تبدأ: </span>
                <span className="text-indigo-600">٣٠ / أكتوبر / ٢٠٢٥</span>
              </p>
              <p className="text-gray-700 mt-2">
                <MapPin className="inline-block mr-2" size={18} />
                Sur, Oman
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {scheduleItems.map((day, dayIndex) => (
            <motion.div 
              key={dayIndex}
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={fadeIn}
              >
                <div className="bg-indigo-600 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  {day.day}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Day {day.day}</h2>
                  <p className="text-gray-600">{formatDate(day.date)}</p>
                  <p className="text-gray-600 font-bold text-right" dir="rtl">{day.arabicDate}</p>
                </div>
              </motion.div>
              
              <div className="ml-6 pl-6 border-l-2 border-indigo-200">
                {day.events.map((event, eventIndex) => (
                  <motion.div 
                    key={eventIndex}
                    className="mb-8 relative"
                    variants={fadeIn}
                  >
                    <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-start justify-between mb-2" dir="rtl">
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <div className="flex items-center text-indigo-600 font-medium">
                          <Clock size={16} className="mr-1 ml-1" />
                          {event.time}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 text-right" dir="rtl">{event.description}</p>
                      <div className="flex items-center text-gray-500 text-sm justify-end" dir="rtl">
                        <MapPin size={14} className="mr-1 ml-1" />
                        {event.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;