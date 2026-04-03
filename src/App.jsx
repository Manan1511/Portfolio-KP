import React from 'react';
import Hero from './components/Hero';
import EngineeringProgress from './components/EngineeringProgress';
import AerospaceProjects from './components/AerospaceProjects';
import RocketShowcase from './components/RocketShowcase';
import JournalRoadmap from './components/JournalRoadmap';
import AboutContact from './components/AboutContact';

function App() {
  return (
    <div className="min-h-screen w-full relative">
      <Hero />
      <EngineeringProgress />
      <AerospaceProjects />
      <RocketShowcase />
      <JournalRoadmap />
      <AboutContact />
    </div>
  );
}

export default App;
