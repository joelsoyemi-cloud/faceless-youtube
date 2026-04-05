/**
 * Filter steps based on search query
 */
export const filterSteps = (steps, searchQuery) => {
  const query = searchQuery.toLowerCase().trim();
  
  if (!query) return steps;
  
  return steps.filter(step =>
    step.title.toLowerCase().includes(query) ||
    step.description.toLowerCase().includes(query) ||
    step.category.toLowerCase().includes(query) ||
    step.details.some(detail => detail.toLowerCase().includes(query))
  );
};

/**
 * Filter steps by category
 */
export const filterByCategory = (steps, category) => {
  if (category === 'All') return steps;
  return steps.filter(step => step.category === category);
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (completedSteps, totalSteps) => {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps.length / totalSteps) * 100);
};

/**
 * Get the next incomplete step
 */
export const getNextIncompleteStep = (steps, completedSteps) => {
  return steps.find(step => !completedSteps.includes(step.id));
};

/**
 * Get all completed steps
 */
export const getCompletedStepsCount = (completedSteps) => {
  return completedSteps.length;
};

/**
 * Format time string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Debounce function for search
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
