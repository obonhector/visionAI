import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi'; // O un icono más relevante como FiPhoneCall o FiCalendar

// --- CTA SECTION ---

const CTASection: React.FC = () => {

  // Reutilizamos variantes similares a las del Hero para consistencia en botones
  const buttonVariants = {
    // La animación inicial puede ser parte de las variantes de la sección o del botón mismo
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.4 } // Delay para aparecer después del texto
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 35px rgba(129, 140, 248, 0.6)", // Glow más intenso en CTA final
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.97 }
  };

  // Animación sutil de pulso para el botón principal
   const pulseAnimation = {
     scale: [1, 1.03, 1], // Escala ligeramente hacia arriba y vuelve
     transition: {
       duration: 1.8,
       ease: "easeInOut",
       repeat: Infinity,
       repeatDelay: 1 // Pausa entre pulsos
     }
   };


  return (
    <motion.section
      id="contacto" // ID para enlaces internos
      className="relative py-24 md:py-32 bg-gradient-to-t from-[#0e0e2c] via-[#0e0e2c] to-[#0e0e2c] text-white overflow-hidden" // Gradiente inverso o distinto para destacar
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
        {/* Elementos de fondo decorativos (opcional, para más 'wow') */}
       <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-[20%] left-[5%] w-[40%] h-[60%] bg-gradient-radial from-indigo-600/40 via-transparent to-transparent rounded-full blur-[100px] animate-pulse animation-delay-1000" />
         <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-gradient-radial from-purple-600/30 via-transparent to-transparent rounded-full blur-[120px] animate-pulse" />
       </div>


      <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center relative z-10">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300"
        >
          ¿Listo/a para Dar el Salto con IA?
        </motion.h2>

        {/* Sub-headline/Texto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-indigo-200/80 font-light max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
        >
          Agenda una consultoría estratégica **gratuita y sin compromiso**. Descubriremos juntos cómo la inteligencia artificial puede revolucionar tu Pyme y diseñaremos los primeros pasos.
        </motion.p>

        {/* Botón Principal CTA */}
        <motion.a
          href="#tu-enlace-de-contacto-o-agenda" // IMPORTANTE: Cambia este enlace
          variants={buttonVariants}
          initial="initial"
          whileInView="animate" // Anima cuando el botón entra en vista
          whileHover="hover"
          whileTap="tap"
          animate={pulseAnimation} // Aplica la animación de pulso continua
          viewport={{ once: true, amount: 0.8 }}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1" // Estilo muy prominente
        >
          Agendar Consultoría Gratuita
          <FiArrowRight className="w-5 h-5" />
        </motion.a>

         {/* (Opcional) Texto adicional debajo del botón */}
         <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-indigo-300/70 mt-6"
         >
             Plazas limitadas cada mes. ¡No esperes más!
         </motion.p>

      </div>
    </motion.section>
  );
};

export default CTASection;