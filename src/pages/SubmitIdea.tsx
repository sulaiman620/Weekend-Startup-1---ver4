import React from 'react';
import IdeaForm from '../components/forms/IdeaForm';
import ProtectedRoute from '../components/ProtectedRoute';

const SubmitIdea: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl px-4">
          <IdeaForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SubmitIdea;