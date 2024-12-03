"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Menu, Moon, Sun, Scroll, Search } from "lucide-react";
import { Button } from "./buttons/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useThemeDispatch, useTheme } from "@/lib/theme-provider";

export default function Header() {
  return (
    <header className="border-b border-b-muted-foreground/25 bg-muted">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 xl:px-0">
        <div className="flex gap-12">
          <Logo />
          <div className="hidden lg:block">
            <NavBar />
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <SearchBarButton />
          <WishlistLinkIcon />
          <DropDownMenu />
          <div className="hidden lg:flex">
            <ThemeSelect />
          </div>
        </div>
      </div>
    </header>
  );
}

const Logo = () => (
  <Link
    href={"/"}
    prefetch={true}
    className="flex items-center gap-2 text-lg font-black text-foreground hover:text-muted-foreground"
  >
    <Gamepad2 size={22} />
    The Loot Vault
  </Link>
);

const NavBar = () => (
  <nav className="flex flex-col gap-4 text-sm uppercase lg:flex-row lg:items-center lg:justify-center">
    <NavLink href="/best-deals">Best Deals</NavLink>
    <NavLink href="/highest-rated">Highest Rated</NavLink>
    <NavLink href="/free-games">Free Games</NavLink>
    <div className="lg:hidden">
      <NavLink href="/wishlist">Wishlist</NavLink>
    </div>
  </nav>
);

const NavLink = ({ href, children }: { href: string; children: string }) => (
  <Link
    href={href}
    prefetch={true}
    className={`${
      usePathname().startsWith(href)
        ? "text-highlight lg:border-b lg:border-highlight"
        : ""
    } w-full px-2 lg:w-max lg:py-2 lg:hover:bg-muted-foreground/10 lg:hover:text-foreground`}
  >
    {children}
  </Link>
);

const SearchBarButton = () => {
  return (
    <Button className="rounded-full border border-muted-foreground/50 bg-background text-muted-foreground hover:border-foreground/50 hover:bg-background hover:text-foreground lg:space-x-24">
      <span className="hidden lg:inline">Search</span>
      <Search />
    </Button>
  );
};

const WishlistLinkIcon = () => {
  return (
    <Link
      href="/wishlist"
      className={`${usePathname().startsWith("/wishlist") ? "text-highlight" : ""} hidden hover:text-muted-foreground lg:inline`}
    >
      <Scroll size={20} />
    </Link>
  );
};

const ThemeSelect = () => {
  const dispatch = useThemeDispatch();
  const currentTheme = useTheme();

  return (
    <div className="divide-x">
      {currentTheme === "light" && (
        <Button
          onClick={() => dispatch({ type: "SET", theme: "dark" })}
          className="bg-muted-foreground/60 text-foreground hover:text-background"
          aria-label="Switch to dark theme"
          size="icon"
        >
          <Moon />
        </Button>
      )}
      {currentTheme === "dark" && (
        <Button
          onClick={() => dispatch({ type: "SET", theme: "light" })}
          className="bg-muted-foreground/60 text-foreground hover:text-background"
          aria-label="Switch to light theme"
          size="icon"
        >
          <Sun />
        </Button>
      )}
    </div>
  );
};

const DropDownMenu = () => {
  return (
    <Popover>
      <PopoverTrigger className="text-muted-foreground lg:hidden">
        <Menu />
      </PopoverTrigger>
      <PopoverContent className="space-y-4 border-muted-foreground bg-secondary">
        <NavBar />
        <ThemeSelect />
      </PopoverContent>
    </Popover>
  );
};
