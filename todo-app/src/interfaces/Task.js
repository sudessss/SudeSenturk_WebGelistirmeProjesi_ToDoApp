export const categories = [
  { id: 'hepsi', label: 'Hepsi', icon: '🌟' },
  { id: 'okul', label: 'Okul', icon: '📚' },
  { id: 'is', label: 'İş', icon: '💼' },
  { id: 'yemek', label: 'Yemek', icon: '🍲' }
];

export const recurrenceDefaults = {
  type: 'none', 
  interval: 1, 
  byWeekday: null, 
  byMonthDay: null, 
  until: null 
};

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