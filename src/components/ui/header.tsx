"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Routes, type Label } from "@/lib/types";
import { Gamepad2, Menu, Moon, Sun } from "lucide-react";
import { Button } from "./buttons/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useThemeDispatch } from "@/lib/theme-provider";

function Logo() {
  return (
    <Link
      href={"/"}
      prefetch={true}
      className="flex items-center gap-2 text-lg font-bold uppercase text-foreground hover:text-muted-foreground"
    >
      <Gamepad2 size={24} />
      The Loot Vault
    </Link>
  );
}

function Navigation() {
  const pathname = usePathname();

  const navLinks: { href: Routes; label: Label }[] = [
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

  return (
    <nav>
      <ul className="flex flex-col font-medium lg:flex-row lg:items-center lg:justify-center">
        {navLinks.map(({ href, label }) => (
          <li key={href} className="w-full lg:w-max">
            <Link
              href={`/${href}`}
              prefetch={true}
              className={`${
                pathname.startsWith(`/${href}`)
                  ? "text-gold-foreground lg:border-b-2 lg:border-gold-foreground"
                  : ""
              } block p-4 hover:bg-muted-foreground/75 hover:text-gold lg:inline lg:py-2 lg:hover:border-b-2 lg:hover:border-muted-foreground lg:hover:bg-transparent lg:hover:text-foreground`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ThemeSelect() {
  const dispatch = useThemeDispatch();

  return (
    <div className="divide-x">
      <Button
        onClick={() => dispatch({ type: "SET", theme: "dark" })}
        className="rounded-l-xl rounded-r-none bg-muted-foreground"
        aria-label="Switch to dark theme"
      >
        <Moon />
      </Button>
      <Button
        onClick={() => dispatch({ type: "SET", theme: "light" })}
        className="rounded-l-none rounded-r-xl bg-muted-foreground"
        aria-label="Switch to light theme"
      >
        <Sun />
      </Button>
    </div>
  );
}

function DropDownMenu() {
  return (
    <Popover>
      <PopoverTrigger className="lg:hidden">
        <Menu />
      </PopoverTrigger>
      <PopoverContent className="space-y-4 border-muted-foreground bg-secondary">
        <Navigation />
        <ThemeSelect />
      </PopoverContent>
    </Popover>
  );
}

export default function Header() {
  return (
    <header className="border-b bg-muted text-muted-foreground">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-4 md:flex-row md:gap-0 xl:px-0">
        <Logo />
        <div className="hidden lg:block">
          <Navigation />
        </div>
        <div className="hidden lg:block">
          <ThemeSelect />
        </div>
        <DropDownMenu />
      </div>
    </header>
  );
}
