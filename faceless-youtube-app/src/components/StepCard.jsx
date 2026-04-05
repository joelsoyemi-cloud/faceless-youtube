import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';

export const StepCard = ({
  step,
  isCompleted,
  onToggle,
  isNextStep = false,
  index
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.3 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`rounded-lg border transition-all overflow-hidden ${
        isNextStep
          ? 'border-blue-500 bg-gradient-to-r from-slate-800 to-slate-800 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/30'
          : isCompleted
          ? 'border-slate-600 bg-slate-800/50'
          : 'border-slate-600 bg-slate-800 hover:border-slate-500'
      }`}
    >
      {/* Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 md:px-6 py-4 md:py-5 flex items-start gap-4 text-left hover:bg-slate-700/50 transition-colors"
        whileHover={{ backgroundColor: 'rgba(71, 85, 105, 0.5)' }}
      >
        {/* Checkbox */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`mt-1.5 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${
            isCompleted
              ? 'bg-green-600 border-green-600'
              : isNextStep
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-500 hover:border-slate-400'
          }`}
        >
          {isCompleted && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
          {isNextStep && !isCompleted && (
            <div className="w-2 h-2 rounded-full bg-blue-500" />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
            <h3
              className={`text-base md:text-lg font-semibold transition-all ${
                isCompleted
                  ? 'text-slate-400 line-through'
                  : 'text-white'
              }`}
            >
              {step.title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                isNextStep
                  ? 'bg-blue-500/20 text-blue-300'
                  : isCompleted
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {isCompleted ? '✓ Completed' : isNextStep ? '→ Next' : step.duration}
            </span>
          </div>

          <p className="text-slate-400 text-sm mb-3">
            {step.description}
          </p>

          {/* Category Badge and Progress */}
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300">
              {step.category}
            </span>
          </div>
        </div>

        {/* Expand Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 flex-shrink-0 ml-2"
        >
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden border-t border-slate-700"
          >
            <div className="px-5 md:px-6 py-4 md:py-5 space-y-4 bg-slate-800/50">
              {/* Details List */}
              {step.details && step.details.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-3">
                    Step Details:
                  </h4>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-slate-300 text-sm"
                      >
                        <span className="text-blue-400 font-bold mt-0.5">
                          {idx + 1}.
                        </span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips */}
              {step.tips && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 md:p-4">
                  <p className="text-sm text-blue-200">
                    <span className="font-semibold">💡 Pro Tip:</span> {step.tips}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
