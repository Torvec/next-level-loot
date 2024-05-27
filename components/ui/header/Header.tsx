import Logo from "./Logo";
import Nav from "./nav/Nav";
import Search from "./search/Search";

export default function Header() {
  return (
    <header className="bg-slate-800 px-4 py-4 md:px-0">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <Nav />
        <Search />
      </div>
    </header>
  );
}
