import React from 'react';



const Buttons = ({ decimal, evaluate, initialize, numbers, operators }) => (
  <div>
    <button className='grey' id="clear" onClick={initialize} value="AC">AC</button>
    <button className='grey' id="plusminus" value="+-">+/-</button>
    <button className='grey' id="percent" value="%">%</button>
    <button className='operator' id="divide" onClick={operators} value="/">÷</button>
    <button id="seven" onClick={numbers} value="7">7</button>
    <button id="eight" onClick={numbers} value="8">8</button>
    <button id="nine" onClick={numbers} value="9">9</button>
    <button className='operator' id="multiply" onClick={operators} value="x">x</button>
    <button id="four" onClick={numbers} value="4">4</button>
    <button id="five" onClick={numbers} value="5">5</button>
    <button id="six" onClick={numbers} value="6">6</button>
    <button className='operator' id="subtract" onClick={operators} value="-">-</button>
    <button id="one" onClick={numbers} value="1">1</button>
    <button id="two" onClick={numbers} value="2">2</button>
    <button id="three" onClick={numbers} value="3">3</button>
    <button className='operator' id="add" onClick={operators} value="+">+</button>
    <button className="jumbo" id="zero" onClick={numbers} value="0">0</button>
    <button id="decimal" onClick={decimal} value=".">.</button>
    <button className='operator' id="equals" onClick={evaluate} value="=">=</button>
  </div>
);

export default Buttons;
