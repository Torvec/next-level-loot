import { ExternalLink, Package } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 pb-24 pt-16 xl:px-0">
        <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <LogoSection />
          <ProjectSection />
          <APISection />
          <DeveloperSection />
        </div>
        <div className="flex flex-col gap-2 border-t border-t-muted-foreground/25 pt-4 text-sm md:flex-row md:gap-8">
          <SiteMapSection />
          <span className="text-muted-foreground md:ml-auto">2024</span>
        </div>
      </div>
    </footer>
  );
}

const LogoSection = () => {
  return (
    <div className="flex gap-2">
      <Package size={22} />
      <div>
        <h3 className="font-bold uppercase">Next-Level-Loot</h3>
      </div>
    </div>
  );
};

const ProjectSection = () => {
  return (
    <div>
      <h3 className="mb-4 font-bold">Project</h3>
      <ul className="space-y-1 text-pretty text-muted-foreground">
        <li>Made with Next.js 15 &amp; React 19</li>
        <li className="flex gap-2">
          GitHub:
          <ExtLink href="https://github.com/Torvec/loot_vault_next">
            Repository
          </ExtLink>
        </li>
        <li className="text-pretty">
          Based on my first UC Berkeley coding bootcamp group project:
        </li>
        <li>
          <ExtLink href="https://torvec.github.io/Loot-Vault/">
            Loot Vault v1 Site
          </ExtLink>
        </li>
        <li>
          <ExtLink href="https://github.com/Torvec/Loot-Vault">
            Loot Vault v1 Repository
          </ExtLink>
        </li>
      </ul>
    </div>
  );
};

const APISection = () => {
  const apilinks = [
    {
      text: "Deals",
      href: "https://apidocs.cheapshark.com/",
      linktext: "Cheapshark",
    },
    {
      text: "Games",
      href: "https://api.rawg.io/docs/",
      linktext: "RAWG",
    },
    {
      text: "Giveaways",
      href: "https://www.gamerpower.com/api-read",
      linktext: "Gamerpower",
    },
    {
      text: "API Dev/Testing",
      href: "https://www.usebruno.com/",
      linktext: "Bruno",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 font-bold">API&apos;s</h3>
      <ul className="space-y-1 text-muted-foreground">
        {apilinks.map(({ text, href, linktext }) => (
          <li key={text} className="flex gap-2">
            {text}:<ExtLink href={href}>{linktext}</ExtLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DeveloperSection = () => {
  return (
    <div>
      <h3 className="mb-4 font-bold">Developer</h3>
      <ul className="space-y-1 text-muted-foreground">
        <li className="text-pretty">
          Designed and developed by Edward Vonschondorf
        </li>
        <li>
          <ExtLink href="https://edward-vonschondorf.dev">
            Edward-vonschondorf.dev
          </ExtLink>
        </li>
        <li className="flex gap-8">
          <ExtLink href="https://github.com/Torvec">Github</ExtLink>
          <span>|</span>
          <ExtLink href="https://www.linkedin.com/in/edward-vonschondorf/">
            LinkedIn
          </ExtLink>
        </li>
      </ul>
    </div>
  );
};

const SiteMapSection = () => {
  const navlinks = [
    { href: "/", text: "Home" },
    { href: "/deals", text: "Deals" },
    { href: "/games", text: "Games" },
    { href: "/giveaways", text: "Giveaways" },
    { href: "/wishlist", text: "Wishlist" },
  ];

  return (
    <nav className="flex flex-col gap-2 md:flex-row lg:gap-8">
      <h3 className="text-muted-foreground">Site Map:</h3>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 md:flex-row lg:gap-8">
        {navlinks.map(({ href, text }) => (
          <li key={href}>
            <Link
              href={href}
              prefetch={true}
              className="text-highlight hover:text-foreground"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ExtLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener external"
      className="flex w-max items-center gap-2 text-highlight hover:text-foreground"
    >
      <span>{children}</span>
      <ExternalLink size={16} />
    </a>
  );
};
