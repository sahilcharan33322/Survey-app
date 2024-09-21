import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SurveyScreen from './components/SurveyScreen';
import ThankYouScreen from './components/ThankYouScreen';
import './App.css';

const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Initialize questions in local storage if not present
    if (!localStorage.getItem('questions')) {
      const initialQuestions = [
        { id: 1, text: 'How satisfied are you with our products?', type: 'rating', max: 5 },
        { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', max: 5 },
        { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', max: 5 },
        { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', max: 10 },
        { id: 5, text: 'What could we do to improve our service?', type: 'text' },
      ];
      localStorage.setItem('questions', JSON.stringify(initialQuestions));
    }
  }, []);

  const startSurvey = () => {
    const newSessionId = Date.now().toString();
    setSessionId(newSessionId);
    setScreen('survey');
  };

  const completeSurvey = () => {
    setScreen('thankYou');
    setTimeout(() => setScreen('welcome'), 5000);
  };

  return (
    <div className="App">
      {screen === 'welcome' && <WelcomeScreen onStart={startSurvey} />}
      {screen === 'survey' && <SurveyScreen sessionId={sessionId} onComplete={completeSurvey} />}
      {screen === 'thankYou' && <ThankYouScreen />}
    </div>
  );
};

export default App;