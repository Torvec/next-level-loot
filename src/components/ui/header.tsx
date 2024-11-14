import Link from "next/link";
import { Moon, Sun, Monitor, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Category, type Label } from "@/app/(games)/[category]/types";

type NavLink = { href: Category; label: Label };

export default async function Header() {
  const navLinks: NavLink[] = [
    {
      href: "best-deals",
      label: "Best Deals",
    },
    {
      href: "highest-rated",
      label: "Highest Rated",
    },
    {
      href: "free-games",
      label: "Free Games",
    },
    {
      href: "wishlist",
      label: "My Wishlist",
    },
  ];

  const Logo = () => (
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
  );

  const Navigation = () => (
    <nav>
      <ul className="hidden font-medium lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-8">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={`/${href}`} prefetch={true} className="hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const ThemeToggle = () => (
    <div className="flex gap-1">
      <Button className="rounded-xl bg-neutral-900">
        <Moon size={24} />
      </Button>
      <Button className="rounded-xl bg-neutral-900">
        <Sun size={24} />
      </Button>
      <Button className="rounded-xl bg-neutral-900">
        <Monitor size={24} />
      </Button>
    </div>
  );

  return (
    <header className="border-b border-neutral-700">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 md:flex-row md:gap-0 xl:px-0">
        <Logo />
        <Navigation />
        <ThemeToggle />
      </div>
    </header>
  );
}
