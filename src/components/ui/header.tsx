import Link from "next/link";
import { Gamepad2, Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type Category, type Label } from "@/app/(games)/[category]/types";
import ThemeSelect from "./theme-select";

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
        className="flex items-center gap-2 text-lg hover:scale-110"
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
              className="block px-2 py-2 hover:bg-muted-foreground hover:text-background lg:inline lg:px-0 lg:py-0 lg:hover:bg-transparent lg:hover:text-foreground lg:hover:underline"
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

  const DropDownMenu = () => (
    <Popover>
      <PopoverTrigger className="lg:hidden">
        <Menu />
      </PopoverTrigger>
      <PopoverContent className="space-y-4 border-muted-foreground bg-secondary">
        <NavList />
        <ThemeSelect />
      </PopoverContent>
    </Popover>
  );

  return (
    <header className="border-b border-muted bg-background text-foreground">
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
