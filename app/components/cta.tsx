import Link from "next/link";

type CtaProps = {
  href: string;
  children: React.ReactNode;
};

export default function Cta({ href, children }: CtaProps) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-700"
    >
      {children}
    </Link>
  );
}
