import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function SearchProvider({ children }) {
  const [inputSearch, setInputSearch] = useState('');
  const [foodsFilterAPI, setFoodsFilterAPI] = useState([]);

  const values = useMemo(() => ({
    foodsFilterAPI,
    setFoodsFilterAPI,
    inputSearch,
    setInputSearch,
  }), [
    foodsFilterAPI,
    setFoodsFilterAPI,
    inputSearch,
    setInputSearch,
  ]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
