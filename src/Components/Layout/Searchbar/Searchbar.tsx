'use client';

import styles from './Searchbar.module.scss';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useState } from 'react';

type Props = {
  onQueryChange: (query: string) => void;
};

const Searchbar = ({ onQueryChange }: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onQueryChange(query.trim());
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, onQueryChange]);

  return (
    <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
      <input
        className={styles.inputField}
        type="text"
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchButton} title="search" type="submit">
        <IoSearch className={styles.searchIcon} />
      </button>
    </form>
  );
};

export default Searchbar;
