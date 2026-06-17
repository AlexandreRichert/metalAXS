import { Picto } from "@/types/picto";
import PictoCard from "./pictoCard";

type Props = {
    pictos: Picto[];
};

export default function PictoGrid({
    pictos,
}: Props) {
    return (
        <div className="grid grid-cols-5 gap-6">
            {pictos.map((picto) => (
                <PictoCard
                    key={picto.id}
                    picto={picto}
                />
            ))}
        </div>
    );
}