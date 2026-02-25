import React from 'react';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
const isDone = task.status === 'done';

  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 group hover:shadow-md transition-all mb-4">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${
          task.priority === 'Yüksek' ? 'bg-red-50 text-red-500' : 
          task.priority === 'Orta' ? 'bg-yellow-50 text-yellow-500' : 'bg-green-50 text-green-500'
        }`}>
          {task.priority}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1 hover:text-indigo-600 transition-colors">✏️</button>
          <button onClick={onDelete} className="p-1 hover:text-red-600 transition-colors">🗑️</button>
        </div>
      </div>

      <h3 className={`text-sm font-bold mb-1 transition-all ${isDone ? 'line-through text-gray-400 opacity-60' : 'text-gray-800'}`}>
        {task.title}
      </h3>
      
      <p className="text-[10px] text-gray-400 line-clamp-2 mb-4 font-medium leading-relaxed">
        {task.description}
      </p>
      
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">📅 {task.dueDate}</span>
        <button 
          onClick={onToggle}
          title="Sonraki Aşamaya Taşı"
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isDone ? 'bg-green-500 text-white rotate-[360deg]' : 'bg-gray-100 text-gray-400 hover:bg-indigo-100 hover:text-indigo-600'
          }`}
        >
          {isDone ? '✓' : '→'}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;