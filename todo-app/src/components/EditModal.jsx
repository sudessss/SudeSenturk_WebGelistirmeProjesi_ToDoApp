import React, { useState } from 'react';

const EditModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
      priority,
      status,
      dueDate,
      completed: status === 'done'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-8 shadow-2xl border border-white">
        <h2 className="text-xl font-black text-gray-800 mb-6">✏️ Görevi Düzenle</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-1 block">Başlık</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none font-bold text-gray-700" />
          </div>

          {/* TAKVİM */}
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-1 block">Tarih</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-indigo-50/50 border border-indigo-100 rounded-2xl px-5 py-3 outline-none font-bold text-indigo-600 cursor-pointer" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-1 block">Notlar</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none text-xs font-medium text-gray-500 h-20 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-1 block">Öncelik</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-[10px] font-black">
                <option value="Yüksek">🔴 YÜKSEK</option>
                <option value="Orta">🟡 ORTA</option>
                <option value="Düşük">🟢 DÜŞÜK</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-4 mb-1 block">Durum</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-[10px] font-black">
                <option value="todo">📋 YAPILACAK</option>
                <option value="in-progress">⏳ YAPILIYOR</option>
                <option value="done">✅ BİTTİ</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-2xl text-[10px] font-black uppercase">İptal</button>
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100">Güncelle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;