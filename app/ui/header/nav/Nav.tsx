// TODO: Add links to different section
// TODO: Get a drop down menu for small screens
// TODO: Add search functionality

import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/free-games">Free Games</Link>
        </li>
        <li>
          <Link href="">Link</Link>
        </li>
        <li>
          <Link href="">Link</Link>
        </li>
        <li>
          <Link href="">Link</Link>
        </li>
      </ul>
    </nav>
  );
}
