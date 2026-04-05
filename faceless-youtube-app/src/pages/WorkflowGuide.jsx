import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { StepCard } from '../components/StepCard';
import { SearchBar } from '../components/SearchBar';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { WORKFLOW_STEPS, CATEGORIES } from '../data/steps';
import {
  filterSteps,
  filterByCategory,
  calculateProgress,
  getNextIncompleteStep
} from '../utils/helpers';

export const WorkflowGuide = () => {
  const [completedSteps, setCompletedSteps] = useLocalStorage('completedSteps', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandAll, setExpandAll] = useState(false);

  // Filter steps based on search and category
  const filteredSteps = useMemo(() => {
    let filtered = filterSteps(WORKFLOW_STEPS, searchQuery);
    filtered = filterByCategory(filtered, selectedCategory);
    return filtered;
  }, [searchQuery, selectedCategory]);

  // Calculate progress
  const progress = calculateProgress(completedSteps, WORKFLOW_STEPS.length);
  const nextStep = getNextIncompleteStep(WORKFLOW_STEPS, completedSteps);

  // Toggle step completion
  const handleToggleStep = useCallback((stepId) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  }, [setCompletedSteps]);

  // Expand/Collapse all functionality
  const handleExpandAll = useCallback(() => {
    setExpandAll(!expandAll);
  }, [expandAll]);

  // Reset progress
  const handleResetProgress = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      setCompletedSteps([]);
    }
  }, [setCompletedSteps]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <Header
          title="YouTube Automation Workflow"
          subtitle="Complete guide to building a faceless YouTube channel with AI automation"
          completedCount={completedSteps.length}
          totalCount={WORKFLOW_STEPS.length}
          progress={progress}
        />

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6 flex flex-col sm:flex-row gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExpandAll}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 border border-slate-600 text-slate-200 rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all font-medium text-sm"
          >
            {expandAll ? '⬆ Collapse All' : '⬇ Expand All'}
          </motion.button>

          {completedSteps.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetProgress}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 border border-red-600/30 text-red-300 rounded-lg hover:bg-red-600/10 hover:border-red-600 transition-all font-medium text-sm"
            >
              ↻ Reset Progress
            </motion.button>
          )}
        </motion.div>

        {/* Search and Filter */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
        />

        {/* Steps List */}
        <motion.div
          layout
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSteps.length > 0 ? (
              filteredSteps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  isCompleted={completedSteps.includes(step.id)}
                  onToggle={() => handleToggleStep(step.id)}
                  isNextStep={nextStep?.id === step.id}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-slate-400 text-lg">
                  No steps found matching your search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Completion Message */}
        {completedSteps.length === WORKFLOW_STEPS.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="mt-8 p-6 md:p-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg text-center"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              🎉
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-green-300 mt-3 mb-2">
              Congratulations!
            </h3>
            <p className="text-green-200/80">
              You've completed all the steps in the YouTube automation workflow.
              Time to launch your channel and start growing!
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm"
        >
          <p>Built with React, Tailwind CSS, and Framer Motion</p>
        </motion.footer>
      </div>
    </div>
  );
};
