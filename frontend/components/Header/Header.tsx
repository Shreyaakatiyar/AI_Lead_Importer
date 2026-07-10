import Logo from '@/public/Logo.png'
import Image from 'next/image'

export default function Header() {

  return (
    <header className="w-full border-b border-gray-200 bg-white/60 backdrop-blur border-r-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <Image
          src={Logo}
          alt="Picture of the author"
          className='h-16 w-16'
        />
        <span className="text-lg font-extrabold text-gray-900">AI Lead Importer</span>
      </div>
    </header>
  );
}