import styles from "./SearchForm.module.css";

const SearchForm = () => (
  <form className="d-flex">
    <input className={`form-control me-2 ${styles.searchForm}`} type="search" placeholder="請輸入關鍵字" aria-label="Search" />
    <button className={`btn btn-info ${styles.btn}`} type="submit">搜尋</button>
  </form>
);

export default SearchForm