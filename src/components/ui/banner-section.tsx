/* eslint-disable @next/next/no-img-element */
export default function BannerSection({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative mb-4 h-48 overflow-hidden rounded-t-xl">
      <img
        src={src}
        alt=""
        className="h-full w-full opacity-50 blur-md"
        aria-hidden
      />
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 place-content-center">
        <img src={src} alt={alt} className="mx-auto h-max max-h-full w-auto" />
      </div>
    </div>
  );
}
