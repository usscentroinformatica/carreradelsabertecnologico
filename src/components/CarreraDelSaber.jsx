import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Banco de preguntas básicas de tecnología actual enfocadas en IA para el Centro de Informática de la USS
const preguntas = [
  {
    id: 1,
    pregunta: "¿Qué significa IA?",
    opciones: ["Inteligencia Analítica", "Inteligencia Artificial", "Información Avanzada", "Ingeniería Automática"],
    respuestaCorrecta: "Inteligencia Artificial",
    categoria: "IA Básica"
  },
  {
    id: 2,
    pregunta: "¿Qué es Machine Learning?",
    opciones: ["Una forma de programación", "Un subconjunto de la IA que aprende de datos", "Un lenguaje de programación", "Un tipo de hardware"],
    respuestaCorrecta: "Un subconjunto de la IA que aprende de datos",
    categoria: "IA Básica"
  },
  {
    id: 3,
    pregunta: "¿Qué es ChatGPT?",
    opciones: ["Un robot físico", "Un modelo de lenguaje de IA de OpenAI", "Un software de edición", "Un navegador web"],
    respuestaCorrecta: "Un modelo de lenguaje de IA de OpenAI",
    categoria: "IA Actual"
  },
  {
    id: 4,
    pregunta: "¿Qué es una Red Neuronal?",
    opciones: ["Una red social", "Un modelo inspirado en el cerebro humano", "Un tipo de cable", "Un virus"],
    respuestaCorrecta: "Un modelo inspirado en el cerebro humano",
    categoria: "IA Básica"
  },
  {
    id: 5,
    pregunta: "¿Qué es Big Data?",
    opciones: ["Datos pequeños", "Grandes volúmenes de datos para análisis", "Un tipo de archivo", "Un lenguaje"],
    respuestaCorrecta: "Grandes volúmenes de datos para análisis",
    categoria: "Tecnología Actual"
  },
  {
    id: 6,
    pregunta: "¿Qué es Cloud Computing?",
    opciones: ["Un tipo de nube meteorológica", "Computación en la nube", "Un juego", "Un dispositivo"],
    respuestaCorrecta: "Computación en la nube",
    categoria: "Tecnología Actual"
  },
  {
    id: 7,
    pregunta: "¿Qué es 5G?",
    opciones: ["Un videojuego", "Quinta generación de redes móviles", "Un tipo de batería", "Un lenguaje"],
    respuestaCorrecta: "Quinta generación de redes móviles",
    categoria: "Tecnología Actual"
  },
  {
    id: 8,
    pregunta: "¿Qué es Blockchain?",
    opciones: ["Un tipo de bloque de construcción", "Una cadena de bloques descentralizada", "Un juego", "Un software"],
    respuestaCorrecta: "Una cadena de bloques descentralizada",
    categoria: "Tecnología Actual"
  },
  {
    id: 9,
    pregunta: "¿Qué significa VR?",
    opciones: ["Video Registro", "Realidad Virtual", "Vista Remota", "Vehículo Robótico"],
    respuestaCorrecta: "Realidad Virtual",
    categoria: "Tecnología Actual"
  },
  {
    id: 10,
    pregunta: "¿Qué es Bitcoin?",
    opciones: ["Un tipo de moneda física", "Una criptomoneda", "Un lenguaje", "Un sitio web"],
    respuestaCorrecta: "Una criptomoneda",
    categoria: "Tecnología Actual"
  },
  {
    id: 11,
    pregunta: "¿Qué es IoT?",
    opciones: ["Input Output Terminal", "Internet of Things", "International Organization of Technology", "Internet Online Tool"],
    respuestaCorrecta: "Internet of Things",
    categoria: "Tecnología Actual"
  },
  {
    id: 12,
    pregunta: "¿Qué es una API?",
    opciones: ["Advanced Programming Instruction", "Application Programming Interface", "Automated Process Integration", "Application Performance Index"],
    respuestaCorrecta: "Application Programming Interface",
    categoria: "Programación"
  },
  {
    id: 13,
    pregunta: "¿Por qué es Python popular en IA?",
    opciones: ["Es el más rápido", "Es fácil de aprender", "Es el lenguaje oficial de IA", "No lo es"],
    respuestaCorrecta: "Es fácil de aprender",
    categoria: "Programación IA"
  },
  {
    id: 14,
    pregunta: "¿Qué es Deep Learning?",
    opciones: ["Aprendizaje superficial", "Aprendizaje profundo, subconjunto de ML", "Un tipo de hardware", "Un juego"],
    respuestaCorrecta: "Aprendizaje profundo, subconjunto de ML",
    categoria: "IA Avanzada"
  },
  {
    id: 15,
    pregunta: "¿Quién fundó OpenAI?",
    opciones: ["Sam Altman", "Elon Musk y otros", "Sundar Pichai", "Tim Cook"],
    respuestaCorrecta: "Elon Musk y otros",
    categoria: "IA Actual"
  },
  {
    id: 16,
    pregunta: "¿Qué significa GPT?",
    opciones: ["General Purpose Tool", "Generative Pre-trained Transformer", "Global Programming Technology", "Graphics Processing Tool"],
    respuestaCorrecta: "Generative Pre-trained Transformer",
    categoria: "IA Actual"
  },
  {
    id: 17,
    pregunta: "¿Qué es un chatbot?",
    opciones: ["Un robot físico", "Un programa que simula conversación humana", "Un tipo de base de datos", "Un antivirus"],
    respuestaCorrecta: "Un programa que simula conversación humana",
    categoria: "IA Básica"
  },
  {
    id: 18,
    pregunta: "¿Qué es overfitting en ML?",
    opciones: ["El modelo no aprende", "El modelo aprende demasiado el ruido de los datos", "Un tipo de hardware", "Un lenguaje"],
    respuestaCorrecta: "El modelo aprende demasiado el ruido de los datos",
    categoria: "IA Avanzada"
  },
  {
    id: 19,
    pregunta: "¿Qué es un dataset?",
    opciones: ["Un tipo de archivo", "Conjunto de datos", "Un software", "Un hardware"],
    respuestaCorrecta: "Conjunto de datos",
    categoria: "IA Básica"
  },
  {
    id: 20,
    pregunta: "¿Qué es TensorFlow?",
    opciones: ["Un tipo de tensor matemático", "Una biblioteca de ML de Google", "Un juego", "Un sitio web"],
    respuestaCorrecta: "Una biblioteca de ML de Google",
    categoria: "Herramientas IA"
  },
  {
    id: 21,
    pregunta: "¿Qué es Supervised Learning?",
    opciones: ["Aprendizaje sin supervisión", "Aprendizaje con datos etiquetados", "Un tipo de hardware", "Un lenguaje"],
    respuestaCorrecta: "Aprendizaje con datos etiquetados",
    categoria: "IA Básica"
  },
  {
    id: 22,
    pregunta: "¿Qué es Unsupervised Learning?",
    opciones: ["Aprendizaje supervisado", "Aprendizaje sin datos etiquetados", "Un tipo de red", "Un dataset"],
    respuestaCorrecta: "Aprendizaje sin datos etiquetados",
    categoria: "IA Básica"
  },
  {
    id: 23,
    pregunta: "¿Qué es Reinforcement Learning?",
    opciones: ["Unsupervised", "Aprendizaje por refuerzo, mediante recompensas", "Aprendizaje supervisado", "Deep learning"],
    respuestaCorrecta: "Aprendizaje por refuerzo, mediante recompensas",
    categoria: "IA Avanzada"
  },
  {
    id: 24,
    pregunta: "¿Qué es GAN?",
    opciones: ["Global AI Network", "Generative Adversarial Network", "Graphics Animation Node", "General Access Network"],
    respuestaCorrecta: "Generative Adversarial Network",
    categoria: "IA Avanzada"
  },
  {
    id: 25,
    pregunta: "¿Qué es la ética en IA?",
    opciones: ["Un tipo de algoritmo", "Estudio de implicaciones morales de la IA", "Un hardware", "Un dataset"],
    respuestaCorrecta: "Estudio de implicaciones morales de la IA",
    categoria: "Ética IA"
  },
  {
    id: 26,
    pregunta: "¿Qué es bias en IA?",
    opciones: ["Un tipo de peso", "Sesgo en los datos que afecta el modelo", "Un algoritmo", "Un lenguaje"],
    respuestaCorrecta: "Sesgo en los datos que afecta el modelo",
    categoria: "Ética IA"
  },
  {
    id: 27,
    pregunta: "¿Para qué se usa 5G?",
    opciones: ["IA", "Mejor conectividad y velocidad", "Blockchain", "VR"],
    respuestaCorrecta: "Mejor conectividad y velocidad",
    categoria: "Tecnología Actual"
  },
  {
    id: 28,
    pregunta: "¿Qué es el Metaverso?",
    opciones: ["Un meta universo físico", "Un mundo virtual persistente", "Un juego", "Un sitio web"],
    respuestaCorrecta: "Un mundo virtual persistente",
    categoria: "Tecnología Actual"
  },
  {
    id: 29,
    pregunta: "¿Qué es NFT?",
    opciones: ["New File Type", "Non-Fungible Token", "Network Function Tool", "Non-Functional Test"],
    respuestaCorrecta: "Non-Fungible Token",
    categoria: "Tecnología Actual"
  },
  {
    id: 30,
    pregunta: "¿Qué es Quantum Computing?",
    opciones: ["Computación clásica rápida", "Computación usando qubits", "Un tipo de IA", "Un blockchain"],
    respuestaCorrecta: "Computación usando qubits",
    categoria: "Tecnología Futura"
  },
];

