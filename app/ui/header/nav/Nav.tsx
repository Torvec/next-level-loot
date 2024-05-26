// TODO: Add links to different section
// TODO: Get a drop down menu for small screens
// TODO: Add search functionality

import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <Link href="/free-games">Free Games</Link>
        </li>
        <li>
          <Link href="/best-deals">Best Deals</Link>
        </li>
        <li>
          <Link href="/highest-rated">Highest Rated</Link>
        </li>
        <li>
          <Link href="/wishlist">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
}
