import Link from "next/link"

export default function Home() {

return(

  <div className="grid min-h-screen">
      <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b">
        <Link className="flex items-center gap-2 text-lg font-semibold tracking-wider" href="#">
          Ste
        </Link>
        <nav className="ml-auto flex items-center gap-4 text-sm font-medium md:gap-6">
          <Link
            className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/dashboard"
          >
            Carrières
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/about"
          >
            À propos
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/contact"
          >
            Contactez-nous
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center py-16 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl/none">
            Bienvenue chez Ste
          </h1>
          <p className="max-w-[600px] mt-3 text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            La solution marketing pour les petites et moyennes entreprises.
          </p>
        </div>
      </main>
    </div>
);
}