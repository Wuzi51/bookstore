import { useState } from 'react';
import Logo from "./Logo";
import NavItems from "./NavItem";
import SearchForm from "./SearchForm";
import Menu from "./Menu";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const DesktopHeader = () => (
    <div className="hidden md:flex flex-col p-6 w-full">
      <div className="flex justify-between items-center gap-14">
        <Logo />
        <div className="flex-1 max-w-xl">
          <SearchForm />
        </div>
        <nav className="hidden lg:block">
          <NavItems />
        </nav>
      </div>
      <div className="mt-4">
        <Menu />
      </div>
    </div>
  );

  const MobileHeader = () => (
    <div className="md:hidden">
      <div className="p-4 flex items-center justify-between">
        <Menu />
        <Logo />
        <button
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Toggle search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      {isSearchVisible && (
        <div className="p-4 border-t">
          <SearchForm />
        </div>
      )}
    </div>
  );

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
};

export default Header;