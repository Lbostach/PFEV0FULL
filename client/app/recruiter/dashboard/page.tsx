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
import WithAuthRec from "../../../components/component/withAuthRec";
import { useState, useEffect } from "react";
import {Input} from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function RecruiterDashboard() {

  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [offres, setOffres] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [candidats, setCandidats] = useState([]);

const handleTitleChange = (event) => {
  setNewTitle(event.target.value);
};

const handleDescriptionChange = (event) => {
  setNewDescription(event.target.value);
};



  useEffect(() => {
    const token = localStorage.getItem('token');
    const idRecruteur = localStorage.getItem('idRecruteur');
    fetch(`http://localhost:3001/Api/recruteurs?idRecruteur=${idRecruteur}`, { 
      
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'idRecruteur': idRecruteur || '', 
      },
      
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
  
  })
    .catch(error => console.error('Error:', error));
}, []);

useEffect(() => {
  const idRecruteur = localStorage.getItem('idRecruteur');
  const token = localStorage.getItem('token');

  fetch(`http://localhost:3001/Api/recruteurs/offres?idRecruteur=${idRecruteur}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      setOffres(data.offres);
    })
    .catch(error => console.error('Error:', error));
}, []);

const deleteOffre = async (id: string) => {
  try {
    await fetch(`http://localhost:3001/Api/offres/${id}`, { method: 'DELETE' });
    // Refresh the page or update the state to remove the deleted offre from the UI
  } catch (error) {
    console.error('Failed to delete offre:', error);
  }
};

const [editMode, setEditMode] = useState<string | null>(null);
const handleEditClick = (id: string) => {
  setEditMode(id);
};

const handleSaveClick = async (id) => {
  try {
    const updatedOffre = {};
    if (newTitle) updatedOffre.titre = newTitle;
    if (newDescription) updatedOffre.description = newDescription;
  
    const response = await fetch(`http://localhost:3001/Api/offres/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOffre),
    });

    if (!response.ok) {
      throw new Error('Failed to save changes');
    }

    // Refresh the page or update the state to show the updated offre
  } catch (error) {
    console.error('Failed to save changes:', error);
  }
  setEditMode(null);
  location.reload();
  
};

async function handleCandidatesClick(offreId) {
  // Fetch all "Candidature" objects
  const candidatures = await fetch('http://localhost:3001/Api/candidatures').then(res => res.json());
 const Ccandidatures = candidatures.candidatures;

  // Filter "Candidature" objects that contain the same `offre._id`
  const matchingCandidatures = Ccandidatures.filter(candidature => {
    if (candidature.idOffre) {
      
      return candidature.idOffre._id === offreId;
    }
    return false;
  });
  
  // Fetch and return the corresponding "Candidat" objects
  const fetchedCandidats = await Promise.all(matchingCandidatures.map(candidature => 
    fetch(`http://localhost:3001/Api/candidat?idCandidat=${candidature.idCandidat}`).then(res => res.json())
  ));

  setCandidats(fetchedCandidats);
  console.log(candidats);
  
}




  return (
    <>
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
    localStorage.removeItem('idRecruteur');
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
                <AvatarageStaff user={user} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 md:p-4">
        {offres.map((offre) => (
    <Card className="p-1 my-4 border-gray-400" key={offre._id}>
      <CardHeader>
          {editMode === offre._id ? (
            <Input type="text" defaultValue={offre.titre} onChange={handleTitleChange} />
          ) : (
            <CardTitle>{offre.titre}</CardTitle>
          )}
        </CardHeader>
      <CardContent>
      {editMode === offre._id ? (
            <Input type="text" defaultValue={offre.description} onChange={handleDescriptionChange} />
          ) : (
            <p className="text-gray-500 text-sm font-medium">
          {offre.description}
        </p>
          )}
      </CardContent>
      <CardFooter>



        <Dialog>
          <DialogTrigger>
            <Button onClick={() => handleCandidatesClick(offre._id)}>
          Consulter les candidats
          </Button>
          </DialogTrigger>
          <DialogContent>
          <DialogHeader>
          <DialogDescription className="flex flex-1">
          {Array.isArray(candidats) && candidats.map(index => {
  const candidat = index.candidat;
  return (
    
    <Card key={candidat._id}>
      <CardHeader>
        <CardTitle>
          {candidat.firstName} {candidat.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 text-sm font-medium">
          {candidat.email}
        </p>
      </CardContent>
    </Card>
    
  );
})}
</DialogDescription>
          </DialogHeader>
          </DialogContent>
          </Dialog>



          {editMode === offre._id ? (

            <Button className="mx-4" onClick={() => handleSaveClick(offre._id)}>
              Sauvegarder les changements
            </Button>
          ) : (
            <Button className="mx-4" onClick={() => handleEditClick(offre._id)}>
              Modifier L'annonce
            </Button>
          )}
          <Button className="bg-red-500" onClick={() => deleteOffre(offre._id)}>
            Supprimer l'annonce
          </Button>
        </CardFooter>
    </Card>
  ))}
        </div>
      </div>
    </div>
    </>
  );
}
export default WithAuthRec(RecruiterDashboard);
