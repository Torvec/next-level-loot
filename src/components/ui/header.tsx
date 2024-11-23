import Link from "next/link";
import { Gamepad2, Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navigation from "./navigation";
import ThemeSelect from "./theme-select";

export default async function Header() {
  const Logo = () => (
    <Link
      href={"/"}
      prefetch={true}
      className="flex items-center gap-2 text-lg font-bold uppercase text-foreground hover:text-muted-foreground"
    >
      <Gamepad2 size={24} />
      The Loot Vault
    </Link>
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
        <Navigation />
        <ThemeSelect />
      </PopoverContent>
    </Popover>
  );

  return (
    <header className="border-b bg-muted text-muted-foreground">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-4 md:flex-row md:gap-0 xl:px-0">
        <Logo />
        <MobileHidden>
          <Navigation />
        </MobileHidden>
        <MobileHidden>
          <ThemeSelect />
        </MobileHidden>
        <DropDownMenu />
      </div>
    </header>
  );
}
