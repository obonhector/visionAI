import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// Importa iconos (puedes usar los mismos o cambiarlos)
import { FiClock, FiTarget, FiDatabase } from 'react-icons/fi';
import { HiOutlineLightBulb } from "react-icons/hi";

// --- DATOS DE LOS DESAFÍOS ---
interface Challenge {
  icon: React.ElementType;
  title: string;
  description: string;
}

const challengesData: Challenge[] = [
    {
    icon: FiClock,
    title: "Optimizar Tiempo y Recursos", // Ligeramente reenfocado
    description: "La IA automatiza tareas y procesos, liberando a tu equipo para enfocarse en lo estratégico." // Enfocado en solución implícita
  },
  {
    icon: FiTarget,
    title: "Competir con Inteligencia",
    description: "Usa datos y personalización avanzada para diferenciarte y ganar cuota de mercado eficazmente."
  },
  {
    icon: FiDatabase,
    title: "Convertir Datos en Decisión",
    description: "Transforma la información acumulada en insights accionables para impulsar el crecimiento."
  },
  {
    icon: HiOutlineLightBulb,
    title: "Innovación Accesible",
    description: "Implementa tecnología de vanguardia de forma práctica y rentable, sin grandes equipos técnicos."
  },
];

// --- Componente Tarjeta de Desafío con Efecto 3D y Animación de Entrada ---
const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Valores de movimiento para rotación X e Y (efecto 3D al pasar el ratón)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs suaves para la rotación
  const smoothOptions = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, smoothOptions);
  const springY = useSpring(mouseY, smoothOptions);

  // Transformar posición del ratón a grados de rotación
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]); // Invertido Y->X
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - left) / width - 0.5);
    mouseY.set((event.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // --- VARIANTES DE ANIMACIÓN PARA LA TARJETA ---
  const cardVariants = {
    // Estado inicial (antes de entrar en vista) -> Animación de entrada
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    // Estado final (cuando entra en vista) -> Animación de entrada
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 } // Transición suave tipo resorte
    },
    // Estado al pasar el ratón por encima (además del tilt 3D)
    hover: {
      scale: 1.02,
        boxShadow: "0 15px 40px rgba(165, 180, 252, 0.15)",
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      // --- APLICACIÓN DE VARIANTES DE ANIMACIÓN ---
      variants={cardVariants}
      // El estado inicial y visible es controlado por el padre (ChallengesSection)
      // initial="hidden" // Heredado implícitamente
      // animate="visible" // Heredado implícitamente
      whileHover="hover" // Aplica la variante 'hover' al pasar el ratón
      // --- LÓGICA DEL EFECTO 3D ---
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX, // Aplicar rotación X
        rotateY, // Aplicar rotación Y
        transformPerspective: '1000px', // Necesario para el efecto 3D
      }}
      className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center backdrop-blur-lg shadow-xl overflow-hidden cursor-pointer group" // Añadido 'group' para el hover del borde
    >
      {/* Glow sutil en el borde superior en hover */}
      <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Usa group-hover
          // Animación del glow al hacer hover (no es parte de la animación de entrada)
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }} // Esto podría ser redundante si 'group-hover' funciona bien
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
      />

      {/* Icono con Glow Animado */}
      <div className="relative mb-6">
        <div className="absolute inset-[-6px] bg-indigo-500/30 rounded-full blur-lg animate-pulse opacity-70" />
        <div className="relative p-3 bg-indigo-900/50 border border-indigo-500/30 rounded-full inline-block">
          <challenge.icon className="w-8 h-8 md:w-10 md:h-10 text-indigo-300" />
        </div>
      </div>

      {/* Título */}
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 z-10">
        {challenge.title}
      </h3>

      {/* Descripción */}
      <p className="text-indigo-200/80 text-sm md:text-base leading-relaxed z-10">
        {challenge.description}
      </p>

        {/* Efecto grano/ruido sutil dentro de la tarjeta (opcional) */}
      <div className="absolute inset-0 bg-repeat pointer-events-none opacity-[0.015] mix-blend-overlay" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}/>
    </motion.div>
  );
};


// --- Componente Principal de la Sección ---
const ChallengesSection: React.FC = () => {

  // --- VARIANTES PARA LA SECCIÓN COMPLETA ---
  const sectionVariants = {
    hidden: { opacity: 0 }, // Estado inicial de la sección
    visible: {
      opacity: 1, // Estado final de la sección
      transition: {
        duration: 0.5, // La sección tarda 0.5s en hacerse visible
        staggerChildren: 0.2, // Los hijos animados empiezan con 0.2s de diferencia
        delayChildren: 0.3, // Espera 0.3s antes de animar el primer hijo
      }
    }
  };

  // --- VARIANTES PARA EL TEXTO (TÍTULO Y PÁRRAFO) ---
  const textVariants = {
    hidden: { opacity: 0, y: 30 }, // Estado inicial del texto
    visible: {
      opacity: 1,
      y: 0, // Estado final del texto
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Transición específica para el texto
    }
  };

  return (
    <motion.section
      id="desafios"
      className="relative py-24 md:py-32 bg-[#0e0e2c] text-white overflow-hidden" // Fondo base
      // --- ACTIVACIÓN Y ORQUESTACIÓN DE ANIMACIONES ---
      variants={sectionVariants} // Usa las variantes de la sección
      initial="hidden" // Empieza en estado oculto
      whileInView="visible" // Cambia a estado visible cuando entra en la pantalla
      viewport={{ once: true, amount: 0.2 }} // La animación ocurre una vez cuando el 20% es visible
    >
      {/* Elemento de fondo abstracto y animado */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        initial={{ scale: 1.5, rotate: 0 }}
        animate={{ scale: 1, rotate: 15 }}
        transition={{ type: 'spring', stiffness: 5, damping: 5, duration: 40, repeat: Infinity, repeatType: "mirror" }} // Animación muy lenta
      >
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-gradient-radial from-indigo-700/30 via-transparent to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[40vw] h-[40vw] bg-gradient-radial from-violet-700/30 via-transparent to-transparent rounded-full blur-[100px]" />
      </motion.div>


      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        {/* Título animado */}
        <motion.h2
          variants={textVariants} // Usa las variantes de texto
          // initial="hidden" y animate="visible" son heredados de la sección padre
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-white"
        >
          Supera los Límites de tu Pyme con IA
        </motion.h2>

        {/* Párrafo animado */}
        <motion.p
          variants={textVariants} // Usa las variantes de texto
          // initial="hidden" y animate="visible" son heredados de la sección padre
          className="text-lg md:text-xl text-indigo-200/80 font-light max-w-3xl mx-auto text-center mb-16 md:mb-24" // Más margen inferior
        >
          La inteligencia artificial ya no es solo para gigantes tecnológicos. Descubre cómo podemos ayudarte a derribar las barreras que frenan tu crecimiento y eficiencia.
        </motion.p>

        {/* Grid para las Tarjetas */}
        {/* Este div no necesita ser 'motion.div' porque los hijos directos que queremos animar escalonadamente son las ChallengeCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {challengesData.map((challenge, index) => (
             // Cada ChallengeCard es un componente 'motion' y heredará la secuencia de animación
             // definida por 'staggerChildren' en la sección padre.
             // Usará sus propias 'cardVariants' para definir CÓMO anima.
            <ChallengeCard key={index} challenge={challenge} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ChallengesSection;