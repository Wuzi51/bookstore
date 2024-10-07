import Category from "../Category"
import Book from "../Book"
import "./index.css"
import { useNavigate } from "react-router-dom"

const bookList = [
  {
    id: 1,
    img: 'https://cdn.readmoo.com/cover/im/fniapqm_210x315.jpg?v=1727147830',
    title: '魔術師',
    author: '柯姆・托賓',
    price: 'NT$ 296'
  },
  {
    id: 2,
    img: 'https://cdn.readmoo.com/cover/79/f9g5h51_210x315.jpg?v=1726108503',
    title: '爆彈 ：（附電子書專屬簽名扉頁，2023日本',
    author: '吳勝浩',
    price: 'NT$ 296'
  },
  {
    id: 3,
    img: 'https://cdn.readmoo.com/cover/pr/vlziuzz_210x315.jpg?v=1725432040',
    title: '廚房裡的偽魚販',
    author: '林楷倫',
     price: 'NT$ 266'
  },
  {
    id: 4,
    img: 'https://cdn.readmoo.com/cover/8f/ce6alcf_210x315.jpg?v=1725863314',
    title: '脆弱系統',
    author: '安德魯‧史都華（Andrew J. Stewart）',
    price: 'NT$ 460'
  },  
  {
    id: 5,
    img: 'https://cdn.readmoo.com/cover/in/ndkepie_210x315.jpg?v=1725592844',
    title: '連結 ：從石器時代到AI紀元',
    author: '哈拉瑞',
    price: 'NT$ 525'
  },
  {
    id: 6,
    img: 'https://cdn.readmoo.com/cover/eb/eafhnlc_210x315.jpg?v=1727660614',
    title: '超預期壽命',
    author: '彼得．阿提亞',
    price: 'NT$ 750'
  }
]

const Main = () => {
  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
  }
  return (
    <>
      <div className="banner" onClick={() => changePage('/')}>
        <img src="https://cdn.readmoo.com/store/template/4857/full_banner/image_l.jpg?t=1727428846" alt="banner" />  
      </div>
      <div>
        <Category title='本日精選'/>
      <div className="book-list">
        {bookList.map(book => (
          <Book book={book} key={book.id}/>
        ))}
      </div>
      </div>
    </>
  )
}
  

export default Main