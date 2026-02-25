import React, { useState, useMemo, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import EditModal from '../components/EditModal';
import ProgressCircle from '../components/ProgressCircle';

const Dashboard = () => {
  // ===== STATE YÖNETİMİ =====
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Bugün');
  const [priorityFilter, setPriorityFilter] = useState('Hepsi');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingTask, setEditingTask] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Orta");

  // ===== VERİ YÖNETİMİ (LOCALSTORAGE) =====

  // Sayfa açıldığında verileri yükle
  useEffect(() => {
    const savedTasks = localStorage.getItem('my_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    // Veriler yüklendikten sonra loading'i kapat
    setIsLoading(false);
  }, []);

  // Tasks değiştikçe kaydet
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('my_tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  // ===== YARDIMCI FONKSİYONLAR =====
  const getToday = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };

  const getTomorrow = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const columns = [
    { id: 'todo', title: 'Yapılacaklar', icon: '📋' },
    { id: 'in-progress', title: 'Yapılıyor', icon: '⏳' },
    { id: 'done', title: 'Bitti', icon: '✅' }
  ];

  // ===== FİLTRELEME VE İSTATİSTİK =====
  const visibleTasks = useMemo(() => {
    const today = getToday();
    const tomorrow = getTomorrow();
    return tasks.filter(task => {
      const tabMatch =
        (activeTab === 'Bugün' && task.dueDate === today) ||
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
      percentage: total ? Math.round((done / total) * 100) : 0,
      done,
      total
    };
  }, [visibleTasks]);

  // ===== AKSİYONLAR =====
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
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
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const nextStatus = (task) => {
    const flow = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' };
    setTasks(prev => prev.map(t => 
      t.id === task.id ? { ...t, status: flow[task.status], completed: flow[task.status] === 'done' } : t
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-[#F4F7FF] p-4 font-sans text-[#1E293B]">
      
      {showToast && (
        <div className="fixed top-10 right-10 z-50 animate-bounce">
          <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-indigo-400">
            <p className="font-black text-xs p-2 uppercase tracking-wider">✨ Görev Listeye Eklendi!</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* ÜST PANEL: YENİ GÖREV */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10 items-stretch">
          <div className="lg:w-[65%] bg-white p-8 rounded-[3rem] shadow-xl border border-white relative overflow-hidden">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
              <input
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Neyi planlıyorsun?"
                className="flex-1 min-w-[200px] text-lg font-bold outline-none placeholder:text-gray-200"
              />
              <div className="bg-indigo-50 p-2 px-3 rounded-xl flex flex-col shrink-0">
                <span className="text-[7px] font-black text-indigo-300 uppercase leading-none mb-1">Takvim</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="bg-transparent text-indigo-600 text-[11px] font-black outline-none cursor-pointer"
                />
              </div>
            </div>
            <textarea
              value={newTaskDesc}
              onChange={e => setNewTaskDesc(e.target.value)}
              placeholder="Açıklama ekle..."
              className="w-full text-xs outline-none min-h-[60px] text-gray-400 resize-none font-medium"
            />
            <div className="flex justify-between items-center border-t pt-4">
              <select
                value={selectedPriority}
                onChange={e => setSelectedPriority(e.target.value)}
                className="bg-gray-50 px-3 py-2 rounded-xl text-[9px] font-black outline-none border border-gray-100 cursor-pointer"
              >
                <option value="Yüksek">🔴 YÜKSEK</option>
                <option value="Orta">🟡 ORTA</option>
                <option value="Düşük">🟢 DÜŞÜK</option>
              </select>
              <button
                onClick={handleAddTask}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase hover:scale-105 transition-all shadow-lg"
              >
                Ekle
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

        {/* FİLTRELER */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white/50 p-4 rounded-[2rem] border border-white shadow-sm">
          <div className="flex gap-2 bg-white/80 p-1 rounded-xl">
            {['Bugün', 'Yarın', 'Hepsi'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-indigo-400'}`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* KANBAN BOARD */}
        {isLoading ? (
            <div className="text-center py-20 font-black text-gray-300 uppercase animate-pulse">Yükleniyor...</div>
        ) : tasks.length === 0 ? (
          /* HİÇ GÖREV YOKSA GÖSTERİLECEK ALAN */
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 rounded-[3rem] border-2 border-dashed border-gray-200">
             <span className="text-4xl mb-4">🍃</span>
             <p className="text-gray-400 font-black text-sm uppercase tracking-widest">Henüz plan eklemediniz</p>
             <p className="text-gray-300 text-[10px] mt-1">Yeni bir görev oluşturarak başlayın.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {columns.map(col => {
    const colTasks = visibleTasks.filter(t => t.status === col.id);
    return (
      <div key={col.id} className="bg-gray-200/20 p-4 rounded-[3rem] min-h-[500px] flex flex-col border border-transparent">
        <h2 className="text-[10px] font-black uppercase text-gray-400 mb-6 px-4 flex justify-between items-center">
          <span>{col.icon} {col.title}</span>
          <span className="bg-white px-2 py-0.5 rounded-lg text-indigo-600 shadow-sm">{colTasks.length}</span>
        </h2>
        
        <div className="space-y-4 flex-1">
          {colTasks.length > 0 ? (
            colTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => nextStatus(task)}
                onDelete={() => handleDeleteTask(task.id)}
                onEdit={() => setEditingTask(task)}
              />
            ))
          ) : (
            /* BURASI GÜNCELLENDİ: "İŞLEM YOK" YERİNE DAHA ŞIK BİR TASARIM */
            <div className="flex flex-col items-center justify-center h-full py-10 opacity-40">
              <span className="text-2xl mb-2">✨</span>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter text-center">
                Henüz planlanmış<br/>bir görev yok
              </p>
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>
        )}
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