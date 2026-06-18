import Cta from "@/app/components/cta";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center bg-gray-100 p-10">
        <h1 className="text-4xl font-bold">Festivals, devenez accessible !</h1>
        <p className="text-lg">Metalaxs est une plateforme qui permet de rendre les festivals accessibles à tous.</p>
        <Cta href="/">Faire un audit</Cta>
      </section>
      <section className="flex flex-col items-center justify-center bg-gray-300 p-10">
        <h2 className="text-2xl font-bold">Les bonnes pratiques</h2>
        <p className="text-lg">Les bonnes pratiques pour rendre un festival accessible.</p>
        <Cta href="/goodPractices">En savoir plus</Cta>
      </section>
      <section className="flex flex-col items-center justify-center bg-gray-100 p-10">
        <h2 className="text-2xl font-heading">Les types de handicaps</h2>
        <p className="text-lg">Les types de handicaps pour rendre un festival accessible.</p>
        <Cta href="/disabilitiesTypes">En savoir plus</Cta>
      </section>
      <section className="flex flex-col items-center justify-center bg-gray-300 p-10">
        <h2 className="text-2xl font-bold">Ressources</h2>
        <p className="text-lg">Les ressources pour rendre un festival accessible.</p>
        <Cta href="/ressources">En savoir plus</Cta>
      </section>
      <section className="flex flex-col items-center justify-center bg-gray-100 p-10">
        <h2 className="text-2xl font-bold">La fédé</h2>
        <p className="text-lg">La F.M.M. (Fédération des Musiques Métalliques) est une association qui regroupe les festivals de musique métallique en France.</p>
        <Cta href="/federation">En savoir plus</Cta>
      </section>
    </div>
  );
}
