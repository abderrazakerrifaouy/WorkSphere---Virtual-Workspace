import { aficherForemAjouterPerson, closeForemAjouterPerson, addExperions, getProfileData, afficherLesPerson, ajouterToZone, rocherch , afficherLesPersontoZone} from './doom.js'
import {stListPerson} from './model.js'



function q<T extends HTMLElement = HTMLElement>(sel: string): T | null {
  return document.querySelector(sel) as T | null
}
function qAll(sel: string): NodeListOf<Element> {
  return document.querySelectorAll(sel)
}


function initApp() {
  const addPerson = q<HTMLButtonElement>('#addProfile')
  const closseForet = q<HTMLImageElement>('#closeIcone')
  const addExperienceBtn = q<HTMLButtonElement>('#addExperienceBtn')
  const profileForm = q<HTMLFormElement>('#profileForm')
  const AddtoZone = qAll('#AjouterToZone') 
  const inputeSearch = q<HTMLInputElement>('#paretRocherche')

  addPerson?.addEventListener('click', () => aficherForemAjouterPerson())
  closseForet?.addEventListener('click', () => closeForemAjouterPerson())
  addExperienceBtn?.addEventListener('click', () => addExperions())

  afficherLesPerson()

  profileForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const isValid = await getProfileData()
    console.log('profile valid?', isValid)
    if (isValid) {
      closeForemAjouterPerson()
      profileForm!.reset()
    }
  })

  if (AddtoZone && AddtoZone.length > 0) {
    AddtoZone.forEach((elemet) => {
      elemet.addEventListener('click', () => ajouterToZone(elemet))
    })
  }

  q('#deleteFiltrage')?.addEventListener('click', () => {
    afficherLesPerson()
  })

  if (inputeSearch) {
    inputeSearch.addEventListener('input', () => {
      const valeuInput = inputeSearch.value.trim()
      rocherch(valeuInput)
    })
  }
}

function loadProfiles() {
    try {
        const raw = localStorage.getItem("Profiles");
        if (!raw) return [];

        const list = JSON.parse(raw);
        return Array.isArray(list) ? list : [];
        
    } catch (error) {
        console.error("Error reading localStorage:", error);
        return [];
    }
}

stListPerson(loadProfiles())
afficherLesPersontoZone()


initApp()