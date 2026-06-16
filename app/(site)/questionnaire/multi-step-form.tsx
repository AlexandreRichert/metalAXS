"use client";

import { useMemo, useState, useTransition } from "react";

import type { Question, Questionnaire } from "@/sanity/lib/types";

import { submitQuestionnaire } from "./actions";

type AnswersState = Record<string, string[]>;

const RATING_VALUES = ["1", "2", "3", "4", "5"];

function isAnswered(question: Question, values: string[] | undefined): boolean {
  if (!values) return false;
  return values.some((value) => value.trim() !== "");
}

export default function MultiStepForm({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) {
  const steps = questionnaire.steps ?? [];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [respondentName, setRespondentName] = useState("");
  const [respondentEmail, setRespondentEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const progress = useMemo(
    () => Math.round(((currentStep + 1) / Math.max(totalSteps, 1)) * 100),
    [currentStep, totalSteps]
  );

  function setValue(key: string, values: string[]) {
    setAnswers((prev) => ({ ...prev, [key]: values }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function toggleCheckbox(key: string, optionValue: string) {
    setAnswers((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(optionValue)
        ? current.filter((value) => value !== optionValue)
        : [...current, optionValue];
      return { ...prev, [key]: next };
    });
  }

  function validateStep(): boolean {
    const stepErrors: Record<string, string> = {};
    for (const question of step.questions) {
      if (question.required && !isAnswered(question, answers[question._key])) {
        stepErrors[question._key] = "Cette question est obligatoire.";
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  function goNext() {
    if (!validateStep()) return;
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function goBack() {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit() {
    if (!validateStep()) return;

    const payload = {
      questionnaireId: questionnaire._id,
      respondentName: respondentName || undefined,
      respondentEmail: respondentEmail || undefined,
      answers: steps
        .flatMap((s) => s.questions)
        .map((question) => ({
          questionKey: question._key,
          questionLabel: question.label,
          values: answers[question._key] ?? [],
        }))
        .filter((answer) => answer.values.length > 0),
    };

    startTransition(async () => {
      const response = await submitQuestionnaire(payload);
      setResult(response);
    });
  }

  if (result?.status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-green-800">Merci !</h2>
        <p className="mt-2 text-green-700">{result.message}</p>
      </div>
    );
  }

  if (totalSteps === 0) {
    return (
      <p className="rounded-lg bg-gray-100 p-6 text-gray-600">
        Ce questionnaire ne contient aucune étape pour le moment.
      </p>
    );
  }

  return (
    <div>
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm text-gray-500">
          <span>
            Étape {currentStep + 1} sur {totalSteps}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-gray-900 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold">{step.title}</h2>
        {step.description ? (
          <p className="mt-1 text-gray-600">{step.description}</p>
        ) : null}

        <div className="mt-6 space-y-8">
          {step.questions.map((question) => (
            <QuestionField
              key={question._key}
              question={question}
              values={answers[question._key] ?? []}
              error={errors[question._key]}
              onChangeValue={(values) => setValue(question._key, values)}
              onToggleCheckbox={(value) => toggleCheckbox(question._key, value)}
            />
          ))}
        </div>

        {/* Coordonnées : uniquement à la dernière étape */}
        {isLastStep ? (
          <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
            <p className="text-sm font-medium text-gray-700">
              Vos coordonnées (facultatif)
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-gray-600">Nom</span>
                <input
                  type="text"
                  value={respondentName}
                  onChange={(e) => setRespondentName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Email</span>
                <input
                  type="email"
                  value={respondentEmail}
                  onChange={(e) => setRespondentEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </label>
            </div>
          </div>
        ) : null}
      </div>

      {result?.status === "error" ? (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {result.message}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 0 || isPending}
          className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 disabled:opacity-40"
        >
          Précédent
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-lg bg-gray-900 px-6 py-2.5 font-semibold text-white hover:bg-gray-700 disabled:opacity-60"
          >
            {isPending ? "Envoi…" : "Envoyer"}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={isPending}
            className="rounded-lg bg-gray-900 px-6 py-2.5 font-semibold text-white hover:bg-gray-700"
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionField({
  question,
  values,
  error,
  onChangeValue,
  onToggleCheckbox,
}: {
  question: Question;
  values: string[];
  error?: string;
  onChangeValue: (values: string[]) => void;
  onToggleCheckbox: (value: string) => void;
}) {
  const value = values[0] ?? "";
  const options = question.options ?? [];

  const label = (
    <span className="block font-medium">
      {question.label}
      {question.required ? <span className="text-red-600"> *</span> : null}
    </span>
  );

  return (
    <fieldset>
      <legend className="mb-2">{label}</legend>
      {question.helpText ? (
        <p className="mb-2 text-sm text-gray-500">{question.helpText}</p>
      ) : null}

      {question.type === "text" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChangeValue([e.target.value])}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      ) : null}

      {question.type === "textarea" ? (
        <textarea
          value={value}
          rows={4}
          onChange={(e) => onChangeValue([e.target.value])}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      ) : null}

      {question.type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChangeValue(e.target.value ? [e.target.value] : [])}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">— Choisir —</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {question.type === "radio" ? (
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name={question._key}
                checked={value === option.value}
                onChange={() => onChangeValue([option.value])}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ) : null}

      {question.type === "checkbox" ? (
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={values.includes(option.value)}
                onChange={() => onToggleCheckbox(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ) : null}

      {question.type === "boolean" ? (
        <div className="flex gap-4">
          {["Oui", "Non"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name={question._key}
                checked={value === option}
                onChange={() => onChangeValue([option])}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : null}

      {question.type === "rating" ? (
        <div className="flex gap-2">
          {RATING_VALUES.map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChangeValue([rating])}
              aria-pressed={value === rating}
              className={`h-10 w-10 rounded-full border font-semibold ${
                value === rating
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-500"
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </fieldset>
  );
}
