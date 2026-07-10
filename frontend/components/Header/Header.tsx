import Logo from '@/public/Logo.png'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Image src={Logo} alt="AI Lead Importer logo" className="h-7 w-7 shrink-0" />
        <span className="text-base font-extrabold tracking-tight text-gray-900 sm:text-lg">
          AI Lead Importer
        </span>
      </div>
    </header>
  );
}