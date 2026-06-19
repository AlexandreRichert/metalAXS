
import Highlight from "@/app/components/home/highlight";




interface Card {
    id: number;
    image: string;
    title: string;
    description: string;
}

export default function ContactPage() {





    return (
        <main className="min-h-screen">
            <section className="pt-8 pb-4 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 >
                        Nous <Highlight>contacter</Highlight>
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-8 items-center">

                        <div className="flex flex-row flex-wrap items-center gap-8 mt-6">

                            {/* Email */}
                            <a
                                href="mailto:contact@fedemetal.com"
                                className="flex items-center gap-3 text-lg hover:opacity-80 transition"
                            >
                                <i className="fa-solid fa-envelope text-xl" aria-hidden="true" />
                                contact@fedemetal.com
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/p/F%C3%A9d%C3%A9ration-des-Musiques-M%C3%A9talliques-100086192674757/"
                                className="flex items-center gap-3 text-lg hover:opacity-80 transition"
                            >
                                <i className="fa-brands fa-facebook text-xl" aria-hidden="true" />
                                Fédération des Musiques Métalliques
                            </a>

                            {/* Discord */}
                            <a
                                href="https://discord.com/invite/aT8McwWM"
                                className="flex items-center gap-3 text-lg hover:opacity-80 transition"
                            >
                                <i className="fa-brands fa-discord text-xl" aria-hidden="true" />
                                Fédération des Musiques Métalliques
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/federationmusiquesmetalliques"
                                className="flex items-center gap-3 text-lg hover:opacity-80 transition"
                            >
                                <i className="fa-brands fa-instagram text-xl" aria-hidden="true" />
                                @federationmusiquesmetalliques
                            </a>

                        </div>

                    </div>
                </div>
            </section>

        </main >
    );
}