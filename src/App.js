import React from 'react';
import Calculator from './components/Calculator';

const App = () => {
  return (
    <div>
      <Calculator />
      <div className="author">
        Designed and Coded By <br />
        <a href="https://github.com/chihoko12" target="_blank">
          chihoko12
        </a>
      </div>
    </div>
  );
};

export default App;
