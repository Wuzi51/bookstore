import "./index.css"

const Category = ({ title }) => {
  return (
    <div className="category">
      <h2>{title}</h2>
      <button>More</button>
    </div>
   
  )
}

export default Category