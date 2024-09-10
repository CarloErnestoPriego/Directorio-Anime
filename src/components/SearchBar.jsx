import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/index.css';

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <div>
      <input 
        type="text" value={input} onChange={handleChange} placeholder="Buscar Anime"/>
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};