"use client";

import Link from "next/link";
import Button from "@/app/components/button";
import Highlight from "@/app/components/home/highlight";


export default function NotFound() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center gap-6 px-6">
            <h1>404</h1>
            <h2><Highlight>Page non trouvée</Highlight></h2>

            <p className="max-w-xl text-lg">
                Désolé, il semble que la page que vous recherchez n'existe plus
                <span className="emoji-shake">😶</span>
            </p>


            <Button
                href="/"

            >
                Retour à l'accueil
            </Button>
        </main>
    )
}

