import {aficherForemAjouterPerson , closeForemAjouterPerson , addExperions , getProfileData , afficherLesPerson , ajouterToZone} from './doom.js'
import { addToZone } from './model.js';

let addPerson  = document.querySelector("#addProfile") as HTMLButtonElement
let closseForet = document.querySelector("#closeIcone") as HTMLImageElement
let addExperienceBtn = document.querySelector("#addExperienceBtn") as HTMLButtonElement;
let profileForm = document.querySelector("#profileForm") as HTMLFormElement
let AddtoZone = document.querySelectorAll("#AjouterToZone") 


addPerson.addEventListener("click" , ()=>aficherForemAjouterPerson())
closseForet.addEventListener("click" , ()=>closeForemAjouterPerson())
addExperienceBtn.addEventListener("click" ,()=>addExperions() )




profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isValid = await getProfileData();
    console.log(isValid)
    if (isValid) {
        closeForemAjouterPerson();
        profileForm.reset();
    }
});





afficherLesPerson()

Array.from(AddtoZone).forEach((elemet)=>{
  elemet.addEventListener("click", ()=>ajouterToZone(elemet))
})


document.querySelector("#deleteFiltrage")?.addEventListener("click" , ()=>{
  afficherLesPerson()
})

