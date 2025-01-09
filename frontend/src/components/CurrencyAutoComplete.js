import React, { useState, useEffect, useRef } from 'react';
import currencyList from '../api/currencyList';
import styles from './CurrencyAutoComplete.module.css';

function CurrencyAutoComplete({ value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const trimmed = filter.trim().toLowerCase();
  
    if (!trimmed) {
      setFilteredList(currencyList);
    } else {
      const matches = currencyList.filter(
        (c) =>
          c.code.toLowerCase().startsWith(trimmed) ||
          c.name.toLowerCase().includes(trimmed)
      );
      setFilteredList(matches);
    }
  }, [filter]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    onChange(newFilter);
  };

  const handleSelect = (code) => {
    setFilter(code);
    onChange(code);
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (!filter.trim()) {
      setFilteredList(currencyList);
    }
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className={styles.currencyautocomplete}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onFocus={handleFocus}
        onChange={handleInputChange}
      />

      {isOpen && (
        <ul className={styles.currencyautocomplete__input}>
        {filteredList.length === 0 ? (
          <li
            className={styles.currencyautocomplete__list__message}
          >
            No matches found
          </li>
        ) : (
          filteredList.map((currency) => (
            <li
              key={currency.code}
              className={styles.currencyautocomplete__list}
              onClick={() => handleSelect(currency.code)}
            >
              {currency.code} – {currency.name}
            </li>
          ))
        )}
      </ul>
    )}
    </div>
  );
}

export default CurrencyAutoComplete;
