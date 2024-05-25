import Logo from "./Logo";
import Nav from "./nav/Nav";

export default function Header() {
  return (
    <header className="flex justify-between bg-slate-800 p-4">
      <Logo />
      <Nav />
    </header>
  );
}
