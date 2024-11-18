import { ExternalLink, Gamepad2 } from "lucide-react";

export default function Footer() {
  const ExtLink = ({ href, children }: { href: string; children: string }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener external"
        className="flex w-max items-center gap-2 text-yellow-300 hover:text-yellow-500"
      >
        <span>{children}</span>
        <ExternalLink size={16} />
      </a>
    );
  };

  const LogoSection = () => (
    <div className="mb-8 flex gap-2">
      <Gamepad2 size={32} />
      <div>
        <h3 className="text-xl font-bold uppercase">The Loot Vault</h3>
        <h4 className="pl-1 text-sm text-muted-foreground">
          For Gamers on a Budget!
        </h4>
      </div>
    </div>
  );

  const ProjectSection = () => (
    <div>
      <h3 className="mb-4 font-bold">Project</h3>
      <ul className="space-y-1 text-muted-foreground">
        <li>Made with Next.js 15</li>
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

  const APISection = () => (
    <div>
      <h3 className="mb-4 font-bold">API&apos;s</h3>
      <ul className="space-y-1 text-muted-foreground">
        <li className="flex gap-2">
          Best Deals:
          <ExtLink href="https://apidocs.cheapshark.com/">Cheapshark</ExtLink>
        </li>
        <li className="flex gap-2">
          Highest Rated:
          <ExtLink href="https://api.rawg.io/docs/">RAWG</ExtLink>
        </li>
        <li className="flex gap-2">
          Free Games:
          <ExtLink href="https://www.gamerpower.com/api-read">
            Gamerpower
          </ExtLink>
        </li>
        <li className="flex gap-2">
          API Development/Testing:
          <ExtLink href="https://www.usebruno.com/">Bruno</ExtLink>
        </li>
      </ul>
    </div>
  );

  const DeveloperSection = () => (
    <div className="lg:col-start-2 xl:col-start-4">
      <h3 className="mb-4 font-bold">Developer</h3>
      <ul className="space-y-1 text-muted-foreground">
        <li className="text-pretty">
          Designed and developed by Edward Vonschondorf in 2024
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

  return (
    <footer className="border-t border-muted bg-primary-foreground">
      <div className="container mx-auto px-4 pb-32 pt-16 xl:px-0">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <LogoSection />
          <ProjectSection />
          <APISection />
          <DeveloperSection />
        </div>
      </div>
    </footer>
  );
}
