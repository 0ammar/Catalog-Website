'use client'

import styles from './Searchbar.module.scss'
import { IoSearch } from "react-icons/io5";

export default function Searchbar() {
  return (
    <form className={styles.searchBar}>
      <input
        className={styles.inputField}
        type='text'
        placeholder='يمكنك إدخال اسم أو رقم الصنف للعثور عليه'
      />
      <button className={styles.searchButton} title='search' type='submit'>
        <IoSearch className={styles.searchIcon} />
      </button>
    </form>
  );
}
