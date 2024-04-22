/* eslint-disable react/no-unescaped-entities */
"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import AvatarageStaff from "../../../components/component/AvatarageStaff";

export default function RecruiterDashboard() {
  const router = useRouter()
  return (
    /*Navbar containing the home icon at the top right corner, Page content is a 
    variable number of cards, depending on how much "annonces" in the db. Each card contains
    The "annonce" title, a paragraph describing it, a button to modify the content (sends an UPDATE request)and a button to
    delete the annonce(Sends a DELETE request).*/
    <div className="flex w-full h-screen min-h-screen">
      <div className="hidden md:flex w-60 flex-col shrink-0 border-r bg-gray-100/50 dark:bg-gray-800/50">
        <div className="flex w-full items-center h-14 px-4 bg-white border-b border-gray-100 dark:bg-gray-950 dark:border-gray-950/10">
          <Link className="text-xl font-bold" href="/">
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="30px"
              height="30px"
              viewBox="0 0 547.596 547.596"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M540.76,254.788L294.506,38.216c-11.475-10.098-30.064-10.098-41.386,0L6.943,254.788
  c-11.475,10.098-8.415,18.284,6.885,18.284h75.964v221.773c0,12.087,9.945,22.108,22.108,22.108h92.947V371.067
  c0-12.087,9.945-22.108,22.109-22.108h93.865c12.239,0,22.108,9.792,22.108,22.108v145.886h92.947
  c12.24,0,22.108-9.945,22.108-22.108v-221.85h75.965C549.021,272.995,552.081,264.886,540.76,254.788z"
                />
              </g>
            </svg>
          </Link>
        </div>
        <div className=" flex flex-col justify-center gap-4 p-4">
          <Link
            className="flex w-full items-center text-md font-bold my-2"
            href="#"
          >
            Mes Annonces
          </Link>
          <Button
  className="flex w-full items-center text-md font-bold"
  
  onClick={ () => {
   
    localStorage.removeItem('token');
    localStorage.removeItem('idCandidat');
    router.push('/');
    
  }}
>
  Se déconnecter
</Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex w-full h-14 items-center border-b px-4 md:px-6 shrink-0">
          <div className="flex w-full justify-end gap-2 ml-auto items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse dark:bg-gray-700" />
              <div className="w-9 h-9 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-700">
                <AvatarageStaff />
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Annonce 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm font-medium">
                Description de l'annonce 1
              </p>

              
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Consulter les candidats</Button>
              <Button className="mx-4">Modifier L'annonce</Button>
              <Button className="bg-red-500">Supprimer l'annonce</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
