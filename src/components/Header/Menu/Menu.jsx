import styles from "./Menu.module.css"

const Menu = () => {
  return (
    <>
      <nav className={styles.menu}>
        <ul class="nav mt-2">
          <li class="nav-item">
            <a class="nav-link" href="#">全站分類</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">排行榜</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">為您推薦</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">全站活動</a>
          </li>
      </ul>
      </nav>
    </>
  )
}

export default Menu