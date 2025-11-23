import { aficherForemAjouterPerson, closeForemAjouterPerson, addExperions, getProfileData, afficherLesPerson, ajouterToZone, rocherch } from './doom.js'
import { listPerson } from './model.js'

/* Small DOM helpers to remove repetition */
function q<T extends HTMLElement = HTMLElement>(sel: string): T | null {
  return document.querySelector(sel) as T | null
}
function qAll(sel: string): NodeListOf<Element> {
  return document.querySelectorAll(sel)
}
function on<E extends Event = Event>(el: Element | null, ev: string, cb: (e: E) => any) {
  if (!el) return
  el.addEventListener(ev, cb as EventListener)
}

/* Initialization */
function initApp() {
  const addPerson = q<HTMLButtonElement>('#addProfile')
  const closseForet = q<HTMLImageElement>('#closeIcone')
  const addExperienceBtn = q<HTMLButtonElement>('#addExperienceBtn')
  const profileForm = q<HTMLFormElement>('#profileForm')
  const AddtoZone = qAll('#AjouterToZone') // note: using id for multiple elements is not ideal; consider using a class
  const inputeSearch = q<HTMLInputElement>('#paretRocherche')

  on(addPerson, 'click', () => aficherForemAjouterPerson())
  on(closseForet, 'click', () => closeForemAjouterPerson())
  on(addExperienceBtn, 'click', () => addExperions())

  // initial render
  afficherLesPerson()

  on(profileForm, 'submit', async (e) => {
    e.preventDefault()
    const isValid = await getProfileData()
    console.log('profile valid?', isValid)
    if (isValid) {
      closeForemAjouterPerson()
      profileForm!.reset()
    }
  })

  // Attach add-to-zone handlers (safely)
  if (AddtoZone && AddtoZone.length > 0) {
    AddtoZone.forEach((elemet) => {
      elemet.addEventListener('click', () => ajouterToZone(elemet))
    })
  }

  // Clear filter button (may be absent)
  on(q('#deleteFiltrage'), 'click', () => {
    afficherLesPerson()
  })

  // Search input (ensure it's an input)
  if (inputeSearch) {
    inputeSearch.addEventListener('input', () => {
      const valeuInput = inputeSearch.value.trim()
      rocherch(valeuInput)
    })
  }
}

/* Auto-run init */
initApp()