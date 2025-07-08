import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import NavItems from "../NavItem";

const Menu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex flex-wrap items-center md:mt-6">
        {/* 漢堡選單按鈕 */}
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="flex items-center w-10 h-10 justify-center text-sm text-gray-500 
            rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 
          focus:ring-gray-300"
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
              <Link
                to="/books?category=popular_books"
                className="inline-flex items-center appearance-none py-2 px-3 text-gray-600 relative after:absolute after:bg-gray-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 dark:text-primary"
              >
                {t("popular_books")}
              </Link>
            </li>
            <li>
              <Link
                to="/books?category=ranking"
                className="inline-flex items-center appearance-none py-2 px-3 text-gray-600 relative after:absolute after:bg-gray-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 dark:text-primary"
              >
                {t("ranking")}
              </Link>
            </li>
            <li>
              <Link
                to="/books?category=recommended"
                className="inline-flex items-center appearance-none py-2 px-3 text-gray-600 relative after:absolute after:bg-gray-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 dark:text-primary"
              >
                {t("recommended_for_you")}
              </Link>
            </li>
            <li>
              <Link
                to="/books?category=must_reads"
                className="inline-flex items-center appearance-none py-2 px-3 text-gray-600 relative after:absolute after:bg-gray-500 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 dark:text-primary"
              >
                {t("must_reads")}
              </Link>
            </li>
          </ul>
        </div>

        <Drawer
          placement="top"
          onClose={() => setIsOpen(false)}
          open={isOpen}
          className="lg:hidden"
          title={<NavItems setIsOpen={setIsOpen}/>}
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/books?category=popular_books"
                  className="inline-flex items-center appearance-none
                            w-full text-left py-2 px-3 text-gray-500 
                            hover:text-gray-900 hover:bg-gray-50
                            rounded-lg transition-colors duration-200
                            dark:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t("popular_books")}
                </Link>
              </li>
              <li>
                <Link
                  to="/books?category=ranking"
                  className="inline-flex items-center appearance-none
                              w-full text-left py-2 px-3 text-gray-500 
                            hover:text-gray-900 hover:bg-gray-50
                            rounded-lg transition-colors duration-200
                            dark:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t("ranking")}
                </Link>
              </li>
              <li>
                <Link
                  to="/books?category=recommended"
                  className="inline-flex items-center appearance-none
                              w-full text-left py-2 px-3 text-gray-500 
                            hover:text-gray-900 hover:bg-gray-50
                            rounded-lg transition-colors duration-200
                            dark:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t("recommended_for_you")}
                </Link>
              </li>
              <li>
                <Link
                  to="/books?category=must_reads"
                  className="inline-flex items-center appearance-none
                              w-full text-left py-2 px-3 text-gray-500 
                            hover:text-gray-900 hover:bg-gray-50
                            rounded-lg transition-colors duration-200
                            dark:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t("must_reads")}
                </Link>
              </li>
            </ul>
          </Drawer>
      </div>
    </nav>
  );
};

export default Menu;