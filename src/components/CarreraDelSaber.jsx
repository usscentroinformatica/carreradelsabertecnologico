import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Banco de preguntas básicas de tecnología actual enfocadas en IA para el Centro de Informática de la USS
const preguntasInformatica = [
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
];

// Banco de preguntas básicas de inglés (ahora completamente en inglés)
const preguntasIngles = [
  {
    id: 1,
    pregunta: "What does 'hello' mean?",
    opciones: ["Goodbye", "Greeting", "Thank you", "Sorry"],
    respuestaCorrecta: "Greeting",
    categoria: "Basic Vocabulary"
  },
  {
    id: 2,
    pregunta: "What is the correct plural of 'child'?",
    opciones: ["childs", "children", "childes", "childrens"],
    respuestaCorrecta: "children",
    categoria: "Grammar"
  },
  {
    id: 3,
    pregunta: "What is the opposite of 'big'?",
    opciones: ["Large", "Small", "Tall", "Wide"],
    respuestaCorrecta: "Small",
    categoria: "Vocabulary"
  },
  {
    id: 4,
    pregunta: "How do you spell the color 'red'?",
    opciones: ["Red", "Read", "Redd", "Reid"],
    respuestaCorrecta: "Red",
    categoria: "Spelling"
  },
  {
    id: 5,
    pregunta: "Complete: She _____ to school every day.",
    opciones: ["go", "goes", "going", "gone"],
    respuestaCorrecta: "goes",
    categoria: "Grammar"
  },
  {
    id: 6,
    pregunta: "Complete: I saw ___ elephant.",
    opciones: ["a", "an", "the", "no article"],
    respuestaCorrecta: "an",
    categoria: "Articles"
  },
  {
    id: 7,
    pregunta: "Complete: The book is ___ the table.",
    opciones: ["on", "in", "at", "to"],
    respuestaCorrecta: "on",
    categoria: "Prepositions"
  },
  {
    id: 8,
    pregunta: "Complete: What _____ your name?",
    opciones: ["is", "are", "am", "be"],
    respuestaCorrecta: "is",
    categoria: "Grammar"
  },
  {
    id: 9,
    pregunta: "How do you write 'fifteen' in English?",
    opciones: ["Fifteen", "Fifty", "Fiveteen", "Fiftien"],
    respuestaCorrecta: "Fifteen",
    categoria: "Numbers"
  },
  {
    id: 10,
    pregunta: "What does 'run' mean?",
    opciones: ["Walk slowly", "Run", "Sit down", "Sleep"],
    respuestaCorrecta: "Run",
    categoria: "Basic Vocabulary"
  },
];

