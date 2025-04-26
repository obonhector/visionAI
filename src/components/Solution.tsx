import React from 'react';
import { motion } from 'framer-motion';
// Importa iconos para los puntos clave/diferenciadores
import { FiTarget, FiTrendingUp, FiZap } from 'react-icons/fi'; // Ejemplos

// --- SOLUTION SECTION ---

const SolutionSection: React.FC = () => {

  // Variantes generales para la sección y el texto
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 }, // Animar desde la izquierda
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

   const visualVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 }, // Animar desde un estado escalado/rotado
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 80, damping: 15, mass: 1, delay: 0.5 }
    }
  };

  const pointVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
  }

  return (
    <motion.section
      id="solucion"
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#0e0e2f] via-[#0d0d2a] to-[#0B0B22] text-white overflow-hidden" // Transición suave desde la sección anterior
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Se activa un poco antes al hacer scroll
    >
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Columna de Texto */}
          <motion.div variants={sectionVariants}> {/* Aplica stagger a los hijos de esta columna */}
            <motion.h2
              variants={textVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-white" // Mismo estilo de título
            >
              IA a tu Alcance: La Solución Estratégica
            </motion.h2>

            <motion.p
              variants={textVariants}
              className="text-lg md:text-xl text-indigo-200/80 font-light mb-8 leading-relaxed"
            >
              Entendemos los retos únicos de las Pymes. Por eso, no solo ofrecemos tecnología; construimos un puente entre la inteligencia artificial de vanguardia y tus objetivos reales de negocio. Somos tu socio estratégico para implementar IA de forma práctica y medible.
            </motion.p>

            {/* Puntos Clave / Diferenciadores */}
            <motion.div variants={sectionVariants} className="space-y-6 mb-8">
              <motion.div variants={pointVariants} className="flex items-start gap-4">
                <FiZap className="w-6 h-6 text-indigo-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg text-white">Soluciones a Medida</h4>
                  <p className="text-indigo-200/70 text-sm">Diseñamos e implementamos la IA que tu negocio necesita, no soluciones genéricas.</p>
                </div>
              </motion.div>
              <motion.div variants={pointVariants} className="flex items-start gap-4">
                <FiTrendingUp className="w-6 h-6 text-indigo-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg text-white">Enfoque en Resultados (ROI)</h4>
                  <p className="text-indigo-200/70 text-sm">Nos centramos en generar un impacto tangible y un retorno claro de tu inversión.</p>
                </div>
              </motion.div>
               <motion.div variants={pointVariants} className="flex items-start gap-4">
                <FiTarget className="w-6 h-6 text-indigo-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg text-white">Implementación Sencilla</h4>
                  <p className="text-indigo-200/70 text-sm">Te acompañamos en todo el proceso, haciéndolo lo más fluido posible para tu equipo.</p>
                </div>
              </motion.div>
            </motion.div>

             <motion.p
               variants={textVariants} // Reutiliza variante de texto
               className="text-md text-indigo-300/90 italic"
             >
              Descubre a continuación cómo nuestras aplicaciones específicas de IA pueden transformar áreas clave de tu empresa...
            </motion.p>

          </motion.div>

          {/* Columna Visual Abstracta */}
          <motion.div
            variants={visualVariants}
            className="relative w-full h-[300px] md:h-[400px] lg:aspect-square lg:h-auto max-w-md mx-auto lg:max-w-none lg:mx-0" // Ajustado para ser responsive
          >
            {/* Elemento base con gradiente y rotación */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600/50 via-purple-600/40 to-transparent blur-2xl scale-75 md:scale-100"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            {/* Forma interior pulsante */}
            <motion.div
              className="absolute inset-[15%] rounded-full bg-gradient-to-tl from-white/10 to-indigo-400/30 shadow-inner scale-75 md:scale-100"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
             {/* "Núcleo" brillante */}
             <div className="absolute inset-[35%] rounded-full bg-white/80 blur-xl scale-75 md:scale-100" />
             <div className="absolute inset-[38%] rounded-full bg-indigo-300 blur-lg scale-75 md:scale-100" />

             {/* Pequeñas "partículas" orbitando (ajustadas para responsive) */}
             <motion.div 
                className="absolute w-2 h-2 md:w-4 md:h-4 bg-violet-300 rounded-full blur-sm"
                style={{
                  top: '10%',
                  left: '50%',
                  transformOrigin: '50% 400%'
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             />
              <motion.div 
                className="absolute w-2 h-2 md:w-3 md:h-3 bg-indigo-200 rounded-full blur-sm"
                style={{
                  bottom: '20%',
                  right: '15%',
                  transformOrigin: '50% -300%'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 0.5 }}
             />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default SolutionSection;