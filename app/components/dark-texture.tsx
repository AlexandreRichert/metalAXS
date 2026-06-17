import Image from "next/image";

// Fond texturé sombre (node Figma 3e29… sur aplat #2c1f00) des sections sombres.
// À placer en premier enfant d'un conteneur `relative bg-ink`.
export default function DarkTexture() {
  return (
    <Image
      src="/home/dark-texture.jpg"
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
      className="pointer-events-none select-none object-cover opacity-60"
    />
  );
}
