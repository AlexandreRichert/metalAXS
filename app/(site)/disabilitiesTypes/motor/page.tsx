"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Card {
    id: number;
    image: string;
    title: string;
    description: string;
}

export default function MotorDisabilityPage() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.3,
    });
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const cards: Card[] = [
        {
            id: 1,
            image: "/disable.jpg",
            title: "Information transport",
            description: "Des informations claires sur l'accessibilité des transports pour se rendre au festival.",
        },
        {
            id: 2,
            image: "/disable.jpg",
            title: "Stationnement réservé",
            description: "Un parking réservé près de l'entrée, ou une navette entre le parking et les accès au site.",
        },
        {
            id: 3,
            image: "/disable.jpg",
            title: "Cheminements accessibles",
            description: "Des informations claires sur l'accessibilité des transports pour se rendre au festival.",
        },
        {
            id: 4,
            image: "/disable.jpg",
            title: "Plaques de roulage",
            description: "Des plaques de roulage permettant d'éviter les terrains glissants, boueux et/ou accidentés.",
        },
        {
            id: 5,
            image: "/disable.jpg",
            title: "Plateformes dédiées",
            description: "Des plateformes pour les personnes en fauteuil roulant, avec une place réservée à leur accompagnant.",
        },
        {
            id: 6,
            image: "/disable.jpg",
            title: "Pentes douces",
            description: "Des pentes à moins de 5 % sur les longs trajets, pour limiter l'effort en fauteuil manuel.",
        },
        {
            id: 7,
            image: "/disable.jpg",
            title: "Comptoirs abaissés",
            description: "Des comptoirs abaissés aux points de restauration et de bar.",
        },
        {
            id: 8,
            image: "/disable.jpg",
            title: "Toilettes adaptées",
            description: "Des cabines de toilettes accessibles aux personnes en fauteuil roulant.",
        },
        {
            id: 9,
            image: "/disable.jpg",
            title: "Bornes de recharge",
            description: "Des bornes de recharge et de réparation pour les fauteuils électriques.",
        },
        {
            id: 10,
            image: "/disable.jpg",
            title: "Mains courantes",
            description: "Des mains courantes sur les zones à risque.",
        },
        {
            id: 11,
            image: "/disable.jpg",
            title: "Points d'étape",
            description: "Des espaces aménagés pour faire une pause à différents endroits du parcours.",
        },
        {
            id: 12,
            image: "/disable.jpg",
            title: "Hébergements recencés",
            description: "Un recensement des hébergements accessibles à proximité du site.",
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Section 1: Image (2/3) + Texte (1/3) */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <div className="w-full lg:w-2/3">
                            <img
                                src="/disable.jpg"
                                alt="Handicaps moteur"
                                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="w-full lg:w-1/3">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Handicaps Moteur
                            </h2>

                            <p className="text-gray-600 leading-relaxed">
                                Le handicap moteur regroupe plusieurs profils avec des besoins
                                différents : des personnes en fauteuil roulant aux personnes à
                                mobilité réduite utilisant une canne, des béquilles ou un
                                déambulateur, en passant par celles qui se déplacent sans
                                assistance mais manquent d'endurance ou de force.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Texte (1/2) + Image (1/2) */}
            <section className="py-16 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Besoins
                            </h2>

                            <p className="text-gray-600 leading-relaxed">
                                Sur un festival, les personnes à mobilité réduite expriment
                                plusieurs besoins récurrents :
                            </p>

                            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                                <li>Des déplacements les plus courts possibles</li>
                                <li>Des surfaces planes et non glissantes</li>
                                <li>Un bon éclairage</li>
                                <li>
                                    Une signalétique visible, y compris pour les personnes se
                                    déplaçant en fauteuil roulant
                                </li>
                                <li>
                                    La possibilité de faire des pauses dans leurs parcours
                                </li>
                                <li>
                                    La possibilité d’être autonomes dans leur expérience du
                                    festival
                                </li>
                                <li>
                                    Des places offrant une bonne visibilité aux personnes en
                                    fauteuil roulant
                                </li>
                            </ul>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <img
                                src="/disable.jpg"
                                alt="Enjeux"
                                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Titre + Cards empilées */}
            <section
                ref={sectionRef}
                className="py-16 px-6 lg:px-8 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Solutions
                        </h2>

                        <p className="text-gray-600 leading-relaxed max-w-4xl">Pour répondre à ces besoins, plusieurs aménagements peuvent être mis en place sur le site du festival.</p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{
                                    opacity: 0,
                                    x: 200,
                                    y: -150,
                                    rotate: 20,
                                }}
                                animate={
                                    isInView
                                        ? {
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                            rotate: 0,
                                        }
                                        : {}
                                }
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: index * 0.15,
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                onClick={() => setSelectedCard(card)}
                                className="cursor-pointer"
                            >
                                <article
                                    className="
        h-full
        rounded-xl
        bg-white
        border
        border-gray-100
        shadow-md
        p-6
        transition-all
        duration-300
        hover:shadow-xl
    "
                                >
                                    <div className="overflow-hidden rounded-lg mb-6">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="
            h-56
            md:h-64
            lg:h-72
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
        "
                                        />
                                    </div>

                                    <h3
                                        className="
        mb-4
        text-lg
        md:text-xl
        font-black
        uppercase
        leading-tight
        text-zinc-900
    "
                                    >
                                        {card.title}
                                    </h3>

                                    <p className="text-sm leading-6 text-zinc-600">
                                        {card.description}
                                    </p>

                                </article>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal pour afficher la card agrandie */}
            {
                selectedCard && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedCard(null)}
                    >
                        <div
                            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img
                                    src={selectedCard.image}
                                    alt={selectedCard.title}
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                                <button
                                    onClick={() => setSelectedCard(null)}
                                    className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6 md:p-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCard.title}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">{selectedCard.description}</p>
                                <button
                                    onClick={() => setSelectedCard(null)}
                                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </main >
    );
}