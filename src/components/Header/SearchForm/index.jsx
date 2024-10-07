import "./index.css"


const SearchForm = () => {

  return (
    <form className="d-flex">
    <input className="form-control searchForm" type="search" placeholder="請輸入關鍵字" aria-label="Search" />
    <button className="btn btn-info" type="submit">搜尋</button>
  </form>
  )
}

export default SearchForm