import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  SearchInput,
} from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputValue = e => {
    const value = e.currentTarget.value;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn>
          <FiSearch color="black" size={20} />
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>
        <SearchInput
          type="text"
          value={query}
          autoComplete="off"
          // autoFocus
          placeholder="Search images and photos"
          onChange={handleInputValue}
          ref={inputRef}
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
