import { SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-700">
      <div className="container mx-auto flex items-start justify-between pb-16 pt-8">
        <div>
          <p>&copy; 2024 Loot Vault</p>
          <p>Designed and Developed by Edward Vonschondorf</p>
          <p>
            <a
              href="https://edward-vonschondorf.dev"
              target="_blank"
              rel="noopener external"
              className="text-orange-500 hover:text-orange-400"
            >
              edward-vonschondorf.dev
            </a>
          </p>
        </div>
        {/* THEME TOGGLE */}
        <Button className="rounded-xl bg-neutral-500">
          <SunMoon size={24} />
        </Button>
      </div>
    </footer>
  );
}
