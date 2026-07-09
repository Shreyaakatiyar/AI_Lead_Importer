interface ResultStatsProps {
  processedRows: number;
  importedRows: number;
  skippedRows: number;
  processingTimeMs: number;
}

export default function ResultStats({
  processedRows,
  importedRows,
  skippedRows,
  processingTimeMs,
}: ResultStatsProps) {
  const stats = [
    {
      title: "Processed",
      value: processedRows,
    },
    {
      title: "Imported",
      value: importedRows,
    },
    {
      title: "Skipped",
      value: skippedRows,
    },
    {
      title: "Time",
      value: `${(processingTimeMs / 1000).toFixed(2)} sec`,
    },
  ];

  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl bg-white p-6 shadow-md"
        >
          <h3 className="text-gray-500">{stat.title}</h3>

          <p className="mt-3 text-3xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}