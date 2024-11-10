import { Moon, Sun, Monitor, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-700 bg-neutral-900/25">
      <div className="container mx-auto space-y-8 pb-32 pt-16">
        <div className="flex items-start justify-between">
          <h3 className="mb-4 text-xl font-bold uppercase">The Loot Vault</h3>
          {/* Developer */}
          <div>
            <h3 className="mb-4 font-bold">Developer</h3>
            <ul className="space-y-2">
              <li className="max-w-[22ch] text-neutral-400">
                Designed and developed by Edward Vonschondorf
              </li>
              <li>
                <a
                  href="https://edward-vonschondorf.dev"
                  target="_blank"
                  rel="noopener external"
                  className="flex w-max items-center gap-2 text-orange-500 hover:text-orange-400"
                >
                  <span>Edward-vonschondorf.dev</span>
                  <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Torvec"
                  target="_blank"
                  rel="noopener external"
                  className="flex w-max items-center gap-2 text-orange-500 hover:text-orange-400"
                >
                  <span>My GitHub</span>
                  <ExternalLink size={16} />
                </a>
              </li>
            </ul>
          </div>
          {/* API's Used */}
          <div>
            <h3 className="mb-4 font-bold">API&apos;s</h3>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex gap-2">
                Best Deals:
                <a
                  href="https://apidocs.cheapshark.com/"
                  target="_blank"
                  rel="noopener external"
                  className="flex w-max items-center gap-1 text-orange-500 hover:text-orange-400"
                >
                  <span>Cheapshark</span>
                  <ExternalLink size={16} />
                </a>
              </li>
              <li className="flex gap-2">
                Highest Rated/Search:
                <a
                  href="https://apidocs.cheapshark.com/"
                  target="_blank"
                  rel="noopener external"
                  className="flex w-max items-center gap-1 text-orange-500 hover:text-orange-400"
                >
                  <span>RAWG</span>
                  <ExternalLink size={16} />
                </a>
              </li>
              <li className="flex gap-2">
                Free Games:
                <a
                  href="https://www.gamerpower.com/api-read"
                  target="_blank"
                  rel="noopener external"
                  className="flex w-max items-center gap-1 text-orange-500 hover:text-orange-400"
                >
                  <span>Gamerpower</span>
                  <ExternalLink size={16} />
                </a>
              </li>
            </ul>
          </div>
          {/* Projec */}
          <div>
            <h3 className="mb-4 font-bold">Project</h3>
            <ul className="space-y-2 text-neutral-400">
              <li>Made with Next JS</li>
              <li>
                Based off of a coding bootcamp group Project:
                <ul className="flex gap-16 py-2">
                  <li>
                    <a
                      href="https://torvec.github.io/Loot-Vault/"
                      target="_blank"
                      rel="noopener external"
                      className="flex w-max items-center gap-1 text-orange-500 hover:text-orange-400"
                    >
                      <span>Loot Vault v1</span>
                      <ExternalLink size={16} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Torvec/Loot-Vault"
                      target="_blank"
                      rel="noopener external"
                      className="flex w-max items-center gap-1 text-orange-500 hover:text-orange-400"
                    >
                      <span>GitHub</span>
                      <ExternalLink size={16} />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {/* THEME TOGGLE */}
        <div className="flex justify-end gap-1">
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
    </footer>
  );
}
