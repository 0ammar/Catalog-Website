'use client';

import styles from './Searchbar.module.scss';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Searchbar = () => {

  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
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
}
export default Searchbar