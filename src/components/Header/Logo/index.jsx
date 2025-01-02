import { useNavigate } from "react-router-dom";
import logo from "@/images/bookstore-high-resolution-logo-transparent.png";

const Logo = () => {
  const navigate = useNavigate();
  const changePage = (url) => {
    navigate(url);
  };

  return (
    <div
      onClick={() => changePage("/")}
      className="flex items-center cursor-pointer md:mt-4"
    >
      <img
        src={logo}
        alt="logo"
        className="w-auto h-auto max-w-52 min-w-52 md:max-w-72"
      />
    </div>
  );
};

export default Logo;
