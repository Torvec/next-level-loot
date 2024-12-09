/* eslint-disable @next/next/no-img-element */
export default function BannerSection({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl">
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover opacity-75 blur grayscale"
        aria-hidden
      />
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 place-content-center py-2">
        <img src={src} alt={alt} className="mx-auto h-max max-h-full w-auto" />
      </div>
    </div>
  );
}
