import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import { DEFAULT_QUESTIONNAIRE_QUERY } from "@/sanity/lib/queries";
import type { Questionnaire } from "@/sanity/lib/types";

import MultiStepForm from "./multi-step-form";

export const metadata: Metadata = {
  title: "Questionnaire — Metalaxs",
  description: "Répondez à notre questionnaire en plusieurs étapes.",
};

export default async function QuestionnairePage() {
  const questionnaire = await sanityFetch<Questionnaire | null>({
    query: DEFAULT_QUESTIONNAIRE_QUERY,
    tags: ["questionnaire"],
  });

  if (!questionnaire) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Questionnaire</h1>
        <p className="mt-4 text-gray-600">
          Aucun questionnaire n&apos;est disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{questionnaire.title}</h1>
        {questionnaire.description ? (
          <p className="mt-3 text-lg text-gray-600">
            {questionnaire.description}
          </p>
        ) : null}
      </header>

      <MultiStepForm questionnaire={questionnaire} />
    </div>
  );
}
