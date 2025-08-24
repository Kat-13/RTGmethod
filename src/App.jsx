import React, { useState, useEffect } from 'react';
import RTGNavigation from './components/RTGNavigation';
import WhiteboardLevel from './components/WhiteboardLevel';
import ProgramBoardLevel from './components/ProgramBoardLevel';
import TracksLevel from './components/TracksLevel';
import ProgramView from './components/ProgramView';
import ScheduleLevel from './components/ScheduleLevel';
import { initializeDataIfEmpty } from './data/initialData';
import './App.css';

function App() {
  const [currentLevel, setCurrentLevel] = useState('program-board');

  // Initialize data on app start
  useEffect(() => {
    // Initialize data if localStorage is empty
    initializeDataIfEmpty();
  }, []);

  const renderCurrentLevel = () => {
    switch (currentLevel) {
      case 'whiteboard':
        return <WhiteboardLevel />;
      case 'program-board':
        return <ProgramBoardLevel />;
      case 'tracks':
        return <TracksLevel />;
      case 'schedule':
        return <ScheduleLevel />;
      case 'program-view':
        return <ProgramView />;
      default:
        return <ProgramBoardLevel />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RTGNavigation 
        currentLevel={currentLevel} 
        onLevelChange={setCurrentLevel}
      />
      <main>
        {renderCurrentLevel()}
      </main>
    </div>
  );
}

export default App;

