
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







