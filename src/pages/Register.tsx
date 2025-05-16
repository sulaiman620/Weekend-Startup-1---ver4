import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl px-4">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;