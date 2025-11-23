import { aficherForemAjouterPerson, closeForemAjouterPerson, addExperions, getProfileData, afficherLesPerson, ajouterToZone , rocherch } from './doom.js'
import {listPerson} from './model.js'
let addPerson = document.querySelector("#addProfile") as HTMLButtonElement
let closseForet = document.querySelector("#closeIcone") as HTMLImageElement
let addExperienceBtn = document.querySelector("#addExperienceBtn") as HTMLButtonElement;
let profileForm = document.querySelector("#profileForm") as HTMLFormElement
let AddtoZone = document.querySelectorAll("#AjouterToZone")
let inputeSearch = document.querySelector("#paretRocherche") as HTMLButtonElement
let listP = listPerson

addPerson.addEventListener("click", () => aficherForemAjouterPerson())
closseForet.addEventListener("click", () => closeForemAjouterPerson())
addExperienceBtn.addEventListener("click", () => addExperions())

afficherLesPerson()


profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid = await getProfileData();
  console.log(isValid)
  if (isValid) {
    closeForemAjouterPerson();
    profileForm.reset();
  }
});

Array.from(AddtoZone).forEach((elemet) => {
  elemet.addEventListener("click", () => ajouterToZone(elemet))
})

document.querySelector("#deleteFiltrage")?.addEventListener("click", () => {
  afficherLesPerson()
})

inputeSearch?.addEventListener("input", () => {
    const valeuInput = inputeSearch.value;
    rocherch(valeuInput);
});


