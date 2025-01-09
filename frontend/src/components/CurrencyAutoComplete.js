import React, { useState, useEffect, useRef } from 'react';
import currencyList from '../api/currencyList';
import styles from './CurrencyAutoComplete.module.css';

function CurrencyAutoComplete({ value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (filter.trim()) {
      const lowerFilter = filter.toLowerCase();
      const matches = currencyList.filter(
        (c) =>
          c.code.toLowerCase().startsWith(lowerFilter) ||
          c.name.toLowerCase().includes(lowerFilter)
      );
      setFilteredList(matches);
      setIsOpen(matches.length > 0);
    } else {
      setIsOpen(false);
      setFilteredList([]);
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

  return (
    <div ref={wrapperRef} className={styles.currencyautocomplete}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          if (filter) {
            setIsOpen(true);
          }
        }}
      />

      {isOpen && (
        <ul
          className={styles.currencyautocomplete__input}
        >
          {filteredList.map((currency) => (
            <li
              key={currency.code}
              className={styles.currencyautocomplete__list}
              onClick={() => handleSelect(currency.code)}
            >
              {currency.code} – {currency.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrencyAutoComplete;
