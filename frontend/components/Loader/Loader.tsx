export default function Loader() {
  return (
    <div className="flex min-h-100 w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

      <h2 className="mt-8 text-2xl font-bold text-gray-800">
        Processing your CSV...
      </h2>

      <p className="mt-3 max-w-md text-center text-gray-500">
        Our AI is extracting CRM fields, validating data, and preparing your
        import. This may take a few moments.
      </p>
    </div>
  );
}