// Objeto de traducciones
const translations = {
  es: {
    titlePrefix: "Carrera del Saber",
    titleSuffixInformatica: "Tecnológico",
    titleSuffixIngles: "SpeakLink",
    subtitleInformatica: "Centro de Informática - Universidad Señor de Sipán",
    subtitleIngles: "Centro de Idiomas - Universidad Señor de Sipán",
    descriptionInformatica: "¡Compite respondiendo preguntas de IA y tecnología actual de forma independiente!",
    descriptionIngles: "¡Compite respondiendo preguntas básicas de inglés de forma independiente!",
    tabInformatica: "Informática",
    tabIngles: "Inglés",
    teamLabel: (teamName) => `Nombre del ${teamName}`,
    teamPlaceholder: (teamName) => `Nombre del ${teamName}`,
    roundsLabel: "Número de preguntas por equipo",
    roundsText: (num) => `${num} preguntas`,
    startButton: "¡Comenzar Competencia!",
    pistaTitleInformatica: "Pista de Carrera Tecnológica",
    pistaTitleIngles: "Pista de Carrera en Inglés",
    headerSubtitle: "Rondas independientes",
    roundText: (index, total) => `Ronda ${index + 1} / ${total}`,
    completedTitle: "¡Completado!",
    completedText: "Has respondido todas las preguntas.",
    correctFeedback: "¡Respuesta correcta! +5 pts 🎉",
    incorrectFeedback: (correct) => `¡Respuesta incorrecta! La correcta era: ${correct}`,
    finishedTitle: "¡Competencia Finalizada!",
    winnerLabel: "Ganador:",
    resultsTitle: "Resultados Finales",
    teamHeader: "Equipo",
    pointsHeader: "Puntos",
    newCompetition: "Nueva Competencia",
    footerInformatica: "Carrera del Saber Tecnológico - Centro de Informática USS",
    footerIngles: "Carrera del Saber en Inglés - Centro de Idiomas USS",
    pointsAbbr: "pts"
  },
  en: {
    titlePrefix: "Knowledge Race",
    titleSuffixInformatica: "Technological",
    titleSuffixIngles: "in English",
    subtitleInformatica: "Computer Center - Señor de Sipán University",
    subtitleIngles: "Languages Center - Señor de Sipán University",
    descriptionInformatica: "Compete by answering AI and current technology questions independently!",
    descriptionIngles: "Compete by answering basic English questions independently!",
    tabInformatica: "IT",
    tabIngles: "English",
    teamLabel: (teamName) => `Name for ${teamName}`,
    teamPlaceholder: (teamName) => `Name for ${teamName}`,
    roundsLabel: "Number of questions per team",
    roundsText: (num) => `${num} questions`,
    startButton: "Start Competition!",
    pistaTitleInformatica: "Technological Race Track",
    pistaTitleIngles: "English Race Track",
    headerSubtitle: "Independent Rounds",
    roundText: (index, total) => `Round ${index + 1} / ${total}`,
    completedTitle: "Completed!",
    completedText: "You have answered all questions.",
    correctFeedback: "Correct answer! +5 pts 🎉",
    incorrectFeedback: (correct) => `Incorrect answer! The correct one was: ${correct}`,
    finishedTitle: "Competition Finished!",
    winnerLabel: "Winner:",
    resultsTitle: "Final Results",
    teamHeader: "Team",
    pointsHeader: "Points",
    newCompetition: "New Competition",
    footerInformatica: "Knowledge Race Technological - Computer Center USS",
    footerIngles: "Knowledge Race in English - Languages Center USS",
    pointsAbbr: "pts"
  }
};

