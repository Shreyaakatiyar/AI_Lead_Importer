"use client";

import { useEffect, useState } from "react";
import { Cpu, CheckCircle2, Loader2, Circle, Lightbulb, ShieldCheck, Gauge } from "lucide-react";

const steps = [
  { label: "Upload Complete", detail: "1,402 records received" },
  { label: "Parsing CSV", detail: "Encoding: UTF-8 verified" },
  { label: "Understanding CSV Structure", detail: "Header detection complete" },
  { label: "Creating AI Batches", detail: "Parallel processing enabled" },
  { label: "Extracting CRM Fields", detail: "Scanning lead records for custom properties (Company Name, LinkedIn URL, Industry)..." },
  { label: "Validating Records", detail: "Waiting..." },
  { label: "Preparing Final Results", detail: "Waiting..." },
];

const phases = [
  { name: "Data Ingestion", range: [0, 1] },
  { name: "Structure Analysis", range: [2, 3] },
  { name: "Neural Mapping", range: [4, 5] },
  { name: "Finalizing", range: [6, 6] },
];

const tips = [
  "While you wait, our AI is also normalizing phone numbers and identifying duplicate entries to ensure your CRM stays pristine.",
  "Our models cross-check email formats against known domain patterns to catch typos before they reach your CRM.",
  "Company names are being matched against a canonical list to keep your records consistent across imports.",
];

export default function Loader() {
  const [step, setStep] = useState(0);
  const [percent, setPercent] = useState(4);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((current) => (current < steps.length - 1 ? current + 1 : current));
    }, 2500);

    const tipInterval = setInterval(() => {
      setTipIndex((current) => (current + 1) % tips.length);
    }, 6000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tipInterval);
    };
  }, []);

  useEffect(() => {
    const target = Math.min(((step + 1) / steps.length) * 100, 100);
    const rampInterval = setInterval(() => {
      setPercent((current) => {
        if (current >= target) {
          clearInterval(rampInterval);
          return current;
        }
        return Math.min(current + 1, target);
      });
    }, 30);

    return () => clearInterval(rampInterval);
  }, [step]);

  const activePhase = phases.find(
    (p) => step >= p.range[0] && step <= p.range[1]
  ) ?? phases[phases.length - 1];
  const phaseNumber = phases.indexOf(activePhase) + 1;

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex w-full flex-col items-center rounded-2xl bg-white p-10 shadow-lg">
        <div className="relative mb-8 h-40 w-40">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900">
              <Cpu size={32} className="text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-900">
          Intelligent Extraction in Progress
        </h2>
        <p className="mt-3 max-w-md text-center text-gray-500">
          Our AI models are currently analyzing your data structure and mapping fields to your CRM schema with 99.8% predicted accuracy.
        </p>

        <div className="mt-8 w-full">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Phase {phaseNumber} of {phases.length}: {activePhase.name}
            </span>
            <span className="text-lg font-bold text-gray-900">{Math.round(percent)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {steps.map((s, index) => {
            const isComplete = index < step;
            const isActive = index === step;

            if (isActive) {
              return (
                <div
                  key={s.label}
                  className="col-span-1 flex items-center justify-between rounded-xl bg-gray-900 px-5 py-4 sm:col-span-2"
                >
                  <div className="flex items-center gap-3">
                    <Loader2 size={18} className="animate-spin text-indigo-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{s.label}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{s.detail}</p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    PROCESSING...
                  </span>
                </div>
              );
            }

            return (
              <div
                key={s.label}
                className={`flex items-center gap-3 rounded-xl px-5 py-4 ${
                  isComplete ? "bg-gray-50" : "bg-gray-50/50"
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 size={18} className="shrink-0 text-green-500" />
                ) : (
                  <Circle size={18} className="shrink-0 text-gray-300" />
                )}
                <div>
                  <p className={`text-sm font-semibold ${isComplete ? "text-gray-900" : "text-gray-400"}`}>
                    {s.label}
                  </p>
                  <p className={`mt-0.5 text-xs ${isComplete ? "text-gray-500" : "text-gray-400"}`}>
                    {isComplete ? s.detail : "Waiting..."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-2 px-2 text-xs text-gray-500 sm:flex-row">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" /> System Status: All nodes operational.
        </span>
        <span className="flex items-center gap-1.5">
          <Gauge size={13} /> Avg: 450 records/sec
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={13} /> AES-256 encrypted
        </span>
      </div>

      {/* Floating tip panel */}
      <div className="fixed bottom-6 right-6 hidden w-80 rounded-xl border border-gray-200 bg-white p-5 shadow-xl sm:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
            <Lightbulb size={16} className="text-gray-700" />
          </div>
          <h4 className="font-semibold text-gray-900">Did you know?</h4>
        </div>
        <p className="mt-3 text-sm text-gray-500">{tips[tipIndex]}</p>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
          <button className="font-medium text-red-500 hover:text-red-600">Cancel Import</button>
        </div>
      </div>
    </div>
  );
}