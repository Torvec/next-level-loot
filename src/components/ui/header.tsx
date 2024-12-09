"use client";

import { useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, Bookmark, Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  useThemeDispatch,
  useTheme,
} from "@/components/providers/theme-provider";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    className="flex items-center gap-2 text-base font-black uppercase text-highlight hover:text-muted-foreground sm:text-lg"
  >
    <Package size={22} />
    Next-Level-Loot
  </Link>
);

const NavBar = () => (
  <nav className="flex flex-col gap-4 text-sm uppercase lg:flex-row lg:items-center lg:justify-center">
    <NavLink href="/deals">Deals</NavLink>
    <NavLink href="/games">Games</NavLink>
    <NavLink href="/giveaways">Giveaways</NavLink>
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

const SearchDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
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

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  return (
    <Form action={`/${path}`} onSubmit={onSearch} className="space-y-4">
      <div className="relative w-full">
        <Input
          name="searchTerm"
          type="search"
          placeholder="Find deals or games.."
          className="rounded-xl bg-muted pr-10 text-muted-foreground"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-0 top-0 h-full rounded-l-none rounded-r-xl bg-muted text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <RadioGroup
        defaultValue={path}
        className="flex gap-4"
        onChange={handleRadioChange}
      >
        <RadioItem value="deals">Deals</RadioItem>
        <RadioItem value="games">Games</RadioItem>
      </RadioGroup>
    </Form>
  );
};

const RadioItem = ({
  value,
  children,
}: {
  value: string;
  children: string;
}) => {
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
      <Bookmark size={20} />
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