// Componente principal
export default function CarreraDelSaber() {
  // Referencias para sonidos
  const correctSoundRef = useRef(null);
  const incorrectSoundRef = useRef(null);

  // Estados del juego
  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: "Equipo 1", progreso: 0, color: "bg-[#63ed12]", puntaje: 0 },
    { id: 2, nombre: "Equipo 2", progreso: 0, color: "bg-[#5a2290]", puntaje: 0 }
  ]);
  
  const [estadoJuego, setEstadoJuego] = useState("inicio"); // inicio, jugando, fin
  const [ganador, setGanador] = useState(null);
  const [totalRondas, setTotalRondas] = useState(10); // Número de preguntas por equipo
  
  // Estados independientes por equipo
  const [teamQuestionIndices, setTeamQuestionIndices] = useState({1: 0, 2: 0});
  const [teamSelections, setTeamSelections] = useState({1: null, 2: null});
  const [teamFeedbacks, setTeamFeedbacks] = useState({1: '', 2: ''});
  const [teamAnimaciones, setTeamAnimaciones] = useState({1: false, 2: false});
  const [teamShuffledOptions, setTeamShuffledOptions] = useState({1: null, 2: null});
  
  // Colores de equipos para clases dinámicas
  const teamStyles = {
    1: {
      bg: 'bg-[#63ed12]',
      hover: 'hover:bg-[#52d200]',
      text: 'text-[#63ed12]',
      border: 'border-[#63ed12]',
      icon: 'text-[#63ed12]'
    },
    2: {
      bg: 'bg-[#5a2290]',
      hover: 'hover:bg-[#4a1a80]',
      text: 'text-[#5a2290]',
      border: 'border-[#5a2290]',
      icon: 'text-[#5a2290]'
    }
  };
  
  // Obtener pregunta actual para un equipo
  const getCurrentQuestion = useCallback((teamId) => {
    const idx = teamQuestionIndices[teamId] || 0;
    return idx < totalRondas ? preguntas[idx] : null;
  }, [teamQuestionIndices, totalRondas]);
  
  // Avanzar a la siguiente pregunta para un equipo
  const advanceForTeam = useCallback((teamId) => {
    const oldIndex = teamQuestionIndices[teamId] || 0;
    const newIndex = oldIndex + 1;
    
    setTeamQuestionIndices(prev => ({ ...prev, [teamId]: newIndex }));
    setTeamSelections(prev => ({ ...prev, [teamId]: null }));
    setTeamFeedbacks(prev => ({ ...prev, [teamId]: '' }));
    
    // Actualizar progreso basado en preguntas respondidas
    setJugadores(prevJugadores => {
      const jugadoresActualizados = [...prevJugadores];
      const indiceJugador = jugadoresActualizados.findIndex(j => j.id === teamId);
      
      if (indiceJugador !== -1) {
        const nuevoProgreso = Math.round((newIndex / totalRondas) * 100);
        jugadoresActualizados[indiceJugador].progreso = nuevoProgreso;
      }
      
      return jugadoresActualizados;
    });
  }, [teamQuestionIndices, totalRondas]);
  
  // Manejar selección de respuesta
  const seleccionarRespuesta = useCallback((teamId, opcion) => {
    const hasAnswered = teamSelections[teamId] !== null;
    if (hasAnswered) return;
    
    setTeamSelections(prev => ({ ...prev, [teamId]: opcion }));
    
    const currentQ = getCurrentQuestion(teamId);
    const esCorrecta = opcion === currentQ.respuestaCorrecta;
    
    // Sonido
    if (esCorrecta && correctSoundRef.current) {
      correctSoundRef.current.play().catch(e => console.log("Error:", e));
    } else if (!esCorrecta && incorrectSoundRef.current) {
      incorrectSoundRef.current.play().catch(e => console.log("Error:", e));
    }
    
    if (esCorrecta) {
      setTeamFeedbacks(prev => ({ ...prev, [teamId]: "¡Respuesta correcta! +10 pts 🎉" }));
      
      setTeamAnimaciones(prev => ({ ...prev, [teamId]: true }));
      setTimeout(() => {
        setTeamAnimaciones(prev => ({ ...prev, [teamId]: false }));
      }, 1000);
      
      // Agregar puntos
      setJugadores(prevJugadores => {
        const jugadoresActualizados = [...prevJugadores];
        const indiceJugador = jugadoresActualizados.findIndex(j => j.id === teamId);
        
        if (indiceJugador !== -1) {
          jugadoresActualizados[indiceJugador].puntaje += 10;
        }
        
        return jugadoresActualizados;
      });
      
      setTimeout(() => {
        advanceForTeam(teamId);
      }, 1500);
    } else {
      setTeamFeedbacks(prev => ({ 
        ...prev, 
        [teamId]: `¡Respuesta incorrecta! La correcta era: ${currentQ.respuestaCorrecta}` 
      }));
      setTimeout(() => {
        advanceForTeam(teamId);
      }, 3000);
    }
  }, [advanceForTeam, getCurrentQuestion, teamSelections]);
  
  // Finalizar juego comparando puntajes si ambos terminaron
  const finalizarJuego = useCallback(() => {
    if (jugadores[0].puntaje > jugadores[1].puntaje) {
      setGanador(jugadores[0]);
    } else if (jugadores[1].puntaje > jugadores[0].puntaje) {
      setGanador(jugadores[1]);
    } else {
      setGanador({ nombre: "¡Empate!", color: "bg-gray-500" });
    }
    setEstadoJuego("fin");
  }, [jugadores]);
  
  // Ajustar número de rondas (preguntas por equipo)
  const ajustarRondas = (cantidad) => {
    setTotalRondas(cantidad);
  };
  
  // Cambiar nombre de equipo
  const cambiarNombreEquipo = (id, nuevoNombre) => {
    setJugadores(prev => prev.map(jugador => 
      jugador.id === id ? { ...jugador, nombre: nuevoNombre } : jugador
    ));
  };
  
  // Iniciar el juego preservando nombres
  const iniciarJuego = () => {
    setJugadores(prevJugadores => 
      prevJugadores.map(jugador => ({
        ...jugador,
        progreso: 0,
        puntaje: 0
      }))
    );
    setTeamQuestionIndices({1: 0, 2: 0});
    setTeamSelections({1: null, 2: null});
    setTeamFeedbacks({1: '', 2: ''});
    setTeamAnimaciones({1: false, 2: false});
    setTeamShuffledOptions({1: null, 2: null});
    setGanador(null);
    setEstadoJuego("jugando");
  };
  
  // Efecto para barajar opciones cuando cambia el índice de pregunta
  useEffect(() => {
    Object.keys(teamQuestionIndices).forEach(teamIdStr => {
      const teamId = parseInt(teamIdStr);
      const idx = teamQuestionIndices[teamId];
      if (idx < totalRondas) {
        const opts = [...preguntas[idx].opciones].sort(() => Math.random() - 0.5);
        setTeamShuffledOptions(prev => ({ ...prev, [teamId]: opts }));
      }
    });
  }, [teamQuestionIndices, totalRondas]);
  
  // Efecto para verificar fin de juego cuando un equipo completa
  useEffect(() => {
    const index1 = teamQuestionIndices[1] || 0;
    const index2 = teamQuestionIndices[2] || 0;
    if (index1 >= totalRondas && index2 >= totalRondas && estadoJuego === "jugando") {
      finalizarJuego();
    }
  }, [teamQuestionIndices, totalRondas, estadoJuego, finalizarJuego]);
  
  // Efecto para audio
  useEffect(() => {
    if (estadoJuego === "inicio") {
      correctSoundRef.current = new Audio('/correct-sound.mp3');
      incorrectSoundRef.current = new Audio('/incorrect-sound.mp3');
      if (correctSoundRef.current) correctSoundRef.current.load();
      if (incorrectSoundRef.current) incorrectSoundRef.current.load();
    }
  }, [estadoJuego]);
  
  // Pantalla de inicio
  if (estadoJuego === "inicio") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#5a2290] via-[#6b32a3] to-[#63ed12]">
        <div className="text-center p-8 bg-white bg-opacity-95 rounded-2xl shadow-2xl max-w-2xl w-full">
          <motion.h1 
            className="text-5xl font-bold text-[#5a2290] mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Carrera del Saber <span className="text-[#63ed12]">Tecnológico</span>
          </motion.h1>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-xl text-gray-700 mb-4">
              Centro de Informática - Universidad Señor de Sipán
            </p>
            <p className="text-md text-gray-600 mb-6">
              ¡Compite respondiendo preguntas de IA y tecnología actual de forma independiente!
            </p>
            
            {/* Configuración de equipos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {jugadores.map(jugador => {
                const styles = teamStyles[jugador.id];
                return (
                  <div key={jugador.id} className="flex flex-col">
                    <label className="text-left text-gray-700 mb-1">Nombre del {jugador.nombre}</label>
                    <input 
                      type="text" 
                      className={`border-2 ${styles.border} rounded-lg px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#63ed12] focus:border-transparent`}
                      value={jugador.nombre}
                      onChange={(e) => cambiarNombreEquipo(jugador.id, e.target.value)}
                      placeholder={`Nombre del ${jugador.nombre}`}
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Configuración de rondas */}
            <div className="mb-8">
              <label className="block text-left text-gray-700 mb-1">Número de preguntas por equipo</label>
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => ajustarRondas(Math.max(5, totalRondas - 5))} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l transition duration-200"
                >
                  -
                </button>
                <span className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold">
                  {totalRondas} preguntas
                </span>
                <button 
                  onClick={() => ajustarRondas(Math.min(10, totalRondas + 5))} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r transition duration-200"
                >
                  +
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.button 
            onClick={iniciarJuego}
            className="bg-gradient-to-r from-[#5a2290] to-[#63ed12] text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:from-[#4a1a80] hover:to-[#52d200] transform hover:scale-105 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ¡Comenzar Competencia!
          </motion.button>
        </div>
      </div>
    );
  }
  
  // Pantalla de juego
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5a2290] via-[#6b32a3] to-[#63ed12] p-4 sm:p-8">
      {/* Encabezado */}
      <header className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1 drop-shadow-lg">
          Carrera del Saber <span className="text-[#63ed12]">Tecnológico</span>
        </h1>
        <p className="text-lg text-white/80">
          Centro de Informática - USS | Rondas independientes
        </p>
      </header>
      
      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* Pista de carreras */}
        <div className="relative p-4 md:p-6 bg-gray-800 bg-opacity-80 rounded-t-xl"
             style={{
               backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)',
               backgroundSize: '40px 100%'
             }}>
          <h2 className="text-center text-xl font-semibold mb-4 text-white">
            Pista de Carrera Tecnológica
          </h2>
          
          {jugadores.map((jugador) => {
            const teamStyle = teamStyles[jugador.id];
            
            return (
              <div key={jugador.id} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className={`w-5 h-5 rounded-full ${jugador.color} mr-2`}></span>
                    <span className={`font-medium ${teamStyle.text}`}>
                      {jugador.nombre}
                    </span>
                  </div>
                  <span className="text-yellow-300 font-bold">
                    {jugador.puntaje} pts
                  </span>
                </div>
                
                <div className="h-10 bg-gray-900 border border-gray-700 rounded-full overflow-hidden relative">
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400 z-10"></div>
                  <div 
                    className={`h-full ${jugador.color} transition-all duration-1000 ease-out`} 
                    style={{ width: `${jugador.progreso}%` }}
                  ></div>
                  <motion.div
                    className="absolute top-0 h-10 w-12 flex items-center justify-center"
                    style={{ left: `calc(${jugador.progreso}% - 24px)` }}
                    animate={
                      teamAnimaciones[jugador.id]
                        ? { 
                            x: [0, 20, 0], 
                            y: [0, -5, 0],
                            rotate: [0, 5, 0, -5, 0]
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {jugador.id === 1 ? (
                      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" className={teamStyle.icon} />
                      </svg>
                    ) : (
                      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" className={teamStyle.icon} />
                      </svg>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Sección de preguntas independientes */}
        {estadoJuego === "jugando" && (
          <div className="p-4 md:p-6 bg-white">
            <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jugadores.map((jugador) => {
                  const teamId = jugador.id;
                  const teamStyle = teamStyles[teamId];
                  const index = teamQuestionIndices[teamId] || 0;
                  const currentQ = getCurrentQuestion(teamId);
                  const hasAnswered = teamSelections[teamId] !== null;
                  const shuffledOpciones = teamShuffledOptions[teamId] || currentQ?.opciones || [];
                  
                  return (
                    <div key={teamId} className={`p-4 ${teamStyle.border} border-2 rounded-lg shadow-sm ${index >= totalRondas ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className={`font-semibold ${teamStyle.text}`}>
                          {jugador.nombre}
                        </h4>
                        <span className="text-sm font-medium text-gray-600">
                          Ronda {index + 1} / {totalRondas}
                        </span>
                      </div>
                      
                      {index >= totalRondas ? (
                        <div className="text-center py-8">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">¡Completado!</h3>
                          <p className="text-gray-600">Has respondido todas las preguntas.</p>
                        </div>
                      ) : (
                        <>
                          
                          <div className="flex items-center mb-3">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                              {currentQ.categoria}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-800 mb-4">
                            {currentQ.pregunta}
                          </h3>
                          
                          <div className="grid grid-cols-1 gap-3">
                            {shuffledOpciones.map((opcion, index) => {
                              const isSelected = teamSelections[teamId] === opcion;
                              const isCorrect = opcion === currentQ.respuestaCorrecta;
                              
                              let btnClass = 'p-3 rounded-lg text-left transition-all transform hover:scale-102 border-2 w-full font-medium';
                              
                              if (!hasAnswered) {
                                btnClass += ' bg-white border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer';
                              } else {
                                if (isSelected) {
                                  btnClass += isCorrect 
                                    ? ' bg-green-100 border-green-500 text-green-800' 
                                    : ' bg-red-100 border-red-500 text-red-800';
                                } else if (isCorrect) {
                                  btnClass += ' bg-green-100 border-green-500 text-green-800';
                                } else {
                                  btnClass += ' bg-gray-100 border-gray-300 text-gray-500';
                                }
                                btnClass += ' opacity-75 cursor-not-allowed';
                              }
                              
                              return (
                                <button
                                  key={index}
                                  onClick={() => seleccionarRespuesta(teamId, opcion)}
                                  disabled={hasAnswered}
                                  className={btnClass}
                                >
                                  <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {opcion}
                                </button>
                              );
                            })}
                          </div>
                          
                          {teamFeedbacks[teamId] && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`mt-4 p-3 rounded-lg text-center font-medium ${
                                teamFeedbacks[teamId].includes('correcta')
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              {teamFeedbacks[teamId]}
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Pantalla de fin */}
        {estadoJuego === "fin" && (
          <div className="p-6 bg-white">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 bg-gradient-to-r from-[#63ed12]/10 to-[#5a2290]/10 rounded-lg shadow-inner border border-[#63ed12]/20"
            >
              <h2 className="text-3xl font-bold text-[#5a2290] mb-4">
                ¡Competencia Finalizada!
              </h2>
              {ganador && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mb-6"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotateZ: [0, 5, -5, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    className={`w-24 h-24 rounded-full ${ganador.color || 'bg-gray-500'} flex items-center justify-center text-white text-5xl font-bold shadow-lg`}
                  >
                    🏆
                  </motion.div>
                </motion.div>
              )}
              
              <p className="text-2xl font-semibold text-[#5a2290] mb-2">
                Ganador: {ganador ? ganador.nombre : ''}
              </p>
              
              <div className="mt-6 mb-6 bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">Resultados Finales</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jugadores.map(jugador => {
                      const isWinner = ganador && jugador.nombre === ganador.nombre;
                      return (
                        <tr key={jugador.id} className={isWinner ? "bg-[#63ed12]/10" : ""}>
                          <td className="px-6 py-4 whitespace-nowrap text-left">
                            <div className="flex items-center">
                              <div className={`w-4 h-4 ${jugador.color} rounded-full mr-2`}></div>
                              <span className={`font-medium ${isWinner ? "text-[#63ed12]" : "text-gray-700"}`}>
                                {jugador.nombre}
                              </span>
                              {isWinner && <span className="ml-2 text-[#63ed12]">👑</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-gray-700">
                            {jugador.puntaje}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={iniciarJuego}
                className="bg-gradient-to-r from-[#5a2290] to-[#63ed12] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:from-[#4a1a80] hover:to-[#52d200] transform hover:scale-105 transition duration-300"
              >
                Nueva Competencia
              </button>
            </motion.div>
          </div>
        )}
        
        {/* Pie de página */}
        <footer className="p-3 bg-gradient-to-r from-[#5a2290] to-[#63ed12] text-white text-center text-sm">
          Carrera del Saber Tecnológico - Centro de Informática USS
        </footer>
      </div>
    </div>
  );
}