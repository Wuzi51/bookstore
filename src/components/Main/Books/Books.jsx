import styles from "../Books/Books.module.css"

const bookList = [
  {
    id: 1,
    img: 'https://cdn.readmoo.com/cover/im/fniapqm_210x315.jpg?v=1727147830',
    title: '魔術師',
    author: '柯姆・托賓'
  },
  {
    id: 2,
    img: 'https://cdn.readmoo.com/cover/79/f9g5h51_210x315.jpg?v=1726108503',
    title: '爆彈 ：（附電子書專屬簽名扉頁，2023日本',
    author: '吳勝浩'
  },
  {
    id: 3,
    img: 'https://cdn.readmoo.com/cover/pr/vlziuzz_210x315.jpg?v=1725432040',
    title: '廚房裡的偽魚販',
    author: '林楷倫'
  },
  {
    id: 4,
    img: 'https://cdn.readmoo.com/cover/8f/ce6alcf_210x315.jpg?v=1725863314',
    title: '脆弱系統',
    author: '安德魯‧史都華（Andrew J. Stewart'
  },  
  {
    id: 5,
    img: 'https://cdn.readmoo.com/cover/in/ndkepie_210x315.jpg?v=1725592844',
    title: '連結 ：從石器時代到AI紀元',
    author: '哈拉瑞'
  },
  {
    id: 6,
    img: 'https://cdn.readmoo.com/cover/8f/ceeblb9_210x315.jpg?v=1721895988',
    title: '全知讀者視角11',
    author: 'sing N song'
  }

]

const Books = () => {
  return (
    <>
      <ul className={styles.bookList}>
        {bookList.map(book => (
          <li key={book.id}>
            <img src={book.img} alt={book.title} />
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
          </li>
        ))}
      </ul> 
    </>
  )
}


export default Books