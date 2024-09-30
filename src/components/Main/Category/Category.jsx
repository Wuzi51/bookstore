import styles from '../Category/Category.module.css'

const Category = ({title}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <button className={styles.btn}><a href="">More</a></button>
    </div>
  )
}

export default Category