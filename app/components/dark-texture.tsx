// Fond texturé sombre (node Figma 3e29… sur aplat #2c1f00) des sections sombres.
// `bg-fixed` (background-attachment: fixed) cale la texture sur le viewport : deux
// sections sombres adjacentes (AUDITEZ-VOUS + footer) partagent ainsi UNE seule
// texture continue, comme dans le design Figma (Frame 35), au lieu d'un raccord.
// À placer en premier enfant d'un conteneur `relative overflow-hidden bg-ink`.
export default function DarkTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none bg-cover bg-fixed bg-center opacity-60"
      style={{ backgroundImage: "url('/home/dark-texture.jpg')" }}
    />
  );
}
