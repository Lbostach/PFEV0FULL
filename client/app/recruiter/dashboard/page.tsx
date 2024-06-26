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
import React, { useState, useEffect } from "react";
import {Input} from "@/components/ui/input";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {AddOffreForm} from "@/components/component/addOffreForm";

function RecruiterDashboard() {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [offres, setOffres] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [candidats, setCandidats] = useState<any[]>([]);
  const [selectedCandidat, setSelectedCandidat] = useState(null);
  const [showAddOffreForm, setShowAddOffreForm] = useState(false);

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
    location.reload();
  } catch (error) {
    console.error('Failed to delete offre:', error);
  }
};

const [editMode, setEditMode] = useState<string | null>(null);

const handleEditClick = (id: string) => {
  setEditMode(id);
};

const AccepterCandidat = () => {
  const mailCandidat=selectedCandidat.email;
  const mailRecruteur=user.recruteur.email;
  const passRecruteur=user.recruteur.password;
  try{
    fetch(`http://localhost:3001/Api/recruteur/accepted`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({mailCandidat, mailRecruteur, passRecruteur}),
    });
    alert("Candidat notifié");
  }catch(error){
    console.error('Failed to send email:', error);
  }
}

const RefuserCandidat = () => {
  const mailCandidat=selectedCandidat.email;
  const mailRecruteur=user.recruteur.email;
  const passRecruteur=user.recruteur.password;
  try{
    fetch(`http://localhost:3001/Api/recruteur/refused`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({mailCandidat, mailRecruteur, passRecruteur}),
    });
    alert("Candidat refusé");
  }catch(error){
    console.error('Failed to send email:', error);
  }
}

const PlanifierEntretien = () => {
  console.log(user.recruteur.email);
  const mailCandidat=selectedCandidat.email;
  const mailRecruteur=user.recruteur.email;
  const passRecruteur=user.recruteur.password;
  try{
    fetch(`http://localhost:3001/Api/recruteur/planifier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({mailCandidat, mailRecruteur, passRecruteur}),
    });
    alert("Entretien planifié");
  }catch(error){
    console.error('Failed to send email:', error);
  }
}


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
  const candidatures = await fetch('http://localhost:3001/Api/candidatures').then(res => res.json());
  const Ccandidatures = candidatures.candidatures;
  const matchingCandidatures = Ccandidatures.filter(candidature => {
    console.log(candidature);
    return candidature.idOffre._id === offreId;
  });
  
  const fetchedCandidats: any[] = await Promise.all(matchingCandidatures.map(candidature => 
    fetch(`http://localhost:3001/Api/candidat?idCandidat=${candidature.idCandidat}`).then(res => res.json())
  ));

  return fetchedCandidats;
}

useEffect(() => {
  if (offres) {
    const fetchCandidats = async () => {
      const offresWithCandidats = await Promise.all(offres.map(async offre => {
        const candidats = await handleCandidatesClick(offre._id);
        return { ...offre, candidats };
      }));

      if (JSON.stringify(offres) !== JSON.stringify(offresWithCandidats)) {
        setOffres(offresWithCandidats);
      }
    };

    fetchCandidats();
  }
}, [offres]);

const serverUrl="http://localhost:3001/";
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

      <div className="flex flex-1 flex-col min-h-0">
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
        {selectedCandidat && (
          <div className="fixed inset-0 bg-black flex items-center justify-center bg-opacity-60">
            <Card className="overflow-auto">
              <button className="mx-2 text-s border rounded px-2 my-1" onClick={() => setSelectedCandidat(null)}>X</button>
              <CardHeader>
                <div className="flex items-center justify-center">
              <img
        src={`${serverUrl}${selectedCandidat.picture || "/personplaceholder.jpg"}`}
        alt=""
        width={200}
        height={200}
        className="rounded-full"
        />
        </div>
        <div className="font-bold text-xl flex items-center justify-center">{selectedCandidat.firstName} {selectedCandidat.lastName}</div>

              </CardHeader>
              <CardContent>
                <div className="space-y-2 flex flex-col items-center">
                  <div>Niveau d&apos;étude : {selectedCandidat.studyLevel}</div>
                  <div>Domaine : {selectedCandidat.domain}</div>
                  <div>
              {selectedCandidat.skills.map((item, index) => (
                <div className="text-m" key={index}>
                  ● {item}
                </div>
              ))}
            </div>
            <div> Documents :
              {selectedCandidat.documents.map((document, index) => {
                // Extract the file name from the path
                const fileName = document.split("\\").pop();

                return (
                  <div key={index} className="flex flex-col items-center file-container">
                    <img
                      src="/pdf.png"
                      width={50}
                      height={50} 
                      alt={fileName}
                      onClick={() => window.open(`${serverUrl}${document}`, "_blank")}
                    />
                    
                    <p className="text-xs" onClick={() => window.open(`${serverUrl}/${document}`, "_blank")}>
                      {fileName}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex space-x-2 justify-between items-center">
            <Button className="my-4 bg-blue-600" onClick={PlanifierEntretien}>Planifier un entretien</Button>
            <Button className="bg-green-800" onClick={AccepterCandidat}>Accepter le candidat</Button>
            </div>
            <Button className="bg-red-500" onClick={RefuserCandidat}>Refuser le candidat</Button>
            
                </div>
                
              </CardContent>
            </Card>
            </div>
          )}

        {offres.map((offre) => {
        return (
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



        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
          Consulter les candidats
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
         <DropdownMenuLabel>Candidats</DropdownMenuLabel> 
          
          {Array.isArray(offre.candidats) && offre.candidats.map(candidat => {
  const candidatData = candidat.candidat;
  return (
    
    <DropdownMenuItem key={candidatData._id} onClick={() => setSelectedCandidat(candidatData)}>
      <img
        src={`${serverUrl}${candidatData.picture || "/personplaceholder.jpg"}`}
        alt=""
        width={24}
        height={24}
        className="rounded-full"
        />
        <div className="mx-1">
      {candidatData.firstName} {candidatData.lastName}
      </div>
      
    </DropdownMenuItem>
    
  );
})}
         
          </DropdownMenuContent>
          </DropdownMenu>

          


          {editMode === offre._id ? (

            <Button className="mx-4" onClick={() => handleSaveClick(offre._id)}>
              Sauvegarder les changements
            </Button>
          ) : (
            <Button className="mx-4" onClick={() => handleEditClick(offre._id)}>
              Modifier L&apos;annonce
            </Button>
          )}
          <Button className="bg-red-500" onClick={() => deleteOffre(offre._id)}>
            Supprimer l&apos;annonce
          </Button>
        </CardFooter>
    </Card>
  )
})}
  {showAddOffreForm && <>
  <button className="h-6 w-6 my-2 text-white bg-black opacity-80 hover:bg-blue-700 border rounded-full" onClick={() => setShowAddOffreForm(false)}>X</button>
    <AddOffreForm idRecruteur={localStorage.getItem('idRecruteur')} className="w-1 h-1"/>
    </>
   }
     {!showAddOffreForm && (
  <Button
    className="bg-green-700 mx-8 px-6"
    onClick={() => setShowAddOffreForm(true)}
  >
    Ajouter une annonce
  </Button>
)}
        </div>
        
      </div>
      
    </div>
    </>
  );
}
export default WithAuthRec(RecruiterDashboard);
