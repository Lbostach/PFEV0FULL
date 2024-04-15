import { Button } from "@/components/ui/button";
export default function JobListings() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex overflow-hidden">
        <section className="w-full h-full flex">
          <div className="w-1/3 h-full overflow-y-auto border-r">
            <ul className="p-4 space-y-4">
              <li className="border p-4 shadow-md rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <h3 className="text-lg font-semibold">Développeur PHP</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Informatique
                </p>
              </li>
              <li className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <h3 className="text-lg font-semibold">Job Title 2</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Company B
                </p>
              </li>
              <li className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <h3 className="text-lg font-semibold">Job Title 3</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Company C
                </p>
              </li>
              <li className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <h3 className="text-lg font-semibold">Job Title 4</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Company D
                </p>
              </li>
            </ul>
          </div>
          <div className="w-full h-1/2 overflow-y-auto p-4 border rounded-md">
            <div className="p-12">
              <h2 className="text-3xl font-semibold">Développeur PHP</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
                Informatique
              </p>
              <p className="mt-4">
                Nous sommes une entreprise innovante spécialisée dans le
                développement de solutions web et d'applications sur mesure.
                Notre équipe dynamique et passionnée travaille sur des projets
                variés, allant de la conception de plateformes e-commerce à la
                création d'applications mobiles. Lieu : Basé à Kénitra.
                Description du Poste : Nous recherchons un développeur Laravel
                talentueux et motivé pour rejoindre notre équipe. En tant que
                développeur Laravel, vous serez responsable de la conception, du
                développement et de la maintenance de nos applications web. Vous
                travaillerez en étroite collaboration avec nos équipes de
                conception et de développement pour créer des solutions
                innovantes répondant aux besoins de nos clients.
              </p>
              <div className="font-bold text-s space-y-2 py-2">
                Niveau d'étude requis : BAC+4
              </div>
              <div className="font-bold text-s space-y-2 py-2">
                Compétences requises :
              </div>
              <div>
                <ul>
                  <li>- PHP</li>
                  <li>- Laravel</li>
                  <li>- RabbitMQ</li>
                </ul>
              </div>
              <div className="font-bold text-s space-y-2 py-2">
                Date de publication : 02/04/2024
              </div>
              <div className="font-bold text-s space-y-2 py-2">
                Date limite de l'offre : 16/04/2024
              </div>
              <div className="p-4 flex items-center justify-end">
                <Button className="my-4 bg-blue-600 border">Postuler</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
