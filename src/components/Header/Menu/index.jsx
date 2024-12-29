import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Drawer } from "antd";
import NavItems from "../NavItem";

const Menu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changePage = (category) => {
    navigate(`/books?category=${category}`);
    setIsOpen(false);
  };

  return (
    <nav className="border-gray-200 mr-8">
      <div className="flex flex-wrap items-center md:mt-6">
        {/* 漢堡選單按鈕 */}
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
            rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none 
            focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="hidden lg:block">
          <ul className="flex space-x-8">
            <li>
              <button
                className="py-2 px-3 text-gray-500 hover:text-gray-900 
                          transition-colors duration-200"
                onClick={() => changePage("all_categories")}
              >
                {t("all_categories")}
              </button>
            </li>
            <li>
              <button
                className="py-2 px-3 text-gray-500 hover:text-gray-900 
                          transition-colors duration-200"
                onClick={() => changePage("ranking")}
              >
                {t("ranking")}
              </button>
            </li>
            <li>
              <button
                className="py-2 px-3 text-gray-500 hover:text-gray-900 
                          transition-colors duration-200"
                onClick={() => changePage("recommended")}
              >
                {t("recommended_for_you")}
              </button>
            </li>
            <li>
              <button
                className="py-2 px-3 text-gray-500 hover:text-gray-900 
                          transition-colors duration-200"
                onClick={() => changePage("sitewide")}
              >
                {t("sitewide_events")}
              </button>
            </li>
          </ul>
        </div>

        <Drawer
          placement="top"
          onClose={() => setIsOpen(false)}
          open={isOpen}
          className="lg:hidden"
          title={<NavItems/>}
        >
          <ul className="flex flex-col space-y-4">
            <li>
              <button
                className="w-full text-left py-2 px-3 text-gray-500 
                          hover:text-gray-900 hover:bg-gray-50
                          rounded-lg transition-colors duration-200"
                onClick={() => changePage("all_categories")}
              >
                {t("all_categories")}
              </button>
            </li>
            <li>
              <button
                className="w-full text-left py-2 px-3 text-gray-500 
                          hover:text-gray-900 hover:bg-gray-50
                          rounded-lg transition-colors duration-200"
                onClick={() => changePage("ranking")}
              >
                {t("ranking")}
              </button>
            </li>
            <li>
              <button
                className="w-full text-left py-2 px-3 text-gray-500 
                          hover:text-gray-900 hover:bg-gray-50
                          rounded-lg transition-colors duration-200"
                onClick={() => changePage("recommended")}
              >
                {t("recommended_for_you")}
              </button>
            </li>
            <li>
              <button
                className="w-full text-left py-2 px-3 text-gray-500 
                          hover:text-gray-900 hover:bg-gray-50
                          rounded-lg transition-colors duration-200"
                onClick={() => changePage("sitewide")}
              >
                {t("sitewide_events")}
              </button>
            </li>
          </ul>
        </Drawer>
      </div>
    </nav>
  );
};

export default Menu;