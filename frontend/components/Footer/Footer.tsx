export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-sm text-gray-400 sm:flex-row">
        <span>© {new Date().getFullYear()} AI Lead Importer</span>
        <span>Built with care for cleaner CRM data</span>
      </div>
    </footer>
  );
}