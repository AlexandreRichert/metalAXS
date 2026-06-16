import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-evenly">
        <Link href="/" className="text-gray-800 text-lg font-bold">Metalaxs</Link>
        <nav className="flex space-x-7">
          <Link href="/goodPractices" className="text-gray-800">Bonnes pratiques</Link>
          <Link href="/disabilitiesTypes" className="text-gray-800">Types de handicaps</Link>
          <Link href="/ressources" className="text-gray-800">Ressources</Link>
          <Link href="/federation" className="text-gray-800">La fédé</Link>
          <Link href="/blog" className="text-gray-800">Blog</Link>
          <Link href="/audit" className="text-gray-800">Audit</Link>
        </nav>
      </div>
    </header>
  );
}