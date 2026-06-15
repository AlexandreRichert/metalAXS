import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-300 p-10">
      <div className="flex items-center justify-center flex-col gap-2">
        <Link href="/" className="text-gray-800 text-lg font-bold">Metalaxs</Link> 
          <Link
            href="https://federationdesmusiquesmetalliques.com/"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-[#FFD315]"
          >
            <Image
              src="/FMM_Sigle_Clean_Black.png"
              alt="F.M.M"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span>F.M.M</span>
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=100086192674757"
            aria-label="Facebook"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-blue-600"
          >
            <i className="fa-brands fa-facebook fa-2x" aria-hidden="true" />
            <span>Facebook</span>
          </Link>
          <Link
            href="https://www.instagram.com/federationmusiquesmetalliques/"
            aria-label="Instagram"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-purple-600"
          >
            <i className="fa-brands fa-instagram fa-2x" aria-hidden="true" />
            <span>Instagram</span>
          </Link>
          <Link
            href="https://discord.com/invite/aT8McwWM"
            aria-label="Discord"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-green-600"
          >
            <i className="fa-brands fa-discord fa-2x" aria-hidden="true" />
            <span>Discord</span>
          </Link>
      </div>
        </footer>
  );
}