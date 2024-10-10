import { useTranslation } from "react-i18next"
import "./index.css"

const Category = ({ title }) => {
  const { t } = useTranslation()
  return (
    <div className="category">
      <h2>{t(title)}</h2>
      <button>More</button>
    </div>
   
  )
}

export default Category