import styles from "../Footer/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h4>歡迎光臨</h4>
        </div>
        <div>
          <h4>服務條款</h4>
        </div>
        <div>
          <h4>社交媒體</h4>
        </div>
      </div>
      <p>Copyright © 2024</p>
    </footer>
  );
}

export default Footer;