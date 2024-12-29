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
      className="cursor-pointer w-full focus:outline-none md:mt-4"
    >
      <img
        src={logo}
        alt="logo"
        className="w-full h-auto max-w-60 min-w-44 object-contain md:max-w-[400px]"
      />
    </div>
  );
};

export default Logo;
