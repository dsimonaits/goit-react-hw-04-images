import { useState } from 'react';
import { Header } from './Searchbar.styled';
import { SearchForm } from './Searchbar.styled';
import { SearchBtn } from './Searchbar.styled';
import { SearchBtnLabel } from './Searchbar.styled';
import { SearchInput } from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

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
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputValue}
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
