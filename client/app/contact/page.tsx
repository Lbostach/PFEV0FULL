import Link from "next/link";

export default function Component() {
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
            href="/about"
          >
            À propos
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Contactez-nous
          </Link>
        </nav>
      </header>
      <div className="w-full py-12 lg:py-24 xl:py-32">
        <div className="container grid md:gap-6 px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Besoin d'aide?
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Nous sommes là pour vous. Contactez notre équipe de support pour
              toute question ou assistance.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Contactez-nous
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Vous avez une question ou besoin d'aide ? Contactez notre équipe
                d'assistance et nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Nos supports</h2>
              <ul className="grid gap-2">
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Email: support@example.com
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Phone: +212-661726541
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 mr-2" />
                  Fax: +212-591098702
                </li>
              </ul>
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
