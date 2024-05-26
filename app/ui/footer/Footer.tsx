import ExternalLink from "../components/ExternalLink";

export default function Footer() {
  const FooterHeader = ({ displayText }: { displayText: string }) => {
    return (
      <h4 className="mb-4 text-xl font-bold uppercase text-slate-200">
        {displayText}
      </h4>
    );
  };

  const CreatedBy = () => {
    return (
      <div>
        <FooterHeader displayText="Created By" />
        <p className="text-slate-300">
          Designed and developed by Edward Vonschondorf
        </p>
        <ExternalLink
          href="https://edward-vonschondorf.dev/"
          displayText="edward-vonschondorf.dev"
        />
      </div>
    );
  };

  const PoweredBy = () => {
    const apiLinks = [
      { href: "https://rawg.io/apidocs", displayText: "Rawg API" },
      {
        href: "https://apidocs.cheapshark.com/",
        displayText: "Cheapshark API",
      },
      {
        href: "https://www.gamerpower.com/api-read",
        displayText: "Gamerpower Free Games API",
      },
    ];

    const APILinkList = () => {
      return (
        <ul>
          {apiLinks.map(({ href, displayText }, index) => (
            <li key={index}>
              <ExternalLink href={href} displayText={displayText} />
            </li>
          ))}
        </ul>
      );
    };

    return (
      <div>
        <FooterHeader displayText="Powered By" />
        <APILinkList />
      </div>
    );
  };

  const About = () => {
    return (
      <div>
        <FooterHeader displayText="About" />
        <p className="text-slate-300">
          Based off of{" "}
          <ExternalLink
            href="https://torvec.github.io/Loot-Vault/index.html"
            displayText="Loot Vault"
          />
          , a UC Berkeley Full Stack Web Development Bootcamp group project.
        </p>
      </div>
    );
  };

  return (
    <footer className="bg-slate-900 px-4 py-32 md:px-0">
      <div className="container mx-auto grid gap-8 md:grid-cols-3">
        <CreatedBy />
        <PoweredBy />
        <About />
      </div>
    </footer>
  );
}
