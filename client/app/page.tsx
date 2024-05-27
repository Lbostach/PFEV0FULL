import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";

export default function Component() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <BoltIcon className="h-6 w-6 text-indigo-500" />
            <span className="text-gray-900 dark:text-gray-50">
              Volt Athletics
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="space-x-4">

              <NavigationMenuItem>

              <NavigationMenuLink href="#">
                  Produits
                </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>

                <NavigationMenuLink href="/dashboard">
                  Carrières
                </NavigationMenuLink>

              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">À propos</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Contactez-nous
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main>
        <section className="bg-gray-100 dark:bg-gray-800">
          <div className="container flex flex-col-reverse items-center gap-8 py-12 md:flex-row md:py-24">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl">
                Rehaussez votre entraînement.
              </h1>
              <p className="text-gray-600 dark:text-gray-400 md:text-xl">
                Explore nos vêtements sportifs haut de gamme conçus pour
                améliorer vos performances et votre style.
              </p>
              <div>
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                  href="#"
                >
                  Consulter
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <img
                alt="Sports Clothing"
                className="w-full max-w-md rounded-lg object-cover"
                height={600}
                src="/sportsclothing.jpg"
                style={{
                  aspectRatio: "800/600",
                  objectFit: "cover",
                }}
                width={800}
              />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
                Produits populaires
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 md:text-xl">
                Découvrez notre dernière collection de vêtements de sport de
                haute performance.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="rounded-lg bg-white shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950 dark:hover:bg-gray-900">
                <img
                  alt="Product 1"
                  className="h-48 w-full rounded-t-lg object-cover"
                  height={400}
                  src="/produit1.jpg"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    T-Shirt Volt Performance
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Tissu à la fois léger et respirable.
                  </p>
                  <div className="mt-4">
                    <Link
                      className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                      href="#"
                    >
                     Consulter 
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950 dark:hover:bg-gray-900">
                <img
                  alt="Product 2"
                  className="h-48 w-full rounded-t-lg object-cover"
                  height={400}
                  src="/produit2.jpg"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Shorts Volt Cross
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Tissu extensible et évacuant l&apos;humidité pour un confort
                    optimal.
                  </p>
                  <div className="mt-4">
                    <Link
                      className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                      href="#"
                    >
                      Consulter
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950 dark:hover:bg-gray-900">
                <img
                  alt="Product 3"
                  className="h-48 w-full rounded-t-lg object-cover"
                  height={400}
                  src="/produit4.jpg"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Baskets Volt Sports
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Soutien à fort impact et technologie d&apos;évacuation de
                    l&apos;humidité.
                  </p>
                  <div className="mt-4">
                    <Link
                      className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                      href="#"
                    >
                      Consulter
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950 dark:hover:bg-gray-900">
                <img
                  alt="Product 4"
                  className="h-48 w-full rounded-t-lg object-cover"
                  height={400}
                  src="/produit3.jpg"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Leggings Volt Yoga
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Tissu flexible et offrant un bon maintien pour votre
                    pratique du yoga.
                  </p>
                  <div className="mt-4">
                    <Link
                      className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                      href="#"
                    >
                      Consulter
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-12 md:py-24 dark:bg-gray-800">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <img
                  alt="About Volt Athletics"
                  className="h-full w-full rounded-lg object-cover"
                  height={400}
                  src="/Apropos.jpg"
                  style={{
                    aspectRatio: "600/400",
                    objectFit: "cover",
                  }}
                  width={600}
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
                  À propos de Volt Athletics
                </h2>
                <p className="text-gray-600 dark:text-gray-400 md:text-xl">
                  Volt Athletics est une marque de vêtements sportifs haut de
                  gamme qui se consacre à soutenir les athlètes de tous niveaux.
                  Notre objectif est de concevoir des vêtements de haute
                  performance qui améliorent votre expérience de sport et vous
                  permettent de réaliser pleinement votre potentiel.
                </p>
                <p className="text-gray-600 dark:text-gray-400 md:text-xl">
                  Nous croyons au pouvoir de la qualité, de l&apos;innovation et
                  durabilité. Chacun de nos produits est méticuleusement conçu
                  et fabriqué en utilisant les dernières technologies et
                  respectueux de l&apos;environnement matériaux pour assurer un
                  maximum de confort, de durabilité et de style.
                </p>
                <div>
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
                    href="#"
                  >
                    Voir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 py-8 text-gray-400">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <BoltIcon className="h-6 w-6 text-indigo-500" />
            <span className="text-lg font-semibold">Volt Athletics</span>
          </div>
          <nav className="flex gap-4">
            <Link className="hover:text-gray-50" href="/dashboard">
              Carrières
            </Link>
            <Link className="hover:text-gray-50" href="/about"></Link>À propos
            <Link className="hover:text-gray-50" href="/contact">
              Contactez-nous
            </Link>
          </nav>
          <p className="text-sm">© 2024 Volt Athletics. Tout droits compris.</p>
        </div>
      </footer>
    </>
  );
}

function BoltIcon(props) {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
