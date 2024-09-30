import Header from "../../components/Header/Header"
import Banner from "../../components/Banner/Banner"
import Main from "../../components/Main"
import styles from "../Home/index.module.css"


const Home = () => {
  return (
    <div className={styles.wrap}>
      <Header/>
      <Banner/>
      <Main/>
    </div>
  )
}

export default Home