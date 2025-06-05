import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import JapanTravelAssistant from './JapanTravelAssistant';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-purple-600 text-white text-2xl font-bold">
      <JapanTravelAssistant />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);