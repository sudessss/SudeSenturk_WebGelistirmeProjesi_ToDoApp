import React, { useState, useMemo, useEffect } from 'react'; // useEffect eklendi
import useLocalStorage from '../hooks/useLocalStorage';
import TaskCard from '../components/TaskCard';
import EditModal from '../components/EditModal';
import ProgressCircle from '../components/ProgressCircle';

const Dashboard = () => {
  const [tasks, setTasks] = useLocalStorage('todo_tasks_v2', []);
  const [activeTab, setActiveTab] = useState('Bugün');
  const [priorityFilter, setPriorityFilter] = useState('Hepsi');
  // Eski satırı bununla değiştir:
const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [editingTask, setEditingTask] = useState(null);
  
  // POP-UP (Toast) State'i
  const [showToast, setShowToast] = useState(false);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Orta");

  const columns = [
    { id: 'todo', title: 'Yapılacaklar', icon: '📋' },
    { id: 'in-progress', title: 'Yapılıyor', icon: '⏳' },
    { id: 'done', title: 'Bitti', icon: '✅' }
  ];

  // Toast mesajını otomatik kapatma
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const visibleTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    return tasks.filter(task => {
      const tabMatch = (activeTab === 'Bugün' && task.dueDate === today) ||
                       (activeTab === 'Yarın' && task.dueDate === tomorrow) ||
                       (activeTab === 'Hepsi');
      const priMatch = priorityFilter === 'Hepsi' || task.priority === priorityFilter;
      return tabMatch && priMatch;
    });
  }, [tasks, activeTab, priorityFilter]);

  const stats = useMemo(() => {
    const total = visibleTasks.length;
    const done = visibleTasks.filter(t => t.status === 'done').length;
    return {
      percentage: total === 0 ? 0 : Math.round((done / total) * 100),
      done,
      total
    };
  }, [visibleTasks]);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      description: newTaskDesc,
      priority: selectedPriority,
      status: 'todo',
      completed: false,
      dueDate: selectedDate
    };
    
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle(""); 
    setNewTaskDesc("");
    
    // Pop-up'ı göster
    setShowToast(true);
  };

  const nextStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const flow = { 'todo': 'in-progress', 'in-progress': 'done', 'done': 'todo' };
        const updatedStatus = flow[t.status];
        return { ...t, status: updatedStatus, completed: updatedStatus === 'done' };
      }
      return t;
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#F4F7FF] p-4 font-sans text-[#1E293B]">
      
      {/* BAŞARI POP-UP (TOAST) */}
      {showToast && (
        <div className="fixed top-10 right-10 z-50 animate-bounce-in">
          <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-400">
            <span className="text-xl">🚀</span>
            <div>
              <p className="font-black text-xs uppercase tracking-wider">Harika!</p>
              <p className="text-[10px] opacity-90">Yeni görev başarıyla eklendi.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        
        {/* ÜST PANEL: FORM VE İLERLEME */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10 items-stretch">
          <div className="lg:w-[65%] bg-white p-8 rounded-[3rem] shadow-xl border border-white">
            <div className="flex justify-between items-start gap-4 mb-2">
              <input 
                value={newTaskTitle} 
                onChange={(e) => setNewTaskTitle(e.target.value)} 
                placeholder="Yeni bir görev ekle..." 
                className="w-full text-lg font-bold outline-none placeholder:text-gray-200" 
              />
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="bg-indigo-50 text-indigo-600 text-[11px] font-black p-2 px-3 rounded-xl border-none outline-none cursor-pointer min-w-[100px] shrink-0" 
              />
            </div>
            <textarea 
              value={newTaskDesc} 
              onChange={(e) => setNewTaskDesc(e.target.value)} 
              placeholder="Açıklama eklemek istiyorsanız buraya yazın" 
              className="w-full text-xs outline-none min-h-[60px] text-gray-400 resize-none font-medium" 
            />
            <div className="flex justify-between items-center border-t pt-4">
              <select 
                value={selectedPriority} 
                onChange={(e) => setSelectedPriority(e.target.value)} 
                className="bg-gray-50 px-3 py-2 rounded-xl text-[9px] font-black outline-none border border-gray-100 cursor-pointer"
              >
                <option value="Yüksek">🔴 YÜKSEK</option>
                <option value="Orta">🟡 ORTA</option>
                <option value="Düşük">🟢 DÜŞÜK</option>
              </select>
              <button 
                onClick={handleAddTask} 
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase hover:scale-105 transition-all shadow-lg shadow-indigo-100"
              >
                Kaydet
              </button>
            </div>
          </div>

          <ProgressCircle 
            percentage={stats.percentage} 
            title={activeTab} 
            completedCount={stats.done} 
            totalCount={stats.total} 
          />
        </div>

        {/* FİLTRELEME NAVİGASYONU */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-[2rem] border border-white shadow-sm">
          <div className="flex gap-2 bg-white/80 p-1 rounded-xl shadow-inner">
            {['Bugün', 'Yarın', 'Hepsi'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-indigo-400'}`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {['Hepsi', 'Yüksek', 'Orta', 'Düşük'].map(p => (
              <button 
                key={p} 
                onClick={() => setPriorityFilter(p)} 
                className={`px-3 py-1.5 rounded-full text-[9px] font-black border transition-all ${priorityFilter === p ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-gray-100 text-gray-400 bg-white/50 hover:border-indigo-200'}`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* KANBAN BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => {
            const colTasks = visibleTasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} className="bg-gray-200/20 p-4 rounded-[3rem] min-h-[500px] flex flex-col border border-transparent hover:border-indigo-50 transition-colors">
                <h2 className="text-[10px] font-black uppercase text-gray-400 mb-6 px-4 flex justify-between items-center">
                  <span>{col.icon} {col.title}</span>
                  <span className="bg-white px-2 py-0.5 rounded-lg text-indigo-600 shadow-sm">{colTasks.length}</span>
                </h2>
                
                <div className="space-y-4">
                  {colTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggle={() => nextStatus(task.id)} 
                      onDelete={() => setTasks(prev => prev.filter(t => t.id !== task.id))} 
                      onEdit={() => setEditingTask(task)} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {editingTask && (
        <EditModal 
          task={editingTask} 
          onSave={(updated) => {
            setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
            setEditingTask(null);
          }} 
          onClose={() => setEditingTask(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;