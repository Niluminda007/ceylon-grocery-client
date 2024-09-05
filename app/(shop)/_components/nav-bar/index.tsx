import NavCategories from "./nav-categories";
import NavLogo from "./nav-logo";
import NavActionsBar from "./nav-actions-bar";
import SearchButton from "./search-button";
import MobileMenu from "../mobile-menu";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 z-[20] w-full px-4 md:px-8 lg:px-16 py-4  shadow-xl flex justify-between items-center">
      <NavLogo />
      <div className="hidden gap-8  md:flex relative">
        <SearchButton />
        <NavCategories />
        <NavActionsBar />
      </div>
      <div className="flex gap-8  md:hidden relative">
        <NavActionsBar />
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
