// TODO: Add links and credits
import ExternalLink from "../components/ExternalLink";

export default function Footer() {
  return (
    <footer className="bg-slate-900 px-4 py-32 md:px-0">
      <div className="container mx-auto grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="mb-4 text-xl font-bold uppercase text-slate-200">
            Created By
          </h4>
          <p className="text-slate-300">
            Designed and developed by Edward Vonschondorf
          </p>
          <ExternalLink
            href="https://edward-vonschondorf.dev/"
            displayText="edward-vonschondorf.dev"
          />
        </div>
        <div>
          <h4 className="mb-4 text-xl font-bold uppercase text-slate-200">
            Powered By
          </h4>
          <ul>
            <li>
              <ExternalLink
                href="https://rawg.io/apidocs"
                displayText="RAWG API"
              />
            </li>
            <li>
              <ExternalLink
                href="https://apidocs.cheapshark.com/"
                displayText="Cheapshark API"
              />
            </li>
            <li>
              <ExternalLink
                href="https://www.gamerpower.com/api-read"
                displayText="Gamerpower Free Games API"
              />
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xl font-bold uppercase text-slate-200">
            About
          </h4>
          <p className="text-slate-300">
            Based off of{" "}
            <ExternalLink
              href="https://torvec.github.io/Loot-Vault/index.html"
              displayText="Loot Vault"
            />
            , a UC Berkeley Full Stack Web Development Bootcamp group project.
          </p>
        </div>
      </div>
    </footer>
  );
}
