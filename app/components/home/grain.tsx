import Image from "next/image";

// Texture de grain (node Figma « grain », opacité 50 %) superposée aux visuels.
// À placer dans un conteneur `relative`.
export default function Grain({
  className = "",
  sizes = "100vw",
}: {
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src="/home/grain.jpg"
      alt=""
      aria-hidden="true"
      fill
      sizes={sizes}
      className={`pointer-events-none select-none object-cover opacity-50 mix-blend-overlay ${className}`}
    />
  );
}