// Componente principal
export default function CarreraDelSaber() {
  // Tema seleccionado: 'informatica' o 'ingles'
  const [tema, setTema] = useState('informatica');
  const lang = tema === 'informatica' ? 'es' : 'en';
  const t = translations[lang];
  
  // Preguntas actuales basadas en tema
  const currentPreguntas = tema === 'informatica' ? preguntasInformatica : preguntasIngles;
  
  // Títulos y descripciones dinámicos
  const titleSuffix = tema === 'informatica' ? t.titleSuffixInformatica : t.titleSuffixIngles;
  const subtitle = tema === 'informatica' ? t.subtitleInformatica : t.subtitleIngles;
  const description = tema === 'informatica' ? t.descriptionInformatica : t.descriptionIngles;
  const pistaTitle = tema === 'informatica' ? t.pistaTitleInformatica : t.pistaTitleIngles;
  const footer = tema === 'informatica' ? t.footerInformatica : t.footerIngles;

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
  const [teamRetryCounts, setTeamRetryCounts] = useState({1: 0, 2: 0}); // Nuevo: para forzar re-render en reintentos
  
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
  
  // Finalizar juego comparando puntajes si ambos terminaron
  const finalizarJuego = useCallback(() => {
    if (jugadores[0].puntaje > jugadores[1].puntaje) {
      setGanador(jugadores[0]);
    } else if (jugadores[1].puntaje > jugadores[0].puntaje) {
      setGanador(jugadores[1]);
    } else {
      setGanador({ nombre: lang === 'es' ? "¡Empate!" : "Tie!", color: "bg-gray-500" });
    }
    setEstadoJuego("fin");
  }, [jugadores, lang]);
  
  // Obtener pregunta actual para un equipo
  const getCurrentQuestion = useCallback((teamId) => {
    const idx = teamQuestionIndices[teamId] || 0;
    return idx < totalRondas ? currentPreguntas[idx] : null;
  }, [teamQuestionIndices, totalRondas, currentPreguntas]);
  
  // Avanzar a la siguiente pregunta para un equipo
  const advanceForTeam = useCallback((teamId) => {
    const oldIndex = teamQuestionIndices[teamId] || 0;
    const newIndex = oldIndex + 1;
    
    // Pre-calcular y establecer las opciones barajadas para la nueva pregunta (evita flash de opciones incorrectas)
    if (newIndex < totalRondas) {
      const newOpts = [...currentPreguntas[newIndex].opciones].sort(() => Math.random() - 0.5);
      setTeamShuffledOptions(prev => ({ ...prev, [teamId]: newOpts }));
    } else {
      // Si terminó, establecer como null para evitar mostrar opciones
      setTeamShuffledOptions(prev => ({ ...prev, [teamId]: null }));
    }
    
    // Resetear selección y feedback ANTES de cambiar el índice (garantiza que no se muestre selección residual)
    setTeamSelections(prev => ({ ...prev, [teamId]: null }));
    setTeamFeedbacks(prev => ({ ...prev, [teamId]: '' }));
    
    // Ahora cambiar el índice
    setTeamQuestionIndices(prev => ({ ...prev, [teamId]: newIndex }));
    
    // Actualizar progreso basado en preguntas respondidas correctamente
    setJugadores(prevJugadores => {
      const jugadoresActualizados = [...prevJugadores];
      const indiceJugador = jugadoresActualizados.findIndex(j => j.id === teamId);
      
      if (indiceJugador !== -1) {
        const nuevoProgreso = Math.round((newIndex / totalRondas) * 100);
        jugadoresActualizados[indiceJugador].progreso = nuevoProgreso;
      }
      
      return jugadoresActualizados;
    });
    
    // Verificar si este equipo terminó
    if (newIndex >= totalRondas) {
      const otherId = teamId === 1 ? 2 : 1;
      const otherIndex = teamQuestionIndices[otherId] || 0;
      if (otherIndex < totalRondas) {
        // Este equipo ganó por terminar primero
        const jugadorGanador = jugadores.find(j => j.id === teamId);
        setGanador(jugadorGanador);
        setEstadoJuego("fin");
      } else {
        // Ambos terminaron, comparar puntajes
        finalizarJuego();
      }
    }
  }, [teamQuestionIndices, totalRondas, jugadores, finalizarJuego, currentPreguntas]);
  
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
      const correctMsg = t.correctFeedback;
      setTeamFeedbacks(prev => ({ ...prev, [teamId]: correctMsg }));
      
      setTeamAnimaciones(prev => ({ ...prev, [teamId]: true }));
      setTimeout(() => {
        setTeamAnimaciones(prev => ({ ...prev, [teamId]: false }));
      }, 1000);
      
      // Agregar puntos
      setJugadores(prevJugadores => {
        const jugadoresActualizados = [...prevJugadores];
        const indiceJugador = jugadoresActualizados.findIndex(j => j.id === teamId);
        
        if (indiceJugador !== -1) {
          jugadoresActualizados[indiceJugador].puntaje += 5;
        }
        
        return jugadoresActualizados;
      });
      
      setTimeout(() => {
        advanceForTeam(teamId);
      }, 1500);
    } else {
      const incorrectMsg = t.incorrectFeedback(currentQ.respuestaCorrecta);
      setTeamFeedbacks(prev => ({ 
        ...prev, 
        [teamId]: incorrectMsg 
      }));
      // Después de 3000ms, resetear para reintentar
      setTimeout(() => {
        // Primero resetear selección y feedback
        setTeamSelections(prev => ({ ...prev, [teamId]: null }));
        setTeamFeedbacks(prev => ({ ...prev, [teamId]: '' }));
        
        // Incrementar contador de reintento para forzar re-render
        setTeamRetryCounts(prev => ({ ...prev, [teamId]: (prev[teamId] || 0) + 1 }));
        
        // Pre-barajar para el reintento (evita cualquier flash residual)
        const idx = teamQuestionIndices[teamId];
        if (idx < totalRondas) {
          const opts = [...currentPreguntas[idx].opciones].sort(() => Math.random() - 0.5);
          setTeamShuffledOptions(prev => ({ ...prev, [teamId]: opts }));
        }
      }, 3000);
    }
  }, [advanceForTeam, getCurrentQuestion, teamSelections, teamQuestionIndices, totalRondas, currentPreguntas, t]);
  
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
    setTeamRetryCounts({1: 0, 2: 0}); // Resetear contadores de reintento
    setGanador(null);
    setEstadoJuego("jugando");
  };
  
  // Efecto para barajar opciones cuando cambia el índice de pregunta (ahora solo como fallback, ya que pre-barajamos en advance)
  useEffect(() => {
    Object.keys(teamQuestionIndices).forEach(teamIdStr => {
      const teamId = parseInt(teamIdStr);
      const idx = teamQuestionIndices[teamId];
      if (idx < totalRondas && teamShuffledOptions[teamId] === null) { // Solo si no está pre-barajado
        const opts = [...currentPreguntas[idx].opciones].sort(() => Math.random() - 0.5);
        setTeamShuffledOptions(prev => ({ ...prev, [teamId]: opts }));
      }
    });
  }, [teamQuestionIndices, totalRondas, teamShuffledOptions, currentPreguntas]);
  
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#5a2290] via-[#6b32a3] to-[#63ed12] p-4">
        <div className="text-center p-4 sm:p-6 bg-white bg-opacity-95 rounded-2xl shadow-2xl max-w-md sm:max-w-lg md:max-w-2xl w-full mx-auto">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5a2290] mb-4 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.titlePrefix} <span className="text-[#63ed12]">{titleSuffix}</span>
          </motion.h1>
          
          {/* Tabs para seleccionar tema */}
          <div className="mb-6 sm:mb-8">
            <div className="flex bg-gray-200 rounded-lg overflow-hidden justify-center">
              <button 
                onClick={() => setTema('informatica')}
                className={`px-3 py-2 text-sm font-semibold transition-colors flex-1 ${
                  tema === 'informatica' 
                    ? 'bg-[#5a2290] text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t.tabInformatica}
              </button>
              <button 
                onClick={() => setTema('ingles')}
                className={`px-3 py-2 text-sm font-semibold transition-colors flex-1 ${
                  tema === 'ingles' 
                    ? 'bg-[#5a2290] text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t.tabIngles}
              </button>
            </div>
          </div>
          
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-lg sm:text-xl text-gray-700 mb-2 sm:mb-4">
              {subtitle}
            </p>
            <p className="text-sm sm:text-md text-gray-600 mb-4 sm:mb-6">
              {description}
            </p>
            
            {/* Configuración de equipos */}
            <div className="grid grid-cols-1 gap-4 mb-6 sm:mb-6">
              {jugadores.map(jugador => {
                const styles = teamStyles[jugador.id];
                return (
                  <div key={jugador.id} className="flex flex-col w-full">
                    <label className="text-left text-gray-700 mb-1 text-sm sm:text-base">{t.teamLabel(jugador.nombre)}</label>
                    <input 
                      type="text" 
                      className={`border-2 ${styles.border} rounded-lg px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#63ed12] focus:border-transparent text-sm sm:text-base`}
                      value={jugador.nombre}
                      onChange={(e) => cambiarNombreEquipo(jugador.id, e.target.value)}
                      placeholder={t.teamPlaceholder(jugador.nombre)}
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Configuración de rondas */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-left text-gray-700 mb-1 text-sm sm:text-base">{t.roundsLabel}</label>
              <div className="flex justify-between items-center w-full">
                <button 
                  onClick={() => ajustarRondas(Math.max(5, totalRondas - 5))} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 sm:px-4 rounded-l transition duration-200 text-sm sm:text-base"
                >
                  -
                </button>
                <span className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 font-semibold text-sm sm:text-base">
                  {t.roundsText(totalRondas)}
                </span>
                <button 
                  onClick={() => ajustarRondas(Math.min(10, totalRondas + 5))} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 sm:px-4 rounded-r transition duration-200 text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.button 
            onClick={iniciarJuego}
            className="bg-gradient-to-r from-[#5a2290] to-[#63ed12] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-xl font-bold shadow-lg hover:from-[#4a1a80] hover:to-[#52d200] transform hover:scale-105 transition duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.startButton}
          </motion.button>
        </div>
      </div>
    );
  }
  
  // Pantalla de juego
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5a2290] via-[#6b32a3] to-[#63ed12] p-2 sm:p-4">
      {/* Encabezado */}
      <header className="text-center mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
          {t.titlePrefix} <span className="text-[#63ed12]">{titleSuffix}</span>
        </h1>
        <p className="text-sm sm:text-base text-white/80">
          {subtitle} | {t.headerSubtitle}
        </p>
      </header>
      
      {/* Contenido principal */}
      <div className="max-w-full sm:max-w-4xl md:max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* Pista de carreras */}
        <div className="relative p-2 sm:p-4 md:p-6 bg-gray-800 bg-opacity-80 rounded-t-xl"
             style={{
               backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)',
               backgroundSize: '40px 100%'
             }}>
          <h2 className="text-center text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-4 text-white">
            {pistaTitle}
          </h2>
          
          {jugadores.map((jugador) => {
            const teamStyle = teamStyles[jugador.id];
            
            return (
              <div key={jugador.id} className="mb-4 sm:mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="flex items-center flex-1">
                    <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${jugador.color} mr-1 sm:mr-2`}></span>
                    <span className={`font-medium ${teamStyle.text} text-sm sm:text-base truncate`}>
                      {jugador.nombre}
                    </span>
                  </div>
                  <span className="text-yellow-300 font-bold text-sm sm:text-base ml-2">
                    {jugador.puntaje} {t.pointsAbbr}
                  </span>
                </div>
                
                <div className="h-8 sm:h-10 bg-gray-900 border border-gray-700 rounded-full overflow-hidden relative">
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400 z-10"></div>
                  <div 
                    className={`h-full ${jugador.color} transition-all duration-1000 ease-out`} 
                    style={{ width: `${jugador.progreso}%` }}
                  ></div>
                  <motion.div
                    className="absolute top-0 h-8 sm:h-10 w-10 sm:w-12 flex items-center justify-center"
                    style={{ left: `calc(${jugador.progreso}% - 20px)` }}
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
                      <svg className="w-6 h-6 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" className={teamStyle.icon} />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="p-2 sm:p-4 md:p-6 bg-white">
            <div className="mb-4 sm:mb-6 bg-indigo-50 p-2 sm:p-4 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {jugadores.map((jugador) => {
                  const teamId = jugador.id;
                  const teamStyle = teamStyles[teamId];
                  const index = teamQuestionIndices[teamId] || 0;
                  const currentQ = getCurrentQuestion(teamId);
                  const hasAnswered = teamSelections[teamId] !== null;
                  const shuffledOpciones = teamShuffledOptions[teamId] || currentQ?.opciones || [];
                  const retryKey = teamRetryCounts[teamId] || 0;
                  
                  return (
                    <div key={teamId} className={`p-2 sm:p-4 ${teamStyle.border} border-2 rounded-lg shadow-sm ${index >= totalRondas ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <h4 className={`font-semibold ${teamStyle.text} text-sm sm:text-base`}>
                          {jugador.nombre}
                        </h4>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                          {t.roundText(index, totalRondas)}
                        </span>
                      </div>
                      
                      {index >= totalRondas ? (
                        <div className="text-center py-6 sm:py-8">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{t.completedTitle}</h3>
                          <p className="text-gray-600 text-sm sm:text-base">{t.completedText}</p>
                        </div>
                      ) : (
                        <div key={`${index}-${retryKey}`}> {/* Clave dinámica con retry para forzar re-render en reintentos */}
                          
                          <div className="flex items-center mb-2 sm:mb-3">
                            <span className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-medium rounded-full">
                              {currentQ.categoria}
                            </span>
                          </div>
                          
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4 leading-relaxed">
                            {currentQ.pregunta}
                          </h3>
                          
                          <div className="grid grid-cols-1 gap-2 sm:gap-3">
                            {shuffledOpciones.map((opcion, idx) => {
                              const isSelected = teamSelections[teamId] === opcion;
                              const isCorrect = opcion === currentQ.respuestaCorrecta;
                              
                              let btnClass = 'p-2 sm:p-3 rounded-lg text-left transition-all transform hover:scale-102 border-2 w-full font-medium text-sm sm:text-base focus:outline-none active:outline-none [-webkit-tap-highlight-color:transparent]'; // Agregadas clases para mobile
                              
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
                                  key={idx}
                                  onClick={() => seleccionarRespuesta(teamId, opcion)}
                                  disabled={hasAnswered}
                                  className={btnClass}
                                >
                                  <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {opcion}
                                </button>
                              );
                            })}
                          </div>
                          
                          {teamFeedbacks[teamId] && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`mt-2 sm:mt-4 p-2 sm:p-3 rounded-lg text-center font-medium text-sm sm:text-base ${
                                teamFeedbacks[teamId].includes(lang === 'es' ? 'correcta' : 'correct')
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              {teamFeedbacks[teamId]}
                            </motion.div>
                          )}
                        </div>
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
          <div className="p-4 sm:p-6 bg-white">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-4 sm:p-6 bg-gradient-to-r from-[#63ed12]/10 to-[#5a2290]/10 rounded-lg shadow-inner border border-[#63ed12]/20"
            >
              <h2 className="text-xl sm:text-3xl font-bold text-[#5a2290] mb-2 sm:mb-4">
                {t.finishedTitle}
              </h2>
              {ganador && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mb-4 sm:mb-6"
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
                    className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full ${ganador.color || 'bg-gray-500'} flex items-center justify-center text-white text-3xl sm:text-5xl font-bold shadow-lg`}
                  >
                    🏆
                  </motion.div>
                </motion.div>
              )}
              
              <p className="text-lg sm:text-2xl font-semibold text-[#5a2290] mb-2">
                {t.winnerLabel} {ganador ? ganador.nombre : ''}
              </p>
              
              <div className="mt-4 sm:mt-6 mb-4 sm:mb-6 bg-white rounded-lg p-2 sm:p-4 shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 text-center">{t.resultsTitle}</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t.teamHeader}</th>
                      <th className="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t.pointsHeader}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jugadores.map(jugador => {
                      const isWinner = ganador && jugador.nombre === ganador.nombre;
                      return (
                        <tr key={jugador.id} className={isWinner ? "bg-[#63ed12]/10" : ""}>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-left">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 sm:w-4 sm:h-4 ${jugador.color} rounded-full mr-1 sm:mr-2`}></div>
                              <span className={`font-medium ${isWinner ? "text-[#63ed12]" : "text-gray-700"} text-sm sm:text-base`}>
                                {jugador.nombre}
                              </span>
                              {isWinner && <span className="ml-1 sm:ml-2 text-[#63ed12]">👑</span>}
                            </div>
                          </td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-right text-lg sm:text-lg font-bold text-gray-700">
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
                className="bg-gradient-to-r from-[#5a2290] to-[#63ed12] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-bold shadow-lg hover:from-[#4a1a80] hover:to-[#52d200] transform hover:scale-105 transition duration-300 w-full sm:w-auto"
              >
                {t.newCompetition}
              </button>
            </motion.div>
          </div>
        )}
        
        {/* Pie de página */}
        <footer className="p-2 sm:p-3 bg-gradient-to-r from-[#5a2290] to-[#63ed12] text-white text-center text-xs sm:text-sm">
          {footer}
        </footer>
      </div>
    </div>
  );
}
