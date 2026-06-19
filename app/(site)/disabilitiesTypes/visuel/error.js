'use client';

import Link from 'next/link';

export default function AboutError({ error, reset }) {
    return (
        <main >
            <div>
                <h1 >Erreur</h1>
                <p >
                    {error?.message || 'Oups, une erreur semble être survenue 🤔'}
                </p>
                <div >
                    <button
                        onClick={reset}
                    >
                        Réessayer
                    </button>
                    <Link href="/">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </main>
    );
}