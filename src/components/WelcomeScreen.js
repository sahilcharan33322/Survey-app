import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to our Customer Survey</h1>
      <p>We value your feedback. Please take a moment to answer a few questions.</p>
      <button onClick={onStart}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;