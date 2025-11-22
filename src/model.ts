
export interface Experience {
  company: string;
  position: string;
  startDate: string; 
  endDate?: string;  
  description?: string;
}

export interface PersonProfile {
  id: number; 
  nom: string;
  role: string;
  photoUrl?: string;
  email?: string;
  telephone?: string;
  experiences: Experience[];
  location: string ;
}

export let listPerson : PersonProfile[] = []

export function createProfile(person:PersonProfile):number{
    return listPerson.push(person)
}



export function canAccess(
    person: PersonProfile,
     zone: string
): boolean {
  const role = person.role;

  switch (zone) {

    case "reception":
      return true ;

    case "serveurs":
      return role === "Technicien IT" || role === "Manager";

    case "securite":
      return role === "Agent de sécurité" || role === "Manager";

    case "archives":
      return  role === "Agent de sécurité" || role === "Manager" || role === "Technicien IT" ;
    default:
        return true
  }
}




 
export function addToZone(
  personId: number,
  zoneName: string,
): boolean {

  const person = listPerson.find(p => p.id === personId);
  if (!person) return false;


  if (!canAccess(person, zoneName)) {
    console.warn(` ${person.nom} ne peut pas entrer dans ${zoneName}`);
    return false;
  }

  person.location = zoneName;

  return true;
}



function modifePersone(
    person: PersonProfile ,
    listPersone:PersonProfile[]
):boolean {
    for (let i = 0; i < listPersone.length; i++) {
        if (listPersone[i].id == person.id) {
            listPersone[i] = person
            return true
        }
        
    }
    return false
}




export function checkImageURL(url: string): Promise<boolean> {
  return new Promise(resolve => {
    if (!url) return resolve(false);

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}








