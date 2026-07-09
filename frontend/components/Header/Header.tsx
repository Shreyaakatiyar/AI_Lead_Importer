export default function Header() {
  return (
    <header className="text-center space-y-3">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        AI CSV Importer
      </h1>

      <p className="mx-auto max-w-2xl text-lg text-gray-600">
        Upload CSV files from any source and intelligently extract CRM lead
        information using AI.
      </p>
    </header>
  );
}