// TODO: Get a drop down menu for small screens

import Link from "next/link";

export default function Nav() {
  const navLinkContent = [
    { route: "/free-games", displayText: "Free Games" },
    { route: "/best-deals", displayText: "Best Deals" },
    { route: "/highest-rated", displayText: "Highest Rated" },
    { route: "/wishlist", displayText: "Wishlist" },
  ];

  const NavLinkItem = ({
    route,
    displayText,
  }: {
    route: string;
    displayText: string;
  }) => {
    return (
      <li>
        <Link
          href={route}
          className="px-8 py-2 font-bold text-slate-200 transition-colors duration-300 ease-in-out hover:bg-white/10 hover:text-yellow-400"
        >
          {displayText}
        </Link>
      </li>
    );
  };

  const NavLinkList = () => {
    return (
      <ul className="hidden md:flex">
        {navLinkContent.map(({ route, displayText }, index) => (
          <NavLinkItem key={index} route={route} displayText={displayText} />
        ))}
      </ul>
    );
  };

  return (
    <nav>
      <NavLinkList />
    </nav>
  );
}
