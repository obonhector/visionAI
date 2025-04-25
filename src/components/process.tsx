import React from 'react';
import { motion } from 'framer-motion';
// Importa iconos para cada paso del proceso
import { FiSearch, FiBox, FiCpu, FiTrendingUp } from 'react-icons/fi'; // Ejemplos

// --- OUR PROCESS SECTION ---

// Define la estructura de datos para cada paso
interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

const processData: ProcessStep[] = [
  {
    icon: FiSearch,
    title: "1. Diagnóstico Estratégico",
    description: "Analizamos a fondo tu negocio, retos y objetivos. Identificamos las oportunidades clave donde la IA puede generar el mayor impacto y valor."
  },
  {
    icon: FiBox, // Icono que sugiere diseño, plano, solución
    title: "2. Diseño IA a Medida",
    description: "Creamos un plan detallado y una hoja de ruta clara. Diseñamos la solución de IA específica para tus necesidades, definiendo alcance, tecnología y métricas de éxito."
  },
  {
    icon: FiCpu, // Icono de procesador, implementación
    title: "3. Implementación Ágil",
    description: "Desarrollamos e integramos la solución de IA en tus sistemas existentes de forma eficiente, minimizando interrupciones y asegurando una transición fluida."
  },
  {
    icon: FiTrendingUp, // Icono de crecimiento, resultados
    title: "4. Impacto y Optimización",
    description: "Monitorizamos los resultados, medimos el impacto real y optimizamos continuamente la solución para maximizar el rendimiento y tu ROI a largo plazo."
  },
];

const ProcessSection: React.FC = () => {

  // Variantes para la animación general de la sección
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  // Variantes para la animación de cada paso individualmente al hacer scroll
  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.section
      id="proceso"
      className="py-24 md:py-32 bg-gradient-to-b from-[#0B0B22] to-[#0e0e2f] text-white overflow-hidden" // Ligera variación de fondo
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Se activa al ver un poco de la sección
    >
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        {/* Headline e Intro */}
        <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.6 }}
           className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-white"
        >
          Nuestro Proceso: Simple, Transparente, Efectivo
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="text-lg md:text-xl text-indigo-200/80 font-light max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          Te guiamos paso a paso en la implementación de IA, asegurando claridad, colaboración y resultados medibles en cada etapa.
        </motion.p>

        {/* Contenedor de la Línea de Tiempo Vertical */}
        <div className="relative max-w-3xl mx-auto">
          {/* La línea vertical de fondo (estática o animada) */}
          <div className="absolute left-6 md:left-8 top-0 h-full w-[2px] bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-transparent pointer-events-none" />
           {/* Podrías animar la altura de esta línea si lo deseas */}

          <div className="space-y-12 md:space-y-16">
            {processData.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex items-start gap-6 md:gap-8"
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} // Cada paso se anima al ser visible
              >
                {/* Marcador (Icono + Círculo) y conexión a la línea */}
                <div className="relative z-10 mt-1">
                   {/* Círculo exterior con glow */}
                   <motion.div
                       className="absolute -inset-2 bg-indigo-600/30 rounded-full blur-md opacity-70"
                       initial={{ scale: 0 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: true, amount: 0.5 }}
                       transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                   />
                   {/* Círculo principal */}
                   <motion.div
                       className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-700 to-purple-700 border-2 border-indigo-400/50 flex items-center justify-center shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                   >
                       <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                   </motion.div>
                </div>

                {/* Contenido del Paso (Título y Descripción) */}
                <motion.div
                    className="flex-1 pt-1"
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, amount: 0.5 }}
                     transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-indigo-200/80 text-base leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProcessSection;