import { Picto } from "@/types/picto";

export const pictos: Picto[] = Array.from(
    { length: 20 },
    (_, i) => ({
        id: i + 1,
        name: `Picto ${i + 1}`,
        description: `Description du pictogramme ${i + 1}.`,
        image: `/pictos/picto-${i + 1}.svg`,
    })
);