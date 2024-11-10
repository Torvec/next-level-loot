import Link from "next/link";
import SearchInput from "@/components/ui/search-input";
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
  ];

  return (
    <header className="border-b border-neutral-700">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 md:flex-row md:gap-0 xl:px-0">
        {/* LOGO */}
        <h1 className="font-bold uppercase">
          <Link
            href={"/"}
            prefetch={true}
            className="flex items-center gap-2 text-lg"
          >
            <Gamepad2 size={24} />
            The Loot Vault
          </Link>
        </h1>

        {/* NAVIGATION */}
        <nav>
          <ul className="hidden font-medium lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} prefetch={true} className="hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* SEARCH */}
        <SearchInput />
      </div>
    </header>
  );
}
