import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../Button';
import { ideaService } from '../../services/ideaService';
import { useLanguage } from '../../context/LanguageContext';

const IdeaForm: React.FC = () => {
  const { t, dir } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    teamSize: '',
    lookingFor: [],
    pitchDeck: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'Social Impact',
    'Environment', 'Entertainment', 'Productivity', 'AI/ML', 'Other',
  ];

  const teamRoles = [
    'Developers', 'Designers', 'Product Managers', 'Marketing', 'Data Scientists',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (role: string) => {
    const updatedRoles = formData.lookingFor.includes(role)
      ? formData.lookingFor.filter(r => r !== role)
      : [...formData.lookingFor, role];
    
    setFormData({ ...formData, lookingFor: updatedRoles });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setFormData({ ...formData, pitchDeck: file });
        setErrors({ ...errors, pitchDeck: '' });
      } else {
        setErrors({ ...errors, pitchDeck: 'Please upload a PDF file' });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setFormData({ ...formData, pitchDeck: file });
        setErrors({ ...errors, pitchDeck: '' });
      } else {
        setErrors({ ...errors, pitchDeck: 'Please upload a PDF file' });
      }
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.teamSize) {
      newErrors.teamSize = 'Please specify team size';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd upload the pitch deck file to storage
      // and get a URL back to store with the idea
      const pitchDeckUrl = formData.pitchDeck ? '#' : undefined;
      
      await ideaService.createIdea({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        teamSize: parseInt(formData.teamSize),
        lookingFor: formData.lookingFor,
        pitchDeckUrl,
      });
      
      setIsSubmitted(true);
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setErrors({ submit: err.message || 'Failed to submit idea' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center"
        dir={dir}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('idea_submitted_success')}</h2>
        <p className="text-gray-600 mb-6">
          {t('idea_submitted_message')}
        </p>
        <Button
          onClick={() => navigate('/dashboard')}
          className="mx-auto"
        >
          {t('go_to_dashboard')}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
      dir={dir}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Upload size={28} className="text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t('ideas_title')}</h2>
        <p className="text-gray-600 mt-1">{t('ideas_subtitle')}</p>
      </div>

      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-red-50 text-red-800 p-4 rounded-md mb-6 flex items-start"
        >
          <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
          <span>{errors.submit}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            {t('ideas_name')}
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., EcoTrack - Carbon Footprint Tracker"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            {t('ideas_category')}
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">{t('select_category')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            {t('ideas_description')}
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your idea, the problem it solves, and your approach..."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
            Ideal Team Size
          </label>
          <select
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.teamSize ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select team size</option>
            {[2, 3, 4, 5, 6].map((size) => (
              <option key={size} value={size}>
                {size} members
              </option>
            ))}
          </select>
          {errors.teamSize && (
            <p className="mt-1 text-sm text-red-600">{errors.teamSize}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Looking for (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {teamRoles.map((role) => (
              <div key={role} className="flex items-center">
                <input
                  type="checkbox"
                  id={`role-${role}`}
                  checked={formData.lookingFor.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`role-${role}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pitch Deck (Optional)
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50'
                : errors.pitchDeck
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-indigo-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload
              size={36}
              className={`mx-auto mb-4 ${
                isDragging ? 'text-indigo-500' : 'text-gray-400'
              }`}
            />
            <p className="text-sm text-gray-600 mb-2">
              {formData.pitchDeck
                ? `Selected: ${formData.pitchDeck.name}`
                : 'Drag and drop your pitch deck here, or click to browse'}
            </p>
            <p className="text-xs text-gray-500">PDF only, max 10MB</p>
            <input
              type="file"
              id="pitchDeck"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => document.getElementById('pitchDeck')?.click()}
            >
              Browse Files
            </Button>
          </div>
          {errors.pitchDeck && (
            <p className="mt-1 text-sm text-red-600">{errors.pitchDeck}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          {t('ideas_submit')}
        </Button>
      </form>
    </motion.div>
  );
};

export default IdeaForm;