import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import styles from "../NavItem/NavItems.module.css";

const NavItems = () => (
  <ul className={styles.topNavItem}>
    <li> <a href="#">登入</a> </li>
    <li> <FontAwesomeIcon icon={faGlobe} /> </li>
    <li> <FontAwesomeIcon icon={faMoon} /> </li>
    <li> <FontAwesomeIcon icon={faCartShopping} /> </li>
  </ul>
)

export default NavItems