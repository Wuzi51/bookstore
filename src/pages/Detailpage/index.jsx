import Book from "@/components/BookCard"
import React, { useState } from 'react';
import "./index.css"

const bookList = [
  {
    id: 1,
    img: 'https://cdn.readmoo.com/cover/im/fniapqm_210x315.jpg?v=1727147830',
    title: '魔術師',
    author: '柯姆・托賓',
    price: 'NT$ 296',
    date: '2024/09/20'
  },
  {
    id: 2,
    img: 'https://cdn.readmoo.com/cover/79/f9g5h51_210x315.jpg?v=1726108503',
    title: '爆彈 ：（附電子書專屬簽名扉頁，2023日本',
    author: '吳勝浩',
    price: 'NT$ 296',
    date: '2024/09/11'
  },
  {
    id: 3,
    img: 'https://cdn.readmoo.com/cover/pr/vlziuzz_210x315.jpg?v=1725432040',
    title: '廚房裡的偽魚販',
    author: '林楷倫',
    price: 'NT$ 266',
    date: '2024/08/30'
  },
  {
    id: 4,
    img: 'https://cdn.readmoo.com/cover/8f/ce6alcf_210x315.jpg?v=1725863314',
    title: '脆弱系統',
    author: '安德魯‧史都華（Andrew J. Stewart）',
    price: 'NT$ 460',
    date: '2024/09/10'
  },  
  {
    id: 5,
    img: 'https://cdn.readmoo.com/cover/in/ndkepie_210x315.jpg?v=1725592844',
    title: '連結 ：從石器時代到AI紀元',
    author: '哈拉瑞',
    price: 'NT$ 525',
    date: '2024/09/10'
  },
  {
    id: 6,
    img: 'https://cdn.readmoo.com/cover/eb/eafhnlc_210x315.jpg?v=1727660614',
    title: '超預期壽命',
    author: '彼得．阿提亞',
    price: 'NT$ 750',
    date: '2024/10/02'
  }
]

const DetailPage = () => {
  const [sortOrder, setSortOrder] = useState('');

  const handleChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedBooks = [...bookList]
    .sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(a.publication_date) - new Date(b.publication_date); 
      }
      return a.title.localeCompare(b.title) 
    });

  return (
    <>
      <div>
        <div className="m-4">
          <select className="border-2" onChange={handleChange} value={sortOrder}>
            <option value="title">依書名排序</option>
            <option value="date">依出版日期排序</option>
          </select>
        </div>
        <div className="book-list">
          {sortedBooks.map(book => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailPage