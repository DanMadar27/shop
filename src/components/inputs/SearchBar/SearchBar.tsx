import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import SearchButton from '../IconButtons/SearchButton';

import styles from './SearchBar.module.css';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // If the Enter key is pressed, run the search
      handleSearch();
    }
  };
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className={`${styles.container} col-9`}>
      <input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
