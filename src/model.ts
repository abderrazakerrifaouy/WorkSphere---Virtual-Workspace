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
  email: string;
  telephone: string;
  experiences: Experience[];
  location: string;
}

export let listPerson: PersonProfile[] = [];
//window.listPerson = listPerson;

export function getListPerson() {
  return listPerson
}

function getDataLocalStorage(){
  let data = localStorage.getItem("Profiles") || '[]'
  listPerson = JSON.parse(data)
  
}

function saveListPersonToStorage(key = 'Profiles') {
  try {
    localStorage.setItem(key, JSON.stringify(listPerson))
  } catch (err) {
    console.error('Failed to save Profiles to localStorage', err)
  }
}

export function createProfile(person: PersonProfile): number {
  return listPerson.push(person);
  saveListPersonToStorage()
}


export function canAccess(person: PersonProfile, zone: string): boolean {
  const role = person.role;

  if (role === "Manager") return true;

  switch (zone) {

    case "reception":
      return role === "Réceptionniste";

    case "serveurs":
      return role === "Technicien IT";

    case "securite":
      return role === "Agent de sécurité";

    case "archives":
      return false;

    default:
      return true;
  }
}



export function addToZone(personId: number, zoneName: string): boolean {
  const person = listPerson.find((p) => p.id === personId);
  if (!person) return false;

  
  const peopleInZone = listPerson.filter((p) => p.location === zoneName);
  if (peopleInZone.length >= 4) return false;

  
  if (!canAccess(person, zoneName)) {
    console.warn(`${person.nom} ne peut pas entrer dans ${zoneName}`);
    return false;
  }

  person.location = zoneName;
  saveListPersonToStorage()
  return true;
}


export function checkImageURL(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url) return resolve(false);

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
