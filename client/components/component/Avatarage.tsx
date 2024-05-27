import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import React, { useState, useEffect, useRef } from "react";

export default function Avatarage({ user }) {


  const [studyLevel, setStudyLevel] = useState(user?.candidat?.studyLevel);
  const [domain, setDomain] = useState(user?.candidat?.domain);
  const [editMode1, setEditMode1] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [skills, setSkills] = useState(user?.candidat?.skills);
  const [showInput, setShowInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const handleButtonClick = () => {
    fileInputRef2.current.click();
  };

  const handlePicSubmitClick = () => {
    fileInputRef.current.click();
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const idCandidat = user.candidat._id;
    console.log(formData);
    fetch(
      `http://localhost:3001/Api/candidat/picture?idCandidat=${idCandidat}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data) ;  window.location.reload() ;
      }
    )

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const idCandidat = user.candidat._id;
    console.log(formData);

    fetch(
      `http://localhost:3001/Api/candidat/documents?idCandidat=${idCandidat}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handleAddSkill = async () => {
    const updatedSkills = [...skills, newSkill];
    const idCandidat = user.candidat._id;
    console.log(updatedSkills);
    const response = await fetch(
      `http://localhost:3001/Api/candidat?idCandidat=${idCandidat}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: updatedSkills }),
      }
    );

    if (response.ok) {
      setSkills(updatedSkills);
      setNewSkill("");
      setShowInput(false);
    } else {
      console.error("Failed to update skills");
    }
  };

  const handleKeyDown1 = (e) => {
    if (e.key === "Enter") {
      setEditMode1(false);
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      setEditMode2(false);
    }
  };

  const handleLiClick1 = () => {
    setEditMode1(true);
  };

  const handleLiClick2 = () => {
    setEditMode2(true);
  };

  const handleStudyLevelChange = (e) => {
    setStudyLevel(e.target.value);
  };

  useEffect(() => {
    handleStudyLevelUpdate();
  }, [studyLevel]);

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  useEffect(() => {
    handleDomainUpdate();
  }, [domain]);

  const handleStudyLevelUpdate = () => {
    const idCandidat = user.candidat._id; // replace this with the actual way to get the ID
    fetch(`http://localhost:3001/Api/candidat?idCandidat=${idCandidat}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studyLevel,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDomainUpdate = () => {
    const idCandidat = user.candidat._id; // replace this with the actual way to get the ID

    fetch(`http://localhost:3001/Api/candidat?idCandidat=${idCandidat}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const serverUrl = 'http://localhost:3001';
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          alt="Avatar"
          className="object-cover w-full h-full border"
          height={36}
          src={
            user.candidat.picture
              ? `http://localhost:3001/${user.candidat.picture}`
              : "/personplaceholder.jpg"
          }
          style={{
            aspectRatio: "36/36",
            objectFit: "cover",
          }}
          width={36}
        />
      </SheetTrigger>
      <SheetContent className="bg-gray-200 shadow-md overflow-auto">
        <SheetHeader>
          <div className="flex flex-col items-center justify-center text-xl font-bold overflow-hidden">
            <div className="w-36 h-36 rounded-full overflow-hidden">
            <Image
              alt="Avatar"
              className="w-full h-full object-cover"
              height={500}
              src={
                user.candidat.picture
                  ? `http://localhost:3001/${user.candidat.picture}`
                  : "/personplaceholder.jpg"
              }
              width={500}
            />
            </div>
            <Button
              className="rounded-full text-xs h-1/2 px-2 py-1 -my-2 bg-gray-400 text-black"
              onClick={handlePicSubmitClick}
            >
              +
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePictureUpload}
              style={{ display: "none" }}
            />
            <div className="my-4">
              {user.candidat.firstName} {user.candidat.lastName}
            </div>
          </div>
          <div>
            <ul>
              <li>
                Niveau d&apos;étude :
                {editMode1 ? (
                  <input
                    type="text"
                    value={studyLevel}
                    onKeyDown={handleKeyDown1}
                    onChange={handleStudyLevelChange}
                  />
                ) : (
                  <span className="mx-1">
                    {studyLevel}
                    <Button
                      className="rounded-full px-1/2 text-xs h-1 w-4 -my-1 mx-2"
                      onClick={handleLiClick1}
                    >
                      ?
                    </Button>
                  </span>
                )}
              </li>

              <li onClick={handleLiClick2} className="my-1">
                Domaine :
                {editMode2 ? (
                  <input
                    type="text"
                    value={domain}
                    onKeyDown={handleKeyDown2}
                    onChange={handleDomainChange}
                  />
                ) : (
                  <span className="mx-1">{domain}</span>
                )}
              </li>
            </ul>
            <div className="my-3 font-bold">Compétences :</div>
            <div>
              {skills.map((item, index) => (
                <div className="text-m" key={index}>
                  ● {item}
                </div>
              ))}
            </div>
            {showInput && (
              <div>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button onClick={handleAddSkill}>Add Skill</Button>
              </div>
            )}
            <Button
              className="rounded-full px-1 py-2 h-1 mx-2 text-xs text-gray-100 bg-gray-400"
              onClick={() => setShowInput(!showInput)}
            >
              +
            </Button>

            <div className="my-4 font-bold">Mes Documents :</div>
            <div>
              {user.candidat.documents.map((document, index) => {
                // Extract the file name from the path
                const fileName = document.split("\\").pop();

                return (
                  <div key={index} className="file-container">
                    <Image
                      src="/pdf.png"
                      width={100}
                      height={100} // Replace with the path to your thumbnail
                      alt={fileName}
                      onClick={() => window.open(`${serverUrl}/${document}`, "_blank")}
                    />
                    
                    <p className="text-xs" onClick={() => window.open(`${serverUrl}/${document}`, "_blank")}>
                      {fileName}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center justify-center my-8">
            <Button onClick={handleButtonClick}>Ajouter un document</Button>
    <input
      type="file"
      ref={fileInputRef2}
      style={{ display: 'none' }}
      onChange={handleDocumentUpload}
    />
              <Button className="bg-red-500 my-2">Supprimer un document</Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
