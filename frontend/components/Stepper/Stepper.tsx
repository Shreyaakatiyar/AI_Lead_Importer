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
    <div className="flex items-center justify-center py-10">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.key} className="flex items-center">
            {/* Circle + label */}
            <div className="flex items-center gap-2">
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

            {/* Connector line */}
            {!isLast && (
              <div
                className={`mx-4 h-px w-24 ${
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