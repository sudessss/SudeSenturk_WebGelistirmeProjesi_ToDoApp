export const categories = [
  { id: 'hepsi', label: 'Hepsi', icon: '🌟' },
  { id: 'okul', label: 'Okul', icon: '📚' },
  { id: 'is', label: 'İş', icon: '💼' },
  { id: 'yemek', label: 'Yemek', icon: '🍲' }
];

export const recurrenceDefaults = {
  type: 'none', // 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: 1, // every N units
  byWeekday: null, // for weekly: [0..6] where 0 = Sunday
  byMonthDay: null, // for monthly: day of month
  until: null // ISO date string or null
};

// Helper to create a normalized task object
export function createTask({ title, description = '', category = 'okul', dueDate = null, recurrence = {} } = {}) {
  const mergedRecurrence = { ...recurrenceDefaults, ...recurrence };
  return {
    id: Date.now(),
    title: title || 'Yeni Görev',
    description,
    category,
    completed: false,
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    recurrence: mergedRecurrence,
    priority: 'normal',
    tags: []
  };
}