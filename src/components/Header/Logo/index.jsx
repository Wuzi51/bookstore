import { Link } from 'react-router-dom';
import logo from '@/images/bookstore-high-resolution-logo-transparent.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center cursor-pointer md:mt-4">
      <img src={logo} alt="logo" className="w-auto h-auto max-w-52 md:max-w-72" />
    </Link>
  );
};

export default Logo;
