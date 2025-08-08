import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [specialFunction, setSpecialFunction] = useState('fibonacci');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');

  const handleCalculate = async () => {
    if (!num1.trim()) {
      setError('Please enter a number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let response;
      
      if (activeTab === 'calculator') {
        if (!num2.trim()) {
          setError('Please enter second number for calculator operations');
          setLoading(false);
          return;
        }
        
        response = await axios.post('/api/calculate', {
          customOperation: operation,
          num1: num1.trim(),
          num2: num2.trim()
        });
      } else {
        response = await axios.post('/api/calculate', {
          operation: specialFunction,
          num1: num1.trim()
        });
      }

      const { result: calculatedResult, operation: operationName, input1, input2 } = response.data;
      
      setResult(calculatedResult);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        operation: operationName,
        input1,
        input2,
        result: calculatedResult,
        timestamp: new Date().toLocaleString()
      };
      
      setHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 items
      
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setNum1('');
    setNum2('');
    setResult('');
    setError('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔢 BigInt Calculator</h1>
        <p>Handle arbitrarily large integers with precision</p>
      </header>

      <div className="container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button 
            className={`tab ${activeTab === 'functions' ? 'active' : ''}`}
            onClick={() => setActiveTab('functions')}
          >
            Special Functions
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        <div className="content">
          {activeTab === 'calculator' && (
            <div className="calculator-section">
              <div className="input-group">
                <label>First Number:</label>
                <input
                  type="text"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="Enter first number (e.g., 123456789)"
                  className="number-input"
                />
              </div>

              <div className="operation-selector">
                <label>Operation:</label>
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                  <option value="add">Addition (+)</option>
                  <option value="subtract">Subtraction (-)</option>
                  <option value="multiply">Multiplication (×)</option>
                  <option value="divide">Division (÷)</option>
                  <option value="modulo">Modulo (%)</option>
                </select>
              </div>

              <div className="input-group">
                <label>Second Number:</label>
                <input
                  type="text"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  placeholder="Enter second number (e.g., 987654321)"
                  className="number-input"
                />
              </div>

              <div className="button-group">
                <button onClick={handleCalculate} disabled={loading} className="calculate-btn">
                  {loading ? 'Calculating...' : 'Calculate'}
                </button>
                <button onClick={clearAll} className="clear-btn">Clear</button>
              </div>
            </div>
          )}

          {activeTab === 'functions' && (
            <div className="functions-section">
              <div className="input-group">
                <label>Number:</label>
                <input
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="Enter a number (e.g., 50)"
                  className="number-input"
                />
              </div>

              <div className="operation-selector">
                <label>Function:</label>
                <select value={specialFunction} onChange={(e) => setSpecialFunction(e.target.value)}>
                  <option value="fibonacci">Fibonacci</option>
                  <option value="factorial">Factorial</option>
                  <option value="catalan">Catalan Number</option>
                </select>
              </div>

              <div className="button-group">
                <button onClick={handleCalculate} disabled={loading} className="calculate-btn">
                  {loading ? 'Calculating...' : 'Calculate'}
                </button>
                <button onClick={clearAll} className="clear-btn">Clear</button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-section">
              <h3>Calculation History</h3>
              {history.length === 0 ? (
                <p className="no-history">No calculations yet. Start calculating to see history!</p>
              ) : (
                <div className="history-list">
                  {history.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="history-header">
                        <span className="history-operation">{item.operation}</span>
                        <span className="history-time">{item.timestamp}</span>
                      </div>
                      <div className="history-inputs">
                        Input: {item.input1}
                        {item.input2 && ` ${getOperationSymbol(item.operation)} ${item.input2}`}
                      </div>
                      <div className="history-result">
                        Result: <span className="result-number">{item.result}</span>
                        <button 
                          onClick={() => copyToClipboard(item.result)}
                          className="copy-btn"
                          title="Copy to clipboard"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {result && (
            <div className="result-section">
              <h3>Result</h3>
              <div className="result-display">
                <span className="result-number">{result}</span>
                <button 
                  onClick={() => copyToClipboard(result)}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              <div className="result-info">
                <small>Digits: {result.replace(/^-/, '').length}</small>
                {result.length > 50 && (
                  <small className="warning">⚠️ Large number - may take time to display</small>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getOperationSymbol(operation) {
  const symbols = {
    'Addition': '+',
    'Subtraction': '-',
    'Multiplication': '×',
    'Division': '÷',
    'Modulo': '%'
  };
  return symbols[operation] || '?';
}

export default App; 