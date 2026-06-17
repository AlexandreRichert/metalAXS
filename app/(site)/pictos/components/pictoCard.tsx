"use client";

import Image from "next/image";
import { useState } from "react";
import { Picto } from "@/types/picto";
import PictoModal from "./pictoModal";

type Props = {
    picto: Picto;
};

export default function PictoCard({
    picto,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="
          rounded-xl
          border
          p-6
          shadow-sm
          hover:shadow-md
          transition
          bg-white
        "
            >
                <div className="flex flex-col items-center gap-4">
                    <Image
                        src={picto.image}
                        alt={picto.name}
                        width={80}
                        height={80}
                    />

                    <p className="font-medium">
                        {picto.name}
                    </p>
                </div>
            </button>

            <PictoModal
                picto={picto}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}