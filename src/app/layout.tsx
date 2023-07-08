import './globals.css'
import { Inter } from 'next/font/google'
import { HambugerButton } from './components/molecules/HambugerButton';
import { PopulationFilter } from './components/organisms/populationFilter';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ubiratã',
  description: 'Dados da população',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <nav className="flex items-center justify-between flex-wrap bg-sky-950 py-4 px-24 fixed w-full z-10">
          <span className="font-semibold text-xl tracking-tight">Ubiratã</span>
          <HambugerButton>
            <div className="flex justify-end">
              <PopulationFilter />
            </div>
          </HambugerButton>
        </nav>
        {children}
      </body>
    </html>
  )
}
