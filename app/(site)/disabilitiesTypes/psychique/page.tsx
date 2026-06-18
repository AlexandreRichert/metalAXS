"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Highlight from "@/app/components/home/highlight";

interface Card {
    id: number;
    image: string;
    title: string;
    description: string;
}

export default function PsychicDisabilityPage() {
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
            title: "Accueil bienveillant",
            description: "Lorem ipsum dolor sit amet consectetur. Diam maecenas dignissim proin quam tincidunt sapien sit. Ut neque ultricies elementum nec sapien donec lacus. Eget est massa id arcu suspendisse fermentum sit egestas sed. Lectus in vel tempor netus accumsan facilisis. Placerat urna eros hendrerit vel turpis pretium. Nisl dictum eu egestas pellentesque adipiscing tincidunt. Et bibendum velit pellentesque facilisi donec congue amet orci. Posuere in ut semper quam pharetra at purus scelerisque. Orci turpis elementum urna dolor fringilla quam tempor egestas. Nisl in duis cras vitae a adipiscing. Imperdiet augue pellentesque elementum mi.",
        },
        {
            id: 2,
            image: "/disable.jpg",
            title: "Espaces de repos",
            description: "Lorem ipsum dolor sit amet consectetur. Diam maecenas dignissim proin quam tincidunt sapien sit. Ut neque ultricies elementum nec sapien donec lacus. Eget est massa id arcu suspendisse fermentum sit egestas sed. Lectus in vel tempor netus accumsan facilisis. Placerat urna eros hendrerit vel turpis pretium. Nisl dictum eu egestas pellentesque adipiscing tincidunt. Et bibendum velit pellentesque facilisi donec congue amet orci. Posuere in ut semper quam pharetra at purus scelerisque. Orci turpis elementum urna dolor fringilla quam tempor egestas. Nisl in duis cras vitae a adipiscing. Imperdiet augue pellentesque elementum mi.",
        },


    ];

    return (
        <main className="min-h-screen">
            {/* Section 1: Image (2/3) + Texte (1/3) */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">

                        <div className="w-full lg:w-1/2">
                            <h1 >
                                Troubles <Highlight>Psychiques</Highlight>
                            </h1>

                            <p className="leading-relaxed">L'Organisation Mondiale de la Santé estime que 20 à 25 % de la population sera touchée par un trouble psychique au cours de sa vie.</p>
                            <p className="leading-relaxed">Addictions, troubles obsessionnels compulsifs, bipolarité, schizophrénie, troubles du comportement alimentaire, anxiété, dépression...</p>
                            <p className="leading-relaxed">L'écoute et l'accueil sont essentiels. Les situations de stress, d'attente ou de proximité avec la foule doivent être réduites au maximum, car elles peuvent être anxiogènes.</p>

                        </div>
                        <div className="w-full lg:w-1/2">
                            <img
                                src="/disable.jpg"
                                alt="Troubles psychiques"
                                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Texte (1/2) + Image (1/2) */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">


                        <div className="w-full lg:w-1/2">
                            <img
                                src="/disable.jpg"
                                alt="Troubles psychiques"
                                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2>
                                Besoins
                            </h2>

                            <p className="leading-relaxed">
                                Sur un festival, les personnes en situation de troubles psychiques expriment plusieurs besoins :
                            </p>

                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Un accueil sans jugement, capable de distinguer une incivilité d'une manifestation du trouble</li>
                                <li>Le moins de situations de stress, d'attente ou de foule possible</li>
                                <li>Des espaces pour s'isoler et se calmer si besoin</li>
                                <li>Une écoute attentive en cas de difficulté</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Titre + Cards empilées */}
            <section
                ref={sectionRef}
                className="py-16 px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 >
                            Solutions
                        </h2>

                        <p className="leading-relaxed max-w-4xl">Pour répondre à ces besoins, plusieurs aménagements peuvent être mis en place sur le site du festival.</p>
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

                                    <h3 className="h3-small">
                                        {card.title}
                                    </h3>

                                    <p className="text-sm leading-6 line-clamp-3">
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
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"

                        onClick={() => setSelectedCard(null)}
                    >

                        <div
                            className="bg-white rounded-xl border border-gray-100 shadow-2xl max-w-5xl w-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <h3 className="p-8 pb-0">{selectedCard.title}</h3>
                                <button
                                    onClick={() => setSelectedCard(null)}
                                    className="absolute top-6 right-6 bg-white rounded-full p-2 hover:bg-gray-100 transition"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-8">
                                <img
                                    src={selectedCard.image}
                                    alt={selectedCard.title}
                                    className="w-full h-64 rounded-lg md:h-80 object-cover mb-6"
                                />
                                <p className="text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                                    {selectedCard.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </main >
    );
}