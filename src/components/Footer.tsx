// src/components/Footer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import BotpressChat, { openChat } from './Chat';
// Assuming ModernBackground provides a visually appealing background
// import ModernBackground from './ModernBackground';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi'; // Added ArrowRight for links

// Mock ModernBackground component for demonstration
const ModernBackground: React.FC<{ variant: string; className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <footer className={`bg-[#0e0e2c] text-white ${className}`}>
    {children}
  </footer>
);

// Declare the Botpress type
declare global {
  interface Window {
    botpressWebChat: {
      sendEvent: (event: { type: string }) => void;
    };
  }
}

const Footer: React.FC = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Reusable link component for consistency
  const FooterLink: React.FC<{ 
    href: string; 
    children: React.ReactNode; 
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void 
  }> = ({ href, children, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="group text-indigo-200/70 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
    >
      {children}
      <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1" />
    </a>
  );

  // Reusable contact item component
    const ContactItem: React.FC<{ icon: React.ElementType; children: React.ReactNode; href?: string }> = ({ icon: Icon, children, href }) => {
    const content = (
        <span className="flex items-center gap-3 text-indigo-200/80 group-hover:text-white transition-colors duration-300 text-sm">
            <Icon className="w-4 h-4 flex-shrink-0 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
            {children}
        </span>
    );

    return href ? (
        <li><a href={href} className="group">{content}</a></li>
    ) : (
        <li className="group">{content}</li>
    );
};


  return (
    // Using a gradient background as a placeholder for ModernBackground
    <ModernBackground variant="primary" className="pt-20 pb-10 font-sans">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16" // Increased gap
        >
          {/* Logo, Description, and Social Links */}
          <motion.div variants={itemVariants} className="md:col-span-5 lg:col-span-4">
            {/* Use an SVG or Image logo here if available */}
            <h3 className="text-3xl font-bold text-white mb-5 tracking-tight">
              VisionAI<span className="text-indigo-400">.</span>
            </h3>
            <p className="text-indigo-100/70 text-sm leading-relaxed mb-6 max-w-md">
              Transformamos negocios con soluciones de IA innovadoras y personalizadas. Construyendo el futuro digital, una empresa a la vez.
            </p>
          </motion.div>

          {/* Spacer for layout */}
          <div className="hidden md:block md:col-span-1 lg:col-span-2"></div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-2">
            <h4 className="text-base font-semibold text-white mb-5 uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-3">
              <li><FooterLink href="#proceso">Procesos</FooterLink></li>
              <li><FooterLink href="#solucion">Soluciones</FooterLink></li>
              <li><FooterLink href="#" onClick={(e) => { e.preventDefault(); openChat(); }}>Dudas</FooterLink></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3">
            <h4 className="text-base font-semibold text-white mb-5 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
               <ContactItem icon={FiMail} href="mailto:hector@hectorobon.com">
                 hector@visionai.com
               </ContactItem>
               <ContactItem icon={FiPhone} href="tel:+34600679845">
                 +34 600 679 845
               </ContactItem>
               <ContactItem icon={FiMapPin}>
                 Zaragoza, España
               </ContactItem>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright and Legal Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/10 pt-8 mt-8" // Added top margin
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-indigo-100/50 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} VisionAI. Todos los derechos reservados.
            </p>
            <div className="flex gap-5">
              <a href="/privacy" className="text-indigo-100/50 hover:text-white text-xs transition-colors">
                Política de Privacidad
              </a>
              <a href="/terms" className="text-indigo-100/50 hover:text-white text-xs transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </ModernBackground>
  );
};

export default Footer;