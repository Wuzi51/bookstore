import { useTranslation } from "react-i18next";

const Category = ({ title }) => {
  const { t } = useTranslation();
  return (
    <div className="m-5 flex justify-between items-center">
      <h2 className="text-xl mt-4 text-gray-500">{t(title)}</h2>
    </div>
  );
}

export default Category;
