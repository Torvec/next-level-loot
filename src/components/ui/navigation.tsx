"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Routes, type Label } from "@/app/(games)/[category]/types";
type NavLink = { href: Routes; label: Label };

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

export default function Navigation() {
  const pathname = usePathname();

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
