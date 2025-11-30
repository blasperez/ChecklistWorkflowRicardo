import React, { useState, useEffect } from 'react';
import { Check, Circle, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
// INICIO BLOQUE FIREBASE
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
// FIN BLOQUE FIREBASE

const PlanDigitalChecklist = () => {
  const initialData = {
    locations: [
      {
        id: 'phq',
        name: 'PH de la Quinta San Carlos',
        expanded: true,
        tasks: [
          { id: 1, text: 'Habilitar screen mirroring para lap top en pantalla sala. Así como desde CEL android y iOS.', completed: false },
          { id: 2, text: 'Habilitar en las 6 pantallas las cuentas de Netflix, HBOMax, Prime,', completed: false },
          { id: 3, text: 'Pantalla cuarto Richo screen mirroring para android Cel y habilitar acceso a cámaras de vigilancia desde el televisor.', completed: false },
          { id: 4, text: 'Habilitar tv terraza para ver partidos y pelis. Conexión con bocinas extras o amplificador o equipo sonido. Todo interconectado.', completed: false },
          { id: 5, text: 'Colocar cámara de vigilancia en balcón cuarto Richo que mire amplio hacia La Quinta y el lago. Se pueda mover.', completed: false },
          { id: 6, text: 'Colocar controles de luz de colores en muros.', completed: false },
          { id: 7, text: 'Instalar el X Box.', completed: false },
          { id: 8, text: 'Arreglar Air wheel aire y que ensamble y cargue corriente. Inflar rueda y arreglar con tape agarradera. Se trata de una rueda eléctrica.', completed: false },
          { id: 9, text: 'Esconder cables de todos los aparatos conectados y fijar bien las televisiones.', completed: false },
          { id: 10, text: 'Configurar las cámaras de vigilancia en Google home en los dos celulares de Richo y TV Richo de PHA y PHQ. (Ubicaciones de las cámaras de vigilancia: vista toda la Terraza, vista hacia el pueblo y montañas, vista sala comedor, vista balcón Richo.)', completed: false },
          { id: 11, text: 'Cotizar y si no es muy caro poner Dimmers en todos los focos de luces directas sala, Richo, Suite.', completed: false },
          { id: 12, text: 'Cargar y ordenar los drones, leer instrucciones y aprender a volar los drones para hacer tomas de video en La Quinta y terrenos.', completed: false },
          { id: 13, text: 'Revisar focos con celdas solares que iluminan las macetas de la terraza.', completed: false },
          { id: 14, text: 'Registrar huellas digitales de las personas de confianza de las dos chapas digitales de acceso a la casa y la terraza para que solo entre quien tenga registro y cambiar clave de acceso.', completed: false },
          { id: 15, text: 'Colocar chapa digital en elevador para tener acceso restringido al PH en lugar de llave que ahora se usa. (Poderlo abrir y cerrar o llamar desde el celular y algún botón fijo en la cocina.)', completed: false },
          { id: 16, text: 'Arreglar bien los reflectores exteriores que iluminan los árboles y programarlos.', completed: false },
          { id: 17, text: 'Revisar Jacuzzi de varias fallas.', completed: false }
        ]
      },
      {
        id: 'pha',
        name: 'PHA Penthouse de Guadalajara',
        expanded: true,
        tasks: [
          { id: 1, text: 'Integrar todas las cámaras internas y externas de los 3 niveles en una sola aplicación o dos, separada por áreas. (Ubicaciones: 2 en la sala principal, 1 en cocina, 1 en la terraza de Américas, 1 entrada puerta principal, 1 lobby elevadores, 1 sala afuera de recámara J\'aime, 1 terraza trasera. 2 planta: 1 cámara pasillo-elevador. Sky lounge: 1 cámara en el interior y 2 cámaras terraza.)', completed: false },
          { id: 3, text: 'Modernizar bloquear y desbloquear acceso restringido elevador. Dejarlo abierto desde el CEL o bien llamarlo solamente. Colocar chapa digital para abrir o cerrar el acceso.', completed: false },
          { id: 4, text: 'Google home para refrigerador y estufa.', completed: false },
          { id: 5, text: 'Revisar calentador solar y el calentador eléctrico auxiliar.', completed: false },
          { id: 6, text: 'Colocar calentadores eléctricos en 3 baños.', completed: false },
          { id: 7, text: 'Revisar equipo de sonido Bose. Alimentar con música por tipo el disco duro del amplificador. Reubicar equipo para zona terraza Américas.', completed: false }
        ]
      },
      {
        id: 'sala-juntas',
        name: 'SALA DE JUNTAS PHA',
        expanded: true,
        tasks: [
          { id: 1, text: 'Habilitar bien el screen mirroring con lap top y celular tanto iOS android Windows, con indicaciones escritas y nombre de cada dispositivo.', completed: false },
          { id: 2, text: 'Guardar dispositivos fijos en mueble y esconder cables, y dejar los que requieren antena afuera bien acomodados y con el nombre escrito pegado en cada aparato. Lo mismo con los dispositivos que se queden en charola.', completed: false },
          { id: 3, text: 'Colocar de manera fija la cámara en la TV para juntas virtuales así como el amplificador de voz que se usa para las juntas virtuales.', completed: false },
          { id: 4, text: 'Colocar y configurar bien el módem, router, no break, servidor, etc poniendo nombre de cada uno, acomodando bien, escondiendo cables, etc. Cotizar y elegir un nuevo nobreak.', completed: false },
          { id: 5, text: 'Habilitar bien sensor de movimiento o calor para iluminar pasillo de entrada a sala de juntas y sala de espera elevador y sala de espera interior.', completed: false },
          { id: 6, text: 'Colocar toma de corriente de debajo de la mesa de juntas.', completed: false },
          { id: 7, text: 'Revisar y reponer sillas giratorias.', completed: false }
        ]
      },
      {
        id: 'sala-principal',
        name: 'SALA PRINCIPAL PHA',
        expanded: true,
        tasks: [
          { id: 1, text: 'Revisar equipo de sonido Bose y conectarlo con la TV de la misma sala. Revisar interfaz bluetooth para transmitir música desde el celular y que se oigan todas las bocinas de la sala y el buffer.', completed: false },
          { id: 2, text: 'Revisar diferentes tipos de iluminación pre programadas en los apagadores de la sala y poner nombres en el apagador.', completed: false },
          { id: 3, text: 'Colocar servi bar.', completed: false }
        ]
      },
      {
        id: 'terraza-americas',
        name: 'TERRAZA AMERICAS',
        expanded: true,
        tasks: [
          { id: 1, text: 'Asesoría luces, equipo de sonido, y efectos especiales para disco.., etc', completed: false }
        ]
      },
      {
        id: 'cuarto-richo',
        name: 'CUARTO RICHO PHA',
        expanded: true,
        tasks: [
          { id: 1, text: 'Habilitar todo el Google home: como encender luces con voz, encender tv, abrir cortinas, música,', completed: false },
          { id: 2, text: 'Meter en la TV todas las aplicaciones que operan cámaras de vigilancia de otros lugares y de la casa.', completed: false },
          { id: 3, text: 'Habilitar lo que falta de streaming como HBO max en la tv', completed: false },
          { id: 4, text: 'Motor a control para abrir u cerrar cortinas.', completed: false }
        ]
      },
      {
        id: 'celular',
        name: 'CELULAR RICHO',
        expanded: true,
        tasks: [
          { id: 1, text: 'Depuración archivos duplicados o triplicados en Google Drive.', completed: false },
          { id: 2, text: 'Aprender uso óptimo cámara y enseñar a Richo a usarla de mejor manera.', completed: false },
          { id: 3, text: 'Aprender a operar en el celular con Gemini integrado y maximizar los comandos de voz para cualquier función como enviar mensajes, correos, hacer llamadas, buscar correos, mensajes o archivos de manera fácil y rápida.', completed: false },
          { id: 4, text: 'Revisar todos los respaldos en la nube.', completed: false },
          { id: 5, text: 'Organizar fotos y vídeos, en Google fotos eliminar fotos que vengan del WhatsApp y solo dejar las fotos y vídeos tomados o subidos.', completed: false },
          { id: 6, text: 'Depurar y antes revisar material de archivos de audio, datos, videos, fotos, etc en otros formatos antiguos.', completed: false },
          { id: 7, text: 'Integrar acceso a cámaras de Grupo Tarahumara en Frigo Elote y Lechuga.', completed: false },
          { id: 8, text: 'Unificar y organizar en una o dos aplicaciones las cámaras de vigilancia a las que tengo acceso en diferentes lugares como: Casa Pedro Loza, Quinta San Carlos, Mansión Magnolia, VITRALIA, Frigoríficos Premier, Frigo Prima, Bon\'s Cafe, PH Guadalajara y PH Quinta San Carlos, Depa CDMX', completed: false }
        ]
      },
      {
        id: 'software',
        name: 'APOYO EN SOFTWARE',
        expanded: true,
        tasks: [
          { id: 1, text: 'Presentaciones en Power Point o bien modificación a algunas ya hechas.', completed: false },
          { id: 2, text: 'Excel, elaborar proyecciones o modificaciones a documentos de Excel y enseñar a Richo en algunas funciones que no sé cómo utilizar.', completed: false },
          { id: 3, text: 'Apoyo en uso de IA como Chat GPT y Gemini para algunos trabajos especiales, proyectos, photoshops,', completed: false },
          { id: 4, text: 'Integrar archivos de Google Earth de diferentes terrenos y propiedades con algunas mediciones y características especiales.', completed: false }
        ]
      },
      {
        id: 'cdmx',
        name: 'DEPA CDMX',
        expanded: true,
        tasks: [
          { id: 1, text: 'Poner en la aplicación las dos cámaras existentes.', completed: false },
          { id: 2, text: 'Habilitar las 3 televisiones con todo: screen mirroring, Netflix, youtube, HBOMax, Prime,', completed: false },
          { id: 3, text: 'Controles remotos de luces de color indirectas.', completed: false },
          { id: 4, text: 'Motor cortina recámara y dejar bien todas las cortinas.', completed: false }
        ]
      }
    ]
  };

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Cargar datos desde Firebase Cloud al iniciar
  useEffect(() => {
    loadFromCloud();
  }, []);

  // --- Usar Firestore para el guardado y carga global ---
  const loadFromCloud = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'checklists', 'plan-digital-blas');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    } catch (error) {
      console.log('Primera vez usando el checklist en la nube, iniciando con datos frescos');
    } finally {
      setLoading(false);
    }
  };

  const saveToCloud = async (newData) => {
    try {
      setSyncing(true);
      const docRef = doc(db, 'checklists', 'plan-digital-blas');
      await setDoc(docRef, newData);
      setTimeout(() => setSyncing(false), 500);
    } catch (error) {
      console.error('Error al guardar en la nube:', error);
      setSyncing(false);
    }
  };

  const toggleTask = (locationId, taskId) => {
    const newData = {
      locations: data.locations.map(loc =>
        loc.id === locationId
          ? {
            ...loc,
            tasks: loc.tasks.map(task =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            )
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
        loc.id === locationId
          ? { ...loc, expanded: !loc.expanded }
          : loc
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-xl">Cargando checklist...</p>
        </div>
      </div>
    );
  }

  const totalProgress = getTotalProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">PLAN DIGITAL INTEGRAL CON BLAS</h1>
              {syncing && (
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                  <RefreshCw className="animate-spin" size={16} />
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
                <div
                  className="bg-green-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${totalProgress.percentage}%` }}
                />
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
                    onClick={() => toggleLocation(location.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {location.expanded ? (
                          <ChevronDown className="text-blue-600" size={24} />
                        ) : (
                          <ChevronRight className="text-blue-600" size={24} />
                        )}
                        <h2 className="text-2xl font-bold text-slate-800">{location.name}</h2>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-600">
                          {progress.completed}/{progress.total}
                        </span>
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold text-blue-600 w-12 text-right">
                          {progress.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {location.expanded && (
                    <div className="mt-3 ml-4 space-y-2">
                      {location.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-start gap-3 p-4 rounded-lg transition-all cursor-pointer ${task.completed
                            ? 'bg-green-50 border-2 border-green-200'
                            : 'bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-sm'
                            }`}
                          onClick={() => toggleTask(location.id, task.id)}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {task.completed ? (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Check size={16} className="text-white" />
                              </div>
                            ) : (
                              <Circle size={24} className="text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-blue-600 mb-1 block">
                              {task.id}.
                            </span>
                            <p className={`text-slate-700 leading-relaxed ${task.completed ? 'line-through text-slate-500' : ''
                              }`}>
                              {task.text}
                            </p>
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
};

export default PlanDigitalChecklist;