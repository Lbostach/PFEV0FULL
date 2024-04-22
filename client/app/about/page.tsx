import Link from "next/link";
import Image from "next/image";
export default function AboutUs() {
  return (
    <>
      <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b">
        <Link
          className="flex items-center gap-2 text-lg font-semibold tracking-wider"
          href="/"
        >
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
            href="#"
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
      <div className="w-full py-12 lg:py-24 xl:py-32">
        <div className="container grid md:gap-6 px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              À propos de nous?
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Notre but est d'aider nos clients à atteindre la plus large
              audience possible.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Notre mission
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Notre mission consiste à aider les entreprises à améliorer leur visibilité
                en ligne et hors ligne, en utilisant divers canaux de
                communication tels que les médias sociaux, la publicité
                numérique, les relations publiques...
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Nos valeurs</h2>
              <ul className="grid gap-2">
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Collaboration
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Innovation
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Succès des clients
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Inclusion
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Intégrité
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Notre équipe</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-1">
                <Image
                  alt="Portrait"
                  className="rounded-lg object-cover object-center"
                  height="150"
                  src="/smiling.jfif"
                  style={{
                    aspectRatio: "150/150",
                    objectFit: "cover",
                  }}
                  width="150"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">Mehdi El Ouazzani</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Responsable de développement
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Image
                  alt="Portrait"
                  className="rounded-lg object-cover object-center"
                  height="150"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "150/150",
                    objectFit: "cover",
                  }}
                  width="150"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">Siham Nour</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Community manager
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Image
                  alt="Portrait"
                  className="rounded-lg object-cover object-center"
                  height="150"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "150/150",
                    objectFit: "cover",
                  }}
                  width="150"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">Issa barkaoui</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Responsable de design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
