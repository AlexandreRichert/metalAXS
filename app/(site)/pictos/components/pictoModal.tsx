"use client";

import Image from "next/image";
import { Picto } from "@/types/picto";

type Props = {
    picto: Picto;
    open: boolean;
    onClose: () => void;
};

export default function PictoModal({
    picto,
    open,
    onClose,
}: Props) {
    if (!open) return null;

    return (
        <div
            className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
        >
            <div
                className="
          bg-white
          rounded-2xl
          p-8
          max-w-md
          w-full
        "
            >
                <button
                    onClick={onClose}
                    className="mb-4"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center gap-6">
                    <Image
                        src={picto.image}
                        alt={picto.name}
                        width={120}
                        height={120}
                    />

                    <h2 className="text-2xl font-bold">
                        {picto.name}
                    </h2>

                    <p className="text-center text-gray-600">
                        {picto.description}
                    </p>

                    <a
                        href={picto.image}
                        download
                        className="
              rounded-lg
              bg-blue-600
              px-5
              py-3
              text-white
            "
                    >
                        Télécharger
                    </a>
                </div>
            </div>
        </div>
    );
}