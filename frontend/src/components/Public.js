import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertCurrency } from '../store/currencySlice';
import CurrencyAutoComplete from './CurrencyAutoComplete';
import styles from './Public.module.css';

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
        <div className={styles.public}>
            <h1 className={styles.public__title}> Currency Converter </h1>
            <form className={styles.public__form} onSubmit={handleSubmit}>
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
                <button 
                    type="submit" 
                    className={loading
                        ? `${styles.public__button} ${styles['public__button--disabled']}`
                        : styles.public__button
                    }
                    disabled={loading}>
                    Convert
                </button>
            </form>
            {error && <p className={styles.public__error} >{error}</p>}
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