import { useNavigate } from "react-router-dom"
import "./index.css"

const Book = () => {
  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
  }
  return (
    <div className="flex mt-3">
      <div className="col-sm-3 col-12 mx-3 ">
        <img src="https://cdn.readmoo.com/cover/64/2384g0a_460x580.jpg?v=1611886148" alt="cover" />
        <div className="flex mt-2">
          <p className="mr-5" onClick={() => changePage('/')}>5677 則劃線</p>
          <p onClick={() => changePage('/')}>50篇評論</p>
        </div>
      </div>
      <div className="col-sm-6 col-12 book-info">
        <div>
          <h2 className="text-xl mb-4">山茶花文具店</h2>
          <h3 className="mb-2">作者：小川糸</h3>
          <ul className="flex mb-3">
            <li>出版日期： 2017/08/01</li>
            <li>語言：繁體中文</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2">簡介</h4>
          <ul>
            <li>★超越森見登美彥、西加奈子、原田舞葉等知名作家，榮獲2017本屋大賞TOP4的暖心物語！</li>
            <li>★作者小川糸以自己在鎌倉居住的經驗為基礎打造的最新長篇作品！書中附有手繪鎌倉導覽圖與十六封手寫書信，將手寫的溫度與感動表達得淋漓盡致！</li>
            <li>★2017年4月，NHK改編為日劇《山茶花文具店──鎌倉代筆人物語》，由多部未華子主演。</li>
            <li>★小野（作家）、銀色快手（荒野夢二書店店主）、石芳瑜（永樂座書店店主）、夏琳（南崁1567小書店店主）、張鐵志（作家）、羅素素（晃晃書店店主）　有溫度推薦</li>
            <li>★喜歡和風、喜歡文具與書信，也喜歡美食的人必讀的一冊！</li>
          </ul>
        </div>
      </div>
      <div className="col-sm-3 col-12 action-btn ">
        <button className="buy-btn" onClick={() => changePage('/')}><i></i>購買</button>
        <button className="add-to-cart-btn" onClick={() => changePage('/')}>新增至購物車</button>
        <button className="favorite-btn" onClick={() => changePage('/')}>加入收藏</button>
      </div>
    </div>
  )
}

export default Book

