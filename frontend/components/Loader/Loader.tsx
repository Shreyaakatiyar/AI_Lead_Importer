"use client";

import { useEffect, useState } from "react";

const messages = [
  "Uploading CSV...",
  "Parsing CSV...",
  "Understanding CSV Structure...",
  "Creating AI Batches...",
  "Extracting CRM Fields...",
  "Validating Lead Information...",
  "Preparing Final Results...",
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((current) =>
        current < messages.length - 1 ? current + 1 : current
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full max-w-2xl flex-col items-center rounded-2xl bg-white p-10 shadow-lg">
      <div className="mb-8 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

      <h2 className="text-3xl font-bold text-gray-800">AI Processing</h2>

      <p className="mt-3 text-gray-500">
        Please wait while we prepare your CRM records.
      </p>

      <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700"
          style={{
            width: `${((step + 1) / messages.length) * 100}%`,
          }}
        />
      </div>

      <p className="mt-4 text-lg font-medium text-blue-700">{messages[step]}</p>

      <div className="mt-10 w-full space-y-3">
        {messages.map((message, index) => (
          <div
            key={message}
            className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-300 ${
              index <= step ? "bg-blue-50 text-blue-700" : "text-gray-400"
            }`}
          >
            <span className="text-lg">
              {index < step ? "✅" : index === step ? "⏳" : "○"}
            </span>

            <span>{message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}