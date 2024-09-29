import Logo from "./Logo/Logo"
import NavItems from "./NavItem/NavItems"
import SearchForm from "./SearchForm/SearchForm"
import Menu from "./Menu/Menu"
import styles from "../Header/Header.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.topRow}>
        <Logo/>
        <SearchForm/>
        <NavItems/>
      </div>
      <div className={styles.menu}>
        <Menu/>
      </div>
    </div>
  )
}

export default Header