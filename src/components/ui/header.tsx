import Link from "next/link";
import { Moon, Sun, Monitor, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slug = "best-deals" | "highest-rated" | "free-games" | "wishlist";

type Category = "Best Deals" | "Highest Rated" | "Free Games" | "My Wishlist";

type NavLink = { slug: Slug; category: Category };

const navLinks: NavLink[] = [
  {
    slug: "best-deals",
    category: "Best Deals",
  },
  {
    slug: "highest-rated",
    category: "Highest Rated",
  },
  {
    slug: "free-games",
    category: "Free Games",
  },
  {
    slug: "wishlist",
    category: "My Wishlist",
  },
];

export default async function Header() {
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
        {navLinks.map(({ slug, category }) => (
          <li key={slug}>
            <Link href={`/${slug}`} prefetch={true} className="hover:underline">
              {category}
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
