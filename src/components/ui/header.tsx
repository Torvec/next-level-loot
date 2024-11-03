import Link from "next/link";
import { SunMoon } from "lucide-react";
import { Gamepad2 } from "lucide-react";

export default async function Header() {
  const navLinks = [
    {
      href: "/best-deals",
      label: "Best Deals",
    },
    {
      href: "/highest-rated",
      label: "Highest Rated",
    },
    {
      href: "/free-games",
      label: "Free Games",
    },
    {
      href: "/wishlist",
      label: "My Wishlist",
    },
    {
      href: "/about",
      label: "About",
    },
  ];

  return (
    <header className="border-b border-white">
      <div className="container mx-auto flex flex-col items-center justify-between py-4 md:flex-row">
        {/* LOGO */}
        <h1 className="font-bold uppercase">
          <Link href={"/"} className="flex items-center gap-2">
            <Gamepad2 size={24} />
            The Loot Vault
          </Link>
        </h1>
        {/* NAVIGATION */}
        <nav>
          <ul className="flex flex-wrap items-center justify-center gap-8 font-semibold">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* THEME TOGGLE */}
        <button className="flex items-center gap-1 rounded-lg bg-neutral-500 px-2 py-1.5 text-sm uppercase hover:bg-neutral-600">
          <SunMoon size={24} />
        </button>
      </div>
    </header>
  );
}
