import Link from "next/link";
import { Moon, Sun, Monitor, Gamepad2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

  const NavList = () => (
    <nav>
      <ul className="flex flex-col gap-2 font-medium lg:flex-row lg:items-center lg:justify-center lg:gap-8">
        {navLinks.map(({ href, label }) => (
          <li key={href} className="w-full lg:w-max">
            <Link
              href={`/${href}`}
              prefetch={true}
              className="block px-2 py-2 hover:bg-neutral-700 lg:inline lg:px-0 lg:py-0 lg:hover:bg-black lg:hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const MobileHidden: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <div className="hidden lg:block">{children}</div>;

  const ThemeSelect = () => (
    <div className="flex gap-1">
      <Button className="rounded-xl bg-neutral-800">
        <Moon size={24} />
      </Button>
      <Button className="rounded-xl bg-neutral-800">
        <Sun size={24} />
      </Button>
      <Button className="rounded-xl bg-neutral-800">
        <Monitor size={24} />
      </Button>
    </div>
  );

  const DropDownMenu = () => (
    <Popover>
      <PopoverTrigger className="lg:hidden">
        <Menu />
      </PopoverTrigger>
      <PopoverContent className="space-y-4 border-neutral-700 bg-black">
        <NavList />
        <ThemeSelect />
      </PopoverContent>
    </Popover>
  );

  return (
    <header className="border-b border-neutral-700">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-4 md:flex-row md:gap-0 xl:px-0">
        <Logo />
        <MobileHidden>
          <NavList />
        </MobileHidden>
        <MobileHidden>
          <ThemeSelect />
        </MobileHidden>
        <DropDownMenu />
      </div>
    </header>
  );
}
