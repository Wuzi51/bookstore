import styles from "./Logo.module.css"


const Logo = () => (
  <a className={styles.logo} href="#">
    <img 
      className={styles.logoImage}
      src="https://cdn.readmoo.com/images/store/logo_header.svg" 
      alt="logo" 
    />
  </a>
)

export default Logo