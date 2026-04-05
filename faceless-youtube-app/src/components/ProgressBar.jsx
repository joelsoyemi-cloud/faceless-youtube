import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ progress, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={`${sizeClasses[size]} bg-slate-700 rounded-full overflow-hidden shadow-inner`}>
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </div>
  );
};
