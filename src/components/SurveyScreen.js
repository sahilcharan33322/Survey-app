import React, { useState, useEffect } from 'react';

const SurveyScreen = ({ sessionId, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions'));
    setQuestions(storedQuestions);
  }, []);

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    localStorage.setItem(`survey_${sessionId}`, JSON.stringify(newAnswers));
  };

  const navigate = (direction) => {
    if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the survey?')) {
      localStorage.setItem(`survey_${sessionId}_completed`, 'true');
      onComplete();
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[currentQuestion];

  return (
    <div className="survey-screen">
      <h2>Question {currentQuestion + 1}/{questions.length}</h2>
      <p>{question.text}</p>
      {question.type === 'rating' && (
        <div className="rating">
          {[...Array(question.max)].map((_, i) => (
            <button key={i} onClick={() => handleAnswer(i + 1)}>{i + 1}</button>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <textarea
          value={answers[question.id] || ''}
          onChange={(e) => handleAnswer(e.target.value)}
        />
      )}
      <div className="navigation">
        <button onClick={() => navigate('prev')} disabled={currentQuestion === 0}>Previous</button>
        <button onClick={() => navigate('next')} disabled={currentQuestion === questions.length - 1}>
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
        {currentQuestion === questions.length - 1 && (
          <button onClick={handleSubmit}>Submit Survey</button>
        )}
      </div>
    </div>
  );
};

export default SurveyScreen;