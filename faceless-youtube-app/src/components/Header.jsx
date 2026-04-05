import React from 'react';
import { motion } from 'framer-motion';

export const Header = ({ title, subtitle, completedCount, totalCount, progress }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 md:p-8 border border-slate-700 shadow-lg"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-slate-400 text-xs md:text-sm uppercase tracking-wide mb-1">
                  Progress
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {completedCount}/{totalCount}
                </p>
              </div>
              <div className="w-px h-10 bg-slate-700" />
              <div>
                <p className="text-slate-400 text-xs md:text-sm uppercase tracking-wide mb-1">
                  Completion
                </p>
                <p className="text-2xl md:text-3xl font-bold text-blue-400">
                  {progress}%
                </p>
              </div>
            </div>

            <motion.div
              className="flex-1 sm:flex-none"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: 'right' }}
            >
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
