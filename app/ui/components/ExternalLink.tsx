type ExternalLinkProps = {
  href: string;
  displayText: string;
};

export default function ExternalLink({ href, displayText }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-yellow-400 hover:text-yellow-200"
    >
      {displayText}
    </a>
  );
}
