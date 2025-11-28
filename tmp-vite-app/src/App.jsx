import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCNsx_lDzNZz4-XXNBCL3l9LvzTKvN8N0c",
  authDomain: "spotifylyricstranslator.firebaseapp.com",
  projectId: "spotifylyricstranslator",
  storageBucket: "spotifylyricstranslator.firebasestorage.app",
  messagingSenderId: "459157844682",
  appId: "1:459157844682:web:5f2adf8d72f0e622bffa33"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initialData = {
  locations: [
    { id: 'phq', name: 'PH de la Quinta San Carlos', expanded: true, tasks: [
      { id: 1, text: 'Habilitar screen mirroring para lap top en pantalla sala. Así como desde CEL android y iOS.', completed: false },
      // ... Puedes agregar todas las tareas aquí (recorta por ejemplo)
    ] },
    // ... más ubicaciones
  ]
};

function App() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => { loadFromCloud(); }, []);

  const loadFromCloud = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'checklists', 'plan-digital-blas');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setData(docSnap.data());
    } finally {
      setLoading(false);
    }
  };

  const saveToCloud = async (newData) => {
    try {
      setSyncing(true);
      const docRef = doc(db, 'checklists', 'plan-digital-blas');
      await setDoc(docRef, newData);
    } finally {
      setTimeout(() => setSyncing(false), 500);
    }
  };

  const toggleTask = (locationId, taskId) => {
    const newData = {
      locations: data.locations.map(loc =>
        loc.id === locationId
          ? {
            ...loc, tasks: loc.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task)
          }
          : loc
      )
    };
    setData(newData);
    saveToCloud(newData);
  };

  const toggleLocation = (locationId) => {
    const newData = {
      locations: data.locations.map(loc =>
        loc.id === locationId ? { ...loc, expanded: !loc.expanded } : loc
      )
    };
    setData(newData);
    saveToCloud(newData);
  };

  const getProgress = (location) => {
    const completed = location.tasks.filter(t => t.completed).length;
    const total = location.tasks.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const getTotalProgress = () => {
    const allTasks = data.locations.flatMap(loc => loc.tasks);
    const completed = allTasks.filter(t => t.completed).length;
    const total = allTasks.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  if (loading) {
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>Cargando checklist...</div>;
  }

  const totalProgress = getTotalProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">PLAN DIGITAL INTEGRAL CON BLAS</h1>
              {syncing && (
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                  <span className="animate-spin">⏳</span>
                  <span className="text-sm">Guardando...</span>
                </div>
              )}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progreso Total</span>
                <span className="text-sm font-bold">{totalProgress.completed}/{totalProgress.total} tareas</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-green-400 h-3 rounded-full transition-all duration-500" style={{ width: `${totalProgress.percentage}%` }} />
              </div>
              <div className="text-right mt-1">
                <span className="text-2xl font-bold">{totalProgress.percentage}%</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {data.locations.map((location) => {
              const progress = getProgress(location);
              return (
                <div key={location.id} className="mb-6 last:mb-0">
                  <div
                    className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
                    onClick={() => toggleLocation(location.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-600">{location.expanded ? '▼' : '▶'}</span>
                        <h2 className="text-2xl font-bold text-slate-800">{location.name}</h2>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-600">{progress.completed}/{progress.total}</span>
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress.percentage}%` }} />
                        </div>
                        <span className="text-lg font-bold text-blue-600 w-12 text-right">{progress.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  {location.expanded && (
                    <div className="mt-3 ml-4 space-y-2">
                      {location.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-start gap-3 p-4 rounded-lg transition-all cursor-pointer ${task.completed ? 'bg-green-50 border-2 border-green-200' : 'bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}
                          onClick={() => toggleTask(location.id, task.id)}>
                          <div className="flex-shrink-0 mt-0.5">
                            {task.completed ? (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">✔</div>
                            ) : (
                              <span className="text-slate-400" style={{fontSize:24,lineHeight:'24px'}}>○</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-blue-600 mb-1 block">{task.id}.</span>
                            <p className={`text-slate-700 leading-relaxed ${task.completed ? 'line-through text-slate-500' : ''}`}>{task.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 text-center text-white/70 text-sm space-y-2">
          <p>✅ El progreso se guarda automáticamente en la nube</p>
          <p>🌐 Todos ven el mismo progreso compartido</p>
        </div>
      </div>
    </div>
  );
}

export default App;
