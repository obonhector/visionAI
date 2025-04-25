import HeroSection from "./components/HeroSection";
import BotpressChat from "./components/Chat";
import ChallengesSection from "./components/Challenge";
import SolutionSection from "./components/Solution";
import AreasOfImpact from "./components/AreasOfImpact";
import ProcessSection from "./components/process";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    // --- NOTA: Este div tiene fondo blanco. Las secciones anteriores se diseñaron para fondo oscuro.---
    // --- Considera cambiar a algo como: className="bg-gray-950 text-gray-100 overflow-x-hidden" ---
    <div className="bg-gray-950 text-gray-100 overflow-x-hidden"> {/* Evita overflow horizontal por animaciones */}
      <main>
        <HeroSection />
        <ChallengesSection />
        <SolutionSection />
        <AreasOfImpact />
        <ProcessSection />
        <CTA />
        <Footer />
      </main>

      {/* --- Añadido: Renderiza el componente BotpressChat --- */}
      {/* Este componente se encargará de inyectar los scripts necesarios */}
      {/* Su posición aquí no afecta dónde aparece el widget del chat (normalmente es fijo) */}
      <BotpressChat />
    </div>
  );
}

export default App;