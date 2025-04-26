import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

// Lazy load del gráfico (Asegúrate de que la ruta sea correcta)
// Si EnhancedHeroGraph está en el mismo archivo, no necesitas lazy load.
const EnhancedHeroGraph = lazy(() => import('./EnhancedHeroGraph')); // Asume que está en un archivo separado

// Componente de fallback optimizado para la carga
const GraphLoader = () => (
  <div className="w-full h-[300px] max-w-4xl mx-auto bg-indigo-900/10 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-indigo-200 text-opacity-50">Cargando visualización...</div>
  </div>
);

// --- HERO SECTION ---
const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simular carga de recursos o esperar a que elementos críticos carguen
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Short delay for fade-in effect

    return () => clearTimeout(timer);
  }, []);

  // Variantes de animación principal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2 // Delay initial children animation
      }
    }
  };

  // Variantes para elementos de texto y botones
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom cubic bezier for smooth acceleration
      }
    }
  };

  // Variantes específicas para los botones con efectos hover/tap
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.6 // Delay button appearance slightly
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(129, 140, 248, 0.5)", // Indigo glow
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  // Variantes para la animación del gráfico
   const graphVisualVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.7, // Delay graph appearance after text/buttons
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };


  return (
    <div
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0e0e2c] px-4 py-16 sm:p-6" // Adjusted for mobile
    >
      {/* Partículas decorativas flotantes - Reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => ( // Reduced number for mobile
          <div
            key={i}
            className="absolute rounded-full bg-indigo-500/20 blur-xl"
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.2 + 0.1,
              animation: `float-${i % 3} ${Math.random() * 8 + 10}s infinite linear alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh gradient de fondo - Adjusted for mobile */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30 pointer-events-none">
        <div className="absolute top-0 left-[5%] w-[80%] sm:w-[60%] h-[40%] bg-blue-600/30 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[70%] sm:w-[50%] h-[30%] bg-violet-600/30 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute top-[30%] right-[5%] w-[60%] sm:w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      {/* Overlay de ruido sutil */}
      <div
        className="absolute inset-0 bg-repeat pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Efecto de líneas de cuadrícula - Adjusted for mobile */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 grid-rows-6 pointer-events-none">
        {[...Array(72)].map((_, i) => (
          <div
            key={`grid-${i}`}
            className="border-[0.5px] border-white/[0.05]"
          />
        ))}
      </div>

      {/* Anillos decorativos - Adjusted for mobile */}
      <div className="absolute top-[10%] left-[5%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] border-2 border-indigo-500/10 rounded-full blur-md pointer-events-none animate-pulse" />
      <div className="absolute bottom-[15%] right-[10%] w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] border border-violet-500/10 rounded-full blur-sm pointer-events-none animate-pulse animation-delay-1000" />

      {/* Contenido principal animado */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full max-w-7xl mx-auto px-0 sm:px-4 md:px-8 py-4 sm:py-8 md:py-12 relative z-10 flex flex-col items-center"
          >
            {/* Headline & Content Area */}
            <div className="w-full max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-10">
              {/* Tagline Pill */}
              <motion.div
                variants={itemVariants}
                className="inline-block rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
              >
                Soluciones de IA para Pymes
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.2] sm:leading-[1.1] px-2 sm:px-0"
              >
                No te quedes atrás: Transforma tu negocio con IA de vanguardia.
              </motion.h1>

              {/* Subheading/Paragraph */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-indigo-100/90 font-light max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-3 sm:px-4"
              >
                Implementamos soluciones de IA a medida para optimizar tus operaciones, mejorar la experiencia de cliente y potenciar el crecimiento de tu Pyme.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div 
                variants={itemVariants} 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 px-4 sm:px-0"
              >
                {/* Primary Button */}
                <motion.a
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href="#solucion"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:text-white text-white font-medium shadow-lg shadow-indigo-500/30 transition-all duration-300 text-sm sm:text-base"
                >
                  Descubrir Soluciones
                  <FiArrowRight className="ml-1" />
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href="#contacto"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium border border-white/10 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                >
                  Contactar
                </motion.a>
              </motion.div>
            </div>

            {/* Visualización gráfica avanzada */}
            <motion.div
              variants={graphVisualVariants}
              className="w-full max-w-7xl -mt-4 sm:-mt-8 px-2 sm:px-0"
            >
              <Suspense fallback={<GraphLoader />}>
                <EnhancedHeroGraph />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de scroll animado - Hidden on smaller screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="scroll-indicator hidden sm:block"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </motion.div>

      {/* Estilos específicos para animaciones (partículas, scroll indicator) */}
      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-15px) translateX(10px) scale(1.1); opacity: 0.5; }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(15px) translateX(-15px) scale(0.9); opacity: 0.4; }
        }
        @keyframes float-2 {
           0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-10px) translateX(-5px) scale(1.05); opacity: 0.6; }
        }
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
          z-index: 20;
          cursor: pointer;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
          40% { transform: translateY(-10px) translateX(-50%); }
          60% { transform: translateY(-5px) translateX(-50%); }
        }
        .animation-delay-1000 {
            animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection; // Export the component
