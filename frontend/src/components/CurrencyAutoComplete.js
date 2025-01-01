import React, { useState, useEffect, useRef } from 'react';
import currencyList from '../api/currencyList';

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
    <div ref={wrapperRef} style={{ position: 'relative' }}>
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
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            margin: 0,
            padding: 0,
            listStyleType: 'none',
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 999,
          }}
        >
          {filteredList.map((currency) => (
            <li
              key={currency.code}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
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
