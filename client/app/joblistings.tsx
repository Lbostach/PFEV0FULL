import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

export default function JobListings({ loggedInUser }) {


  
  const [offres, setOffres] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState(null);


  useEffect(() => {
    fetch('http://localhost:3001/Api/offres')
      .then(response => response.json())
      .then(data => { 
        if(Array.isArray(data.offres)){
        setOffres(data.offres);
        } else {
          console.error('Error: data.offres is not an array.', data.offres);
        }
      
      });
  }, []);


  const handleCardClick = (offre) => {
    setSelectedOffre(offre);
  };
  const handlePostulerClick = () => {
    fetch('http://localhost:3001/Api/candidatures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        offreId: selectedOffre._id,
        candidatId: loggedInUser.candidat._id, // replace with actual candidatId
        recruteurId: selectedOffre.recruteurId, // replace with actual recruteurId
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert("Candidature envoyée avec succès !");
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex overflow-hidden">
        <section className="w-full h-full flex">
          <div className="w-1/3 h-full overflow-y-auto border-r">
          <ul className="p-4 space-y-4">
              {offres.map((offre) => (
                <li key={offre._id} onClick={() => handleCardClick(offre)} className="border p-4 shadow-md rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  <h3 className="text-lg font-semibold">{offre.titre}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {offre.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {selectedOffre && (<div className="w-full h-full overflow-y-auto p-4 border rounded-md">
            <div className="p-12">
              <h2 className="text-3xl font-semibold">{selectedOffre.titre}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
                {selectedOffre.domaine}
              </p>
              <p className="mt-4">
                {selectedOffre.description}
              </p>
              <div className="font-bold text-s space-y-2 py-2">
                Niveau d'étude requis : {selectedOffre.niveauEtude}
              </div>
              <div className="font-bold text-s space-y-2 py-2">
                Compétences requises : {selectedOffre.prerequis}
              </div>
              <div className="font-bold text-s space-y-2 py-2">
                Date de publication : {selectedOffre.datePublication}
              </div>
              <div className="font-bold text-s space-y-2 py-2">
                Date limite de l'offre : {selectedOffre.dateLimite}
              </div>
              <div className="p-4 flex items-center justify-end">
                <Button className="my-4 bg-blue-600 border" onClick={() => handlePostulerClick()}>Postuler</Button>
              </div>
            </div>
          </div>)}
        </section>
      </main>
    </div>
  );
}
