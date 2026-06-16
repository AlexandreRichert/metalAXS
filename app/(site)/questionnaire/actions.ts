"use server";

import { z } from "zod";

import { assertWriteClient } from "@/sanity/lib/write-client";

const answerSchema = z.object({
  questionKey: z.string().min(1),
  questionLabel: z.string(),
  values: z.array(z.string()),
});

const payloadSchema = z.object({
  questionnaireId: z.string().min(1),
  respondentName: z.string().max(120).optional(),
  respondentEmail: z.union([z.email(), z.literal("")]).optional(),
  answers: z.array(answerSchema),
});

export type SubmissionResult = {
  status: "success" | "error";
  message: string;
};

// Server Action : enregistre une soumission de questionnaire dans Sanity.
// Exécutée uniquement côté serveur, avec le jeton d'écriture (jamais exposé).
export async function submitQuestionnaire(
  payload: unknown
): Promise<SubmissionResult> {
  const parsed = payloadSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Les données du formulaire sont invalides.",
    };
  }

  const data = parsed.data;

  try {
    const writeClient = assertWriteClient();

    await writeClient.create({
      _type: "submission",
      questionnaire: { _type: "reference", _ref: data.questionnaireId },
      respondentName: data.respondentName || undefined,
      respondentEmail: data.respondentEmail || undefined,
      submittedAt: new Date().toISOString(),
      answers: data.answers.map((answer) => ({
        _type: "answer",
        _key: answer.questionKey,
        questionKey: answer.questionKey,
        questionLabel: answer.questionLabel,
        values: answer.values,
      })),
    });

    return {
      status: "success",
      message: "Merci ! Votre réponse a bien été enregistrée.",
    };
  } catch (error) {
    console.error("Échec de l'enregistrement de la soumission :", error);
    return {
      status: "error",
      message:
        "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
    };
  }
}
