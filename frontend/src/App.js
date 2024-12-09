import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/convert?amount=${amount}&from=${from}&to=${to}`);
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setResult(`${data.amount} ${data.from} = ${data.converted.toFixed(2)} ${data.to}`);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="number" 
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="From (e.g. USD)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="To (e.g. EUR)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Convert</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
