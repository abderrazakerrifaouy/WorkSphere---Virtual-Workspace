
interface Experience {
  company: string;
  position: string;
  startDate: string; 
  endDate?: string;  
  description?: string;
}

interface PersonProfile {
  id: Number;
  nom: string;
  role: string;
  photoUrl?: string;
  email?: string;
  telephone?: string;
  experiences: Experience[];
}

export let listInisealePerson : PersonProfile[]

export let Réception  : PersonProfile[]
export let Salle_des_serveurs  : PersonProfile[]
export let Salle_de_sécurité  : PersonProfile[]
export let Manager  : PersonProfile[]
export let Nettoyage  : PersonProfile[]
export let Autres_rôles  : PersonProfile[]


function canAccess(
    person: PersonProfile,
     zone: string
): boolean {
  const role = person.role;

  switch (zone) {

    case "Réception":
      return true ;

    case "Salle des serveurs":
      return role === "Technicien IT" || role === "Manager";

    case "Salle de sécurité":
      return role === "Agent de sécurité" || role === "Manager";

    case "Salle d’archives":
      return  role === "Agent de sécurité" || role === "Manager" || role === "Technicien IT" ;
    default:
        return true
  }
}
 
export function addToZone(
  personId: number,
  targetList: PersonProfile[],
  zoneName: string,
  listApre:PersonProfile[]
): boolean {

  const person = listApre.find(p => p.id === personId);
  if (!person) return false;

  if (!canAccess(person, zoneName)) {
    console.warn(` ${person.nom} ne peut pas entrer dans ${zoneName}`);
    return false;
  }


  listApre = listApre.filter(p => p.id !== personId);

  targetList.push(person);
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







