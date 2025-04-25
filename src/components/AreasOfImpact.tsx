import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Importa iconos relevantes para cada área
import { FiCpu, FiUsers, FiDatabase, FiTrendingUp, FiSettings } from 'react-icons/fi'; // Ejemplos

// --- AREAS OF IMPACT SECTION ---

// Define la estructura de datos para cada área de impacto
interface ImpactArea {
  id: string;
  icon: React.ElementType;
  title: string; // Título corto para la pestaña/tab
  headline: string; // Título más descriptivo para el contenido
  description: string;
  examples: string[]; // Ejemplos concretos de aplicación
}

const impactAreasData: ImpactArea[] = [
  {
    id: 'operaciones',
    icon: FiSettings, // O FiCpu
    title: 'Operaciones',
    headline: 'Operaciones Optimizadas por IA',
    description: 'Automatizamos y eficientamos tus procesos internos para reducir costos, minimizar errores y liberar tiempo valioso de tu equipo.',
    examples: [
      'Automatización inteligente de tareas repetitivas.',
      'Predicción de demanda y gestión de inventario.',
      'Optimización de rutas y logística (si aplica).',
      'Mantenimiento predictivo de maquinaria.',
    ],
  },
  {
    id: 'clientes',
    icon: FiUsers,
    title: 'Clientes',
    headline: 'Experiencia de Cliente Exponencial',
    description: 'Transforma cómo interactúas con tus clientes, ofreciendo atención personalizada, soporte instantáneo y experiencias memorables.',
    examples: [
      'Chatbots IA para soporte y ventas 24/7.',
      'Personalización avanzada en web, email y apps.',
      'Análisis de sentimiento para entender la satisfacción.',
      'Sistemas de recomendación inteligentes.',
    ],
  },
   {
    id: 'datos',
    icon: FiDatabase,
    title: 'Datos',
    headline: 'Decisiones Estratégicas con Datos',
    description: 'Convierte tus datos brutos en tu activo más valioso. Extraemos insights, patrones y predicciones para una toma de decisiones informada.',
    examples: [
      'Análisis predictivo de ventas y comportamiento.',
      'Dashboards inteligentes y visualizaciones claras.',
      'Identificación de nuevas oportunidades de mercado.',
      'Segmentación avanzada de clientes.',
    ],
  },
  {
    id: 'marketing',
    icon: FiTrendingUp,
    title: 'Marketing',
    headline: 'Marketing y Ventas Inteligentes',
    description: 'Potenciamos tus esfuerzos de marketing y ventas con IA para atraer más leads cualificados, optimizar la inversión y aumentar conversiones.',
    examples: [
      'Optimización de campañas publicitarias (PPC).',
      'Lead scoring y priorización automática.',
      'Generación de contenido asistida por IA.',
      'Email marketing personalizado y automatizado.',
    ],
  },
  // Puedes añadir más áreas si es relevante (Ej: Finanzas, RRHH)
];

const AreasOfImpactSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(impactAreasData[0].id); // Selecciona la primera por defecto

  const currentAreaData = impactAreasData.find(area => area.id === selectedTab);

  // Variantes generales
   const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 }}
  };

  // Variantes para la animación del contenido que cambia
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
  };


  return (
    <motion.section
      id="areas-impacto"
      className="py-24 md:py-32 bg-[#0B0B22] text-white overflow-hidden" // Mismo fondo que la anterior
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        {/* Headline y Subheadline */}
        <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.6 }}
           className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-white"
        >
          IA Aplicada: Impacto Real en Áreas Clave
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="text-lg md:text-xl text-indigo-200/80 font-light max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          Aplicamos nuestra experiencia en IA con precisión quirúrgica donde más importa, transformando desafíos en oportunidades tangibles para tu Pyme.
        </motion.p>

        {/* Layout Principal: Tabs Verticales a la Izquierda + Contenido a la Derecha */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Columna de Tabs Verticales (Desktop) / Acordeón (Mobile - Opcional) */}
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 lg:w-1/4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
             {/* Inspirado en la imagen: Lista clara de áreas */}
            {impactAreasData.map((area) => (
              <motion.button
                key={area.id}
                onClick={() => setSelectedTab(area.id)}
                className={`relative w-full text-left px-5 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  selectedTab === area.id
                    ? 'bg-white/10 border border-indigo-500/50 shadow-lg' // Estilo activo inspirado en alto contraste
                    : 'bg-transparent hover:bg-white/5 border border-transparent'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-3">
                   <area.icon className={`w-5 h-5 shrink-0 ${selectedTab === area.id ? 'text-indigo-300' : 'text-indigo-400/70'}`} />
                   <span className={`font-medium ${selectedTab === area.id ? 'text-white' : 'text-indigo-200/80'}`}>
                       {area.title}
                   </span>
                </span>
                {/* Indicador visual de selección (opcional) */}
                {selectedTab === area.id && (
                     <motion.div
                        layoutId="activeIndicator" // Animación suave entre tabs
                        className="absolute -right-2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full hidden lg:block" // Solo visible en desktop
                      />
                )}
              </motion.button>
            ))}
          </div>

          {/* Columna de Contenido Dinámico */}
          <div className="flex-1 min-h-[350px] lg:min-h-[400px]"> {/* Altura mínima para evitar saltos */}
             {/* Inspirado en la imagen: Área de contenido clara y enfocada */}
            <AnimatePresence mode="wait"> {/* 'wait' para esperar que salga antes de entrar */}
              <motion.div
                key={selectedTab} // Clave para que AnimatePresence detecte el cambio
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8 shadow-inner" // Estilo sutil
              >
                {currentAreaData && (
                  <>
                    <div className="flex items-center gap-4 mb-5">
                         <currentAreaData.icon className="w-8 h-8 text-indigo-300 shrink-0"/>
                         <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {currentAreaData.headline}
                         </h3>
                    </div>
                    <p className="text-indigo-200/80 mb-6 leading-relaxed">
                      {currentAreaData.description}
                    </p>
                    <h4 className="font-semibold text-indigo-100 mb-3">Ejemplos de aplicación:</h4>
                    <ul className="space-y-2 list-inside">
                      {currentAreaData.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-2 text-indigo-200/90 text-sm">
                           <FiTrendingUp className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0"/> {/* O icono genérico */}
                           <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AreasOfImpactSection;