import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { useEffect, useState } from 'react';




export default function AvatarageCandidat() {

  return (
    <Sheet>
      <SheetTrigger>
        <Image
          alt="Avatar"
          className="object-cover w-full h-full border"
          height={36}
          src="/personplaceholder.jpg"
          style={{
            aspectRatio: "36/36",
            objectFit: "cover",
          }}
          width={36}
        />
      </SheetTrigger>
      <SheetContent className="bg-gray-200 shadow-md">
        <SheetHeader>
          <div className="flex flex-col items-center justify-center text-xl font-bold overflow-hidden">
            <Image
              alt="Avatar"
              className="object-cover w-full h-full border rounded-full"
              height={200}
              src="/personplaceholder.jpg"
              width={200}
            />
            <div className="my-4">Firstname Lastname</div>
          </div>
          <div className="flex flex-col">
            <ul>
              <li>Niveau d'étude :</li>
              <li className="my-2">Domaine :</li>
            </ul>
            <div className="my-4 font-bold">
              Compétences :
              <Button className="rounded-full px-1 py-2 h-1 mx-2 text-xs text-gray-100 bg-gray-400">+</Button>
              </div>
            <div className="my-4 font-bold">Mes Documents :</div>
            <div className="flex flex-col items-center justify-center my-8">
            <Button>Ajouter un document</Button>
            <Button className="bg-red-500 my-2">Supprimer un document</Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
