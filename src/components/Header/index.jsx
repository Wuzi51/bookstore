import Logo from "./Logo";
import NavItem from "./NavItem";
import SearchForm from "./SearchForm";
import Menu from "./Menu";

// 桌機版
const DesktopHeader = () => (
  <div className="hidden lg:block">
    <div className="lg:flex items-center justify-around w-full mb-3">
      <Logo />
      <SearchForm />
      <nav className="mt-2">
        <NavItem />
      </nav>
    </div>
    <div className="ml-14">
      <Menu/>
    </div>
  </div>
);

// 行動裝置
const MobileHeader = () => (
  <div className="flex flex-col mb-3 lg:hidden">
    <div className="flex w-full items-center">
      <div className="flex-shrink-0 mx-auto">
        <Menu />
      </div>
      <div className="flex-grow flex justify-center items-center">
        <Logo />
      </div>
    </div>
    <div className="mt-2">
      <SearchForm />
    </div>
  </div>
);


const Header = () => {
  return (
    <header className="p-5 shadow-lg mx-auto">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
};

export default Header;
