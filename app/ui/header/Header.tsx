import Logo from "./Logo";
import Nav from "./nav/Nav";
import Search from "./search/Search";

export default function Header() {
  return (
    <header className="bg-slate-800 p-4">
      <div className="container mx-auto flex items-baseline justify-between">
        <Logo />
        <Nav />
        <Search />
      </div>
    </header>
  );
}
