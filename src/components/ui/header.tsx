"use client";

import { useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, Bookmark, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useThemeDispatch, useTheme } from "@/components/providers/theme-provider";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="border-b border-b-muted-foreground/25 bg-muted">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 xl:px-0">
        <div className="flex items-center gap-12">
          <Logo />
          <div className="hidden lg:block">
            <NavBar />
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <SearchDialogButton onClick={() => setIsDialogOpen(true)} />
          <SearchDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
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
    className="block bg-gradient-to-r from-gradient-3 via-gradient-2 to-gradient-1 bg-clip-text font-black uppercase text-transparent hover:bg-gradient-to-l sm:text-xl"
  >
    Next-Level-Loot
  </Link>
);

const NavBar = () => (
  <nav className="flex flex-col gap-6 text-sm uppercase lg:flex-row lg:items-center lg:justify-center">
    <div className="lg:hidden">
      <NavLink href="/">Home</NavLink>
    </div>
    <NavLink href="/deals">Deals</NavLink>
    <NavLink href="/giveaways">Giveaways</NavLink>
    <NavLink href="/games">Games</NavLink>
    <div className="lg:hidden">
      <NavLink href="/wishlist">Wishlist</NavLink>
    </div>
  </nav>
);

const NavLink = ({ href, children }: { href: string; children: string }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      prefetch={true}
      className={`${
        pathname === href ? "text-highlight" : ""
      } w-full px-4 lg:w-max lg:rounded-xl lg:py-3 lg:hover:bg-muted-foreground/20 lg:hover:text-highlight`}
    >
      {children}
    </Link>
  );
};

const SearchDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <SearchForm onSearch={handleCloseDialog} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SearchDialogButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-full border border-muted-foreground/50 bg-background text-muted-foreground hover:border-foreground/50 hover:bg-background hover:text-foreground lg:space-x-24"
    >
      <span className="hidden lg:inline">Search</span>
      <Search />
    </Button>
  );
};

const SearchForm = ({ onSearch }: { onSearch: () => void }) => {
  const [path, setPath] = useState("deals");
  const [placeholder, setPlaceholder] = useState("Find deals...");
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update search term
  };

  return (
    <Form action={`/${path}`} onSubmit={onSearch} className="space-y-4">
      <div className="relative w-full">
        <Input
          name="searchTerm"
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="rounded-xl bg-muted pr-10 text-muted-foreground"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-0 top-0 h-full rounded-l-none rounded-r-xl bg-muted hover:bg-background"
          disabled={!searchTerm.trim()}
        >
          <Search className="size-4 text-highlight" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <RadioGroup
        defaultValue={path}
        className="flex gap-4"
        onValueChange={(value) => {
          setPath(value);
          setPlaceholder(value === "deals" ? "Find deals..." : "Find games...");
        }}
      >
        <RadioItem value="deals">Deals</RadioItem>
        <RadioItem value="games">Games</RadioItem>
      </RadioGroup>
    </Form>
  );
};

const RadioItem = ({ value, children }: { value: string; children: string }) => {
  return (
    <div className="flex gap-2">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{children}</Label>
    </div>
  );
};

const WishlistLinkIcon = () => {
  return (
    <Link
      href="/wishlist"
      className={`${usePathname().startsWith("/wishlist") ? "text-highlight" : ""} hidden hover:text-muted-foreground lg:inline`}
    >
      <Bookmark size={20} aria-label="My Wishlist" />
    </Link>
  );
};

const ThemeSelect = () => {
  const dispatch = useThemeDispatch();
  const currentTheme = useTheme();

  return (
    <div className="pl-4 lg:pl-0">
      {currentTheme === "light" && (
        <Button
          onClick={() => dispatch({ type: "SET", theme: "dark" })}
          className="bg-muted-foreground/50 text-foreground hover:text-background"
          aria-label="Switch to dark theme"
          size="icon"
        >
          <Moon />
        </Button>
      )}
      {currentTheme === "dark" && (
        <Button
          onClick={() => dispatch({ type: "SET", theme: "light" })}
          className="bg-muted-foreground/50 text-foreground hover:text-background"
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
