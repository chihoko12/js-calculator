import React, { Component } from 'react';
import  Formula  from './Formula';
import  Output  from './Output';
import  Buttons  from './Buttons';

const isOperator = /[x/+-]/;
const endsWithOperator = /[x+-/]$/;
const endsWithNegativeSign = /\d[x/+-]{1}-$/;

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      evaluated: false,
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }

  maxDigitWarning() {
    this.setState({
      currentVal: 'Digit Limit Met',
      prevVal: this.state.currentVal,
    });
    setTimeout(() => this.setState({
      currentVal: this.state.prevVal
    }), 1000);
  }

  handleEvaluate() {
    if (this.state.currentVal.includes('Limit')) return;

    let expression = this.state.formula;
    expression = this.removeTrailingOperators(expression);
    expression = this.replaceOperators(expression);

    // filtering the expression to remove consecutive operators
    let answer = this.calculateExpression(expression);
    this.setState({
      currentVal: answer.toString(),
      formula: this.formatFormula(expression,answer),
      prevVal: answer,
      evaluated: true,
    });
  }

  removeTrailingOperators(expression) {
    while (endsWithOperator.test(expression)) {
      expression = expression.slice(0,-1);
    }
    return expression;
  }

  replaceOperators(expression) {
    //return expression.replace(/x/g, "*").replace(/-/g, "-").replace("--", "-");
    return expression.replace(/x/g, "*").replace("--", "-");
    //return expression.replace(/x/g,"*").replace(/--/,"+");
  }

  calculateExpression(expression) {
    return  Math.round(1e12 * eval(expression)) / 1e12;
  }

  formatFormula(expression,answer) {
    return expression.replace(/\*/g, "⋅").replace(/(x|\/|\+)-/, "$1-").replace(/^-/, "-") + "=" + answer;
  }

  handleOperators(e) {
    if (this.state.currentVal.includes("Limit")) return;

    const operator = e.target.value;
    const { formula, prevVal, evaluated } = this.state;

    this.setState({
      currentVal: operator,
      evaluated: false
    });

    if (evaluated) {
      this.setState({
        formula: prevVal + operator
      });
    } else if (endsWithOperator.test(formula)) {
        this.handleEndsWithOperator(formula, prevVal,operator);
    } else {
      this.setState({
        prevVal: formula,
        formula: formula + operator
      });
    }
  }

  handleEndsWithOperator(formula,prevVal,operator) {
    if (endsWithNegativeSign.test(formula)) {
      if (operator !== "-") {
        this.setState({
          formula: prevVal + operator
        });
      }
    } else {
        const newFormula = endsWithNegativeSign.test(formula + operator) ? formula : prevVal;
        this.setState({ formula: newFormula + operator });
    }
  }

  handleNumbers(e) {
    if (this.state.currentVal.includes("Limit")) return;

    const value = e.target.value;
    const { currentVal, formula, evaluated } = this.state;
    this.setState({ evaluated: false });

    if (currentVal.length > 21) {
      this.maxDigitWarning();
      return;
    }

    this.setState({ evaluated: false });

    if (evaluated) {
      this.setState({
        currentVal: value,
        formula: value !== '0' ? value : '',
      });
    } else {
      const newCurrentVal = currentVal === '0' || isOperator.test(currentVal) ? value : currentVal + value;
      const newFormula =
        currentVal === '0' && value === '0'
        ? formula === '' ? value : formula
          : /([^.0-9]0|^0)$/.test(formula)
          ? formula.slice(0, -1) + value
          : formula + value;

          this.setState({
            currentVal: newCurrentVal,
            formula: newFormula,
          });
    }
  }

  handleDecimal() {
    if (this.state.evaluated) {
      this.setState({
        currentVal: '0.',
        formula: '0.',
        evaluated: false,
      });
    } else if (!this.state.currentVal.includes('.') && !this.state.currentVal.includes('Limit')) {
      this.setState({ evaluated: false });
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (endsWithOperator.test(this.state.formula) || (this.state.currentVal === '0' && this.state.formula === '')) {
        this.setState({
          currentVal: '0.',
          formula: this.state.formula + '0.',
        });
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.',
        });
      }
    }
  }

  initialize() {
    this.setState({
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      evaluated: false,
    });
  }

  render() {
    return (
      <div className="calculator">
        <Formula formula={this.state.formula.replace(/x/g, '⋅')} />
        <Output currentValue={this.state.currentVal} />
        <Buttons
          decimal={this.handleDecimal}
          evaluate={this.handleEvaluate}
          initialize={this.initialize}
          numbers={this.handleNumbers}
          operators={this.handleOperators}
        />
      </div>
    );
  }
}

export default Calculator;
