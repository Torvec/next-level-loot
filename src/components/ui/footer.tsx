import { Moon, Sun, Monitor, ExternalLink, Code, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const ExtLink = ({ href, children }: { href: string; children: string }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener external"
        className="flex w-max items-center gap-2 text-yellow-300 hover:text-yellow-400"
      >
        <span>{children}</span>
        <ExternalLink size={16} />
      </a>
    );
  };

  return (
    <footer className="border-t border-neutral-700 bg-neutral-900/25">
      <div className="container mx-auto space-y-16 pb-32 pt-16">
        <div className="flex items-start justify-between">
          {/* Logo */}
          <h3 className="mb-4 flex w-1/4 items-center gap-2 text-xl font-bold uppercase">
            <Gamepad2 size={24} />
            The Loot Vault
          </h3>

          {/* Project */}
          <div className="w-1/4">
            <h3 className="mb-4 font-bold">Project</h3>
            <ul className="space-y-2 text-neutral-400">
              <li>Made with Next JS</li>
              <li className="flex gap-2">
                GitHub:
                <ExtLink href="https://github.com/Torvec/loot_vault_next">
                  Repository
                </ExtLink>
              </li>
              <li className="text-pretty">
                Based off of my first coding bootcamp group project:
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
          {/* API's Used */}
          <div className="w-1/4">
            <h3 className="mb-4 font-bold">API&apos;s</h3>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex gap-2">
                Best Deals:
                <ExtLink href="https://apidocs.cheapshark.com/">
                  Cheapshark
                </ExtLink>
              </li>
              <li className="flex gap-2">
                Highest Rated:
                <ExtLink href="https://api.rawg.io/docs/">RAWG</ExtLink>
              </li>
              <li className="flex gap-2">
                Search:
                <ExtLink href="https://api.rawg.io/docs/">RAWG</ExtLink>
              </li>
              <li className="flex gap-2">
                Free Games:
                <ExtLink href="https://www.gamerpower.com/api-read">
                  Gamerpower
                </ExtLink>
              </li>
            </ul>
          </div>
          {/* Developer */}
          <div className="w-1/4">
            <h3 className="mb-4 font-bold">Developer</h3>
            <ul className="space-y-2">
              <li className="text-neutral-400">
                Designed and developed by Edward Vonschondorf
              </li>
              <li>
                <ExtLink href="https://edward-vonschondorf.dev">
                  Edward-vonschondorf.dev
                </ExtLink>
              </li>
              <li>
                <ExtLink href="https://github.com/Torvec">My Github</ExtLink>
              </li>
            </ul>
          </div>
        </div>
        {/* THEME TOGGLE */}
        <div className="flex justify-between">
          <h4 className="flex gap-2 text-sm text-neutral-500">
            <Code size={20} />
            <span>2024</span>
          </h4>
          <div className="flex gap-1">
            <Button className="rounded-xl bg-neutral-900">
              <Moon size={24} />
            </Button>
            <Button className="rounded-xl bg-neutral-900">
              <Sun size={24} />
            </Button>
            <Button className="rounded-xl bg-neutral-900">
              <Monitor size={24} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
