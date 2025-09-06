import Navigation from './components/Navigation';
import Hero from './components/Hero';
import EssenciaSection from './components/EssenciaSection';
import MetodoAust from './components/MetodoAust';
import NiveisAtuacao from './components/NiveisAtuacao';
import JornadaAust from './components/JornadaAust';
import ComoTrabalhamos from './components/ComoTrabalhamos';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Essência Section */}
        <div id="essencia">
          <EssenciaSection />
        </div>
        
        {/* Método AUST Section */}
        <div id="metodo">
          <MetodoAust />
        </div>
        
        {/* Níveis de Atuação Section */}
        <div id="niveis">
          <NiveisAtuacao />
        </div>
        
        {/* Jornada AUST Section */}
        <div id="jornada">
          <JornadaAust />
        </div>
        
        {/* Como Trabalhamos Section */}
        <div id="como-trabalhamos">
          <ComoTrabalhamos />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
