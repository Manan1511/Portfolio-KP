import './App.css';
import Hero from './components/Hero';
import EngineeringProgress from './components/EngineeringProgress';
import LearningStack from './components/LearningStack';
import AerospaceCuriosity from './components/AerospaceCuriosity';
import JournalRoadmap from './components/JournalRoadmap';
import AboutContact from './components/AboutContact';

function App() {
  return (
    <div className="portfolio-app">
      <Hero />
      <EngineeringProgress />
      <LearningStack />
      <AerospaceCuriosity />
      <JournalRoadmap />
      <AboutContact />
    </div>
  );
}

export default App;
