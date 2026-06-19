import Highlight from "@/app/components/home/highlight";


export default function federationPage() {
    return (
        <main className="min-h-screen">


            <section className="py-5 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">

                    <h1 className="mt-4">
                        La <Highlight>Fédération</Highlight>
                    </h1>

                    <img
                        src="/federation.png"
                        alt="Troubles psychiques"
                        className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                    />

                    <p>
                        La Fédération des Musiques Métalliques (FMM) est une organisation nationale créée dans le but de représenter, promouvoir et structurer la filière metal en France. Elle rassemble de nombreux acteurs du secteur, tels que les artistes, les groupes, les festivals, les labels, les médias spécialisés, les associations et les professionnels du spectacle vivant. En fédérant ces différents acteurs, la FMM cherche à renforcer la reconnaissance des musiques métalliques au sein du paysage culturel français.
                    </p>

                </div>
            </section>


            <section className="py-5 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">

                    <div className="flex flex-col lg:flex-row gap-10 items-center">

                        <div className="w-full lg:w-1/2 space-y-6">
                            <h2>Le projet</h2>
                            <p>
                                La fédération agit comme un espace de dialogue, de coopération et de soutien pour l'ensemble de la communauté metal. Elle participe au développement de projets collectifs, favorise les échanges entre professionnels et contribue à améliorer la visibilité de cette scène auprès des institutions, des partenaires culturels et du grand public. La FMM œuvre également pour une meilleure compréhension des enjeux propres au secteur, notamment à travers des actions de sensibilisation, d'accompagnement et de mise en réseau.
                            </p>
                            <p>
                                À travers ses différentes initiatives, la Fédération des Musiques Métalliques joue ainsi un rôle essentiel dans la valorisation et la pérennisation d'un genre musical qui occupe une place importante dans la diversité culturelle française. Elle contribue à faire évoluer les représentations du metal tout en soutenant le dynamisme et la créativité de ses acteurs.
                            </p>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <img
                                src="/fmm_jaune.png"
                                alt="Troubles psychiques"
                                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                    </div>

                </div>
            </section>


            <section className="py-5 px-6 lg:px-8">
                <div className="w-full lg:w-1/2 space-y-6">



                    <div className="flex flex-col gap-10">
                        <h2>Nos partenaires</h2>

                        {/* CNM */}
                        <div className="space-y-3">
                            <img
                                src="cnm.svg"
                                alt="CNM"
                                className="h-12 object-contain"
                            />
                            <p className="text-sm">
                                Le Centre National de la Musique
                            </p>
                        </div>

                        {/* ADAMI */}
                        <div className="space-y-3">
                            <img
                                src="adami.svg"
                                alt="ADAMI"
                                className="h-12 object-contain"
                            />
                            <p className="text-sm">
                                Société de services aux artistes-interprètes : gestion des droits, défense des intérêts, aide financière aux projets et accompagnement de carrière.
                            </p>
                        </div>

                        {/* SACEM */}
                        <div className="space-y-3">
                            <img
                                src="sacem.png"
                                alt="SACEM"
                                className="h-12 object-contain"
                            />
                            <p className="text-sm">
                                La Société des Auteurs Compositeurs et Éditeurs de Musiques
                            </p>
                        </div>

                        {/* AUDIENS */}
                        <div className="space-y-3">
                            <img
                                src="audiens.svg"
                                alt="Audiens"
                                className="h-12 object-contain"
                            />
                            <p className="text-sm">
                                Groupe de protection sociale des intermittents
                            </p>
                        </div>

                        {/* METAL SOCIAL CLUB */}
                        <div className="space-y-3">
                            <img
                                src="smc.jpg"
                                alt="Metal Social Club"
                                className="h-12 object-contain"
                            />
                            <p className="text-sm">
                                Club d’affaires du Metal
                            </p>
                        </div>

                    </div>

                </div>
            </section>



        </main>

    )

}