import { Button } from "@/components/ui/button";

import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
export default function AvatarageStaff() {
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
              className="object-cover w-1/2 h-1/2 border rounded-full"
              height={500}
              src="/personplaceholder.jpg"
              width={500}
            />
            <div className="my-4">Firstname Lastname</div>
          </div>
          
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
