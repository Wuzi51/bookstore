import Logo from "./Logo"
import NavItems from "./NavItem"
import SearchForm from "./SearchForm"
import Menu from "./Menu"
import "./index.css"

const Header = () => {
  return (
    <div className="header">
      <div className="topRow">
        <Logo/>
        <SearchForm/>
        <NavItems/>
      </div>
      <div>
        <Menu/>
      </div>
    </div>
  )
}

export default Header