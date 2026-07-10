"use client";

import { Check } from "lucide-react";

export type Step = "upload" | "preview" | "process" | "results";

const steps: { key: Step; label: string }[] = [
  { key: "upload", label: "Upload" },
  { key: "preview", label: "Preview" },
  { key: "process", label: "Process" },
  { key: "results", label: "Results" },
];

interface StepperProps {
  currentStep: Step;
}

export default function Stepper({ currentStep }: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-6 sm:gap-0 sm:px-6 sm:py-10">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isCompleted
                    ? "bg-gray-900 text-white"
                    : isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span
                className={`text-sm ${
                  isActive
                    ? "font-semibold text-gray-900"
                    : isCompleted
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={`mx-2 hidden h-px w-12 sm:mx-4 sm:block sm:w-20 ${
                  isCompleted ? "bg-gray-900" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}