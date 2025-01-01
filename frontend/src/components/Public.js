import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertCurrency } from '../store/currencySlice';
import CurrencyAutoComplete from './CurrencyAutoComplete';

const Public = () => {
    const [amount, setAmount] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
  
    const dispatch = useDispatch();
    const { loading, error, result } = useSelector((state) => state.currency);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(convertCurrency({ amount, from, to }));
    };

    const content = (
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
                    <CurrencyAutoComplete
                        placeholder="From (e.g. USD)"
                        value={from}
                        onChange={setFrom}
                    />
                </div>
                <div>
                    <CurrencyAutoComplete
                        placeholder="To (e.g. EUR)"
                        value={to}
                        onChange={setTo}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    Convert
                </button>
            </form>
            {loading && <p>Converting...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <p>
                {result.amount} {result.from} = {result.converted.toFixed(2)} {result.to}
                </p>
            )}
        </div>
    )
    return content;
}

export default Public;