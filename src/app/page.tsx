export default function Home() {
  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        The Landing Page (Under Development)
      </h1>
      <h2 className="mb-8 text-center text-2xl font-bold">Color Palette</h2>
      <div className="mb-32 grid text-center lg:grid-cols-6">
        {/* ROW 1 */}
        <div className="place-content-center border bg-background p-16">
          <p className="text-foreground">
            Background
            <br /> / <br /> Foreground
          </p>
        </div>
        <div className="place-content-center border bg-foreground p-16">
          <p className="text-background">
            Foreground
            <br /> / <br /> Background
          </p>
        </div>
        <div className="place-content-center border bg-card p-16">
          <p className="text-card-foreground">
            Card
            <br /> / <br /> Card Foreground
          </p>
        </div>
        <div className="place-content-center border bg-card-foreground p-16">
          <p className="text-card">
            Card Foreground
            <br /> / <br /> Card
          </p>
        </div>
        <div className="place-content-center border bg-popover p-16">
          <p className="text-popover-foreground">
            Popover
            <br /> / <br /> Popover Foreground
          </p>
        </div>
        <div className="place-content-center border bg-popover-foreground p-16">
          <p className="text-popover">
            Popover Foreground
            <br /> / <br /> Popover
          </p>
        </div>

        {/* ROW 2 */}
        <div className="place-content-center border bg-primary p-16">
          <p className="text-primary-foreground">
            Primary
            <br /> / <br /> Primary Foreground
          </p>
        </div>
        <div className="place-content-center border bg-primary-foreground p-16">
          <p className="text-primary">
            Primary Foreground
            <br /> / <br /> Primary
          </p>
        </div>
        <div className="place-content-center border bg-secondary p-16">
          <p className="text-secondary-foreground">
            Secondary
            <br /> / <br /> Secondary Foreground
          </p>
        </div>
        <div className="place-content-center border bg-secondary-foreground p-16">
          <p className="text-secondary">
            Secondary Foreground
            <br /> / <br /> Secondary
          </p>
        </div>
        <div className="place-content-center border bg-muted p-16">
          <p className="text-muted-foreground">
            Muted
            <br /> / <br /> Muted Foreground
          </p>
        </div>
        <div className="place-content-center border bg-muted-foreground p-16">
          <p className="text-muted">
            Muted Foreground
            <br /> / <br /> Muted
          </p>
        </div>

        {/* ROW 3 */}
        <div className="place-content-center border bg-accent p-16">
          <p className="text-accent-foreground">
            Accent
            <br /> / <br /> Accent Foreground
          </p>
        </div>
        <div className="place-content-center border bg-accent-foreground p-16">
          <p className="text-accent">
            Accent Foreground
            <br /> / <br /> Accent
          </p>
        </div>
        <div className="place-content-center border bg-destructive p-16">
          <p className="text-destructive-foreground">
            Destructive
            <br /> / <br /> Destructive Foreground
          </p>
        </div>
        <div className="place-content-center border bg-destructive-foreground p-16">
          <p className="text-destructive">
            Destructive Foreground
            <br /> / <br /> Destructive
          </p>
        </div>
        <div className="place-content-center border bg-gold p-16">
          <p className="text-background">
            Gold
            <br /> / <br /> Background
          </p>
        </div>
        <div className="place-content-center border bg-gold-foreground p-16">
          <p className="text-background">
            Gold Foreground
            <br /> / <br /> Background
          </p>
        </div>
      </div>
    </>
  );
}
