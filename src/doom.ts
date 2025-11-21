import { Experience, PersonProfile } from './model'
import { createProfile, listPerson, checkImageURL, addToZone, canAccess } from './model.js'

export function aficherForemAjouterPerson() {
    const AjouterData = document.querySelector("#AjouterData") as HTMLDivElement;

    if (!AjouterData) return;

    AjouterData.classList.remove("hidden");
    AjouterData.classList.add("flex");
}

export function closeForemAjouterPerson() {
    const AjouterData = document.querySelector("#AjouterData") as HTMLDivElement;

    if (!AjouterData) return;

    AjouterData.classList.remove("flex");
    AjouterData.classList.add("hidden");
}



const experiencesContainer = document.getElementById("experiencesContainer") as HTMLFormElement;


export function addExperions() {
    const expDiv = document.createElement("div");
    expDiv.className = "flex flex-col gap-2 border p-2 rounded-lg bg-gray-50";

    expDiv.innerHTML = `
          <div id="experience-item" class="space-y-4 relative p-10 border-2 rounded-2xl">
                            <button type="button"
                            class="remove-btn absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                            onclick="this.parentElement.parentElement.remove()">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input id="company" type="text" placeholder="Entreprise"
                                class="input-focus px-4 py-3 border-2 rounded-2xl outline-none" />
                            <input id="position" type="text" placeholder="Poste"
                                class="input-focus px-4 py-3 border-2 rounded-2xl outline-none" />
                            <input id="startDate" type="date" placeholder="Date de début"
                                class="input-focus px-4 py-3 border-2 rounded-2xl outline-none" />
                            <input id="endDate" type="date" placeholder="Date de fin (optionnel)"
                                class="input-focus px-4 py-3 border-2 rounded-2xl outline-none" />
                            <textarea id="description" placeholder="Description de vos missions et réalisations..." rows="3"
                                class="input-focus md:col-span-2 px-4 py-3 border-2 rounded-2xl outline-none resize-none"></textarea>
                        </div>
                        </div>
        `;
    experiencesContainer.appendChild(expDiv);

}



export async function getProfileData() {

    const nomInput = document.getElementById("nom") as HTMLInputElement;
    const roleInput = document.getElementById("role") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const telInput = document.getElementById("telephone") as HTMLInputElement;
    const photoInput = document.getElementById("photoUrl") as HTMLInputElement;

    const nom = nomInput.value.trim();
    const role = roleInput.value.trim();
    const email = emailInput.value.trim();
    const telephone = telInput.value.trim();
    const photoUrl = photoInput.value.trim();



    if (!nom) {
        erroreMessage("Nom obligatoire");
        nomInput.focus();
        return false;
    }

    if (!role) {
        erroreMessage("Role obligatoire");
        roleInput.focus();
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erroreMessage("Email non valide");
        emailInput.focus();
        return false;
    }

    const telRegex = /^[0-9]+$/;
    if (!telRegex.test(telephone)) {
        erroreMessage("Téléphone doit contenir seulement des chiffres");
        telInput.focus();
        return false;
    }

    const isValid = await checkImageURL(photoUrl);
    const image = isValid ? photoUrl : "../media/profileVide.jpg";



    const experiences: Experience[] = [];
    const experienceElems = document.querySelectorAll("#experience-item");

    experienceElems.forEach((expElem) => {
        const company = (expElem.querySelector("#company") as HTMLInputElement).value || "";
        const position = (expElem.querySelector("#position") as HTMLInputElement).value || "";
        const startDate = (expElem.querySelector("#startDate") as HTMLInputElement).value || "";
        const endDate = (expElem.querySelector("#endDate") as HTMLInputElement)?.value || "";
        const description = (expElem.querySelector("#description") as HTMLInputElement)?.value || "";

        experiences.push({ company, position, startDate, endDate, description });
        return true;
    });


    const p: PersonProfile = {
        id: listPerson.length,
        nom,
        role,
        email,
        telephone,
        photoUrl: image,
        experiences,
        location: "sonZon"
    };

    console.log("Created:", createProfile(p));
    afficherLesPerson();
    return true
}





export function afficherLesPerson() {
    let listPersonElemnt = document.querySelector("#listPerson") as HTMLDivElement
    document.querySelector("#deleteFiltrage")?.classList.add("hidden")
    const titeLiset = listPersonElemnt.previousElementSibling?.querySelector("h2") as HTMLElement | null;

    if (titeLiset) {
        titeLiset.textContent = `liste Person`;
    }
    listPersonElemnt.innerHTML = ""
    listPerson.filter((p) => p.location == "sonZon").forEach((person) => {
        let profile = document.createElement("div") as HTMLDivElement;

        profile.innerHTML = `<div class="flex flex-col items-center cursor-pointer lg:flex-row lg:justify-around lg:bg-[#a2d6f9] lg:gap-2 lg:p-2 lg:rounded-[10px] ">
                    <img src="${person.photoUrl}" class="w-9 h-9  lg:w-15 lg:h-15 rounded-full border  object-cover shadow" />
                    <p class="font-medium text-gray-700 truncate w-20 lg:w-30 lg:text-2xl">${person.nom}</p>
                </div>`
        listPersonElemnt.appendChild(profile)
    })

}

function afficherLesPersonFiltred(listPerson: PersonProfile[], zoneName: string) {



    document.querySelector("#deleteFiltrage")?.classList.remove("hidden");

    const listPersonElemnt = document.querySelector("#listPerson") as HTMLDivElement;
    const titeLiset = listPersonElemnt.previousElementSibling?.querySelector("h2") as HTMLElement | null;

    if (titeLiset) {
        titeLiset.textContent = `liste acsese ${zoneName}`;
        console.log("zoneName =", zoneName);
    }

    listPersonElemnt.innerHTML = "";

    listPerson.forEach((person) => {

        let profile = document.createElement("div");

        profile.innerHTML = `
            <div class="flex flex-col items-center cursor-pointer 
                lg:flex-row lg:justify-around lg:bg-[#a2d6f9] lg:gap-2 lg:p-2 lg:rounded-[10px]">
                <img src="${person.photoUrl}" class="w-9 h-9 lg:w-15 lg:h-15 rounded-full border object-cover shadow" />
                <p class="font-medium text-gray-700 truncate w-20 lg:w-30 lg:text-2xl">
                    ${person.nom}
                </p>
            </div>`;

        profile.addEventListener("click", () => {

            if (!zoneName || zoneName.startsWith("#")) {
                console.error("zoneName invalide :", zoneName);
                return;
            }

            let zon = document.querySelector(`#${zoneName}`) as HTMLDivElement | null;

            if (!zon) {
                console.error("Zone introuvable dans le DOM :", zoneName);
                return;
            }

            if (addToZone(person.id, zoneName)) {

                afficherLesPersontoZone()

            }
        });

        listPersonElemnt.appendChild(profile);
    });
}




export function ajouterToZone(Elemet: Element) {
    let paretElement = Elemet.closest(".zone")
    console.log(paretElement)
    let zoneName = paretElement?.id
    console.log(zoneName)
    let listCorrect = listPerson.filter((person) => canAccess(person, zoneName ?? ""))
    console.log(zoneName)
    afficherLesPersonFiltred(listCorrect, zoneName ?? "empty")
}


function erroreMessage(message: string) {
    const nodeErrore = document.createElement("div");
    nodeErrore.className =
        "absolute right-5 top-5 z-[100] bg-red-500 text-white font-bold p-2 rounded shadow";

    nodeErrore.innerHTML = `
        <h4>${message}</h4>
        <div id="progress" class=" h-full bg-amber-900/40 top-0 left-0 absolute overflow-hidden rounded">
        </div>
    `;

    document.body.appendChild(nodeErrore);

    const progress = nodeErrore.querySelector("#progress") as HTMLDivElement;
    let width = 0;

    const timer = setInterval(() => {
        width += 1;
        progress.style.width = width + "%";

        if (width >= 100) {
            clearInterval(timer);
            nodeErrore.remove();
        }
    }, 50);
}




function afficherLesPersontoZone() {

    document.querySelectorAll(".person-item").forEach(e => e.remove());

    listPerson.forEach((p) => {

        let zon = document.querySelector(`#${p.location}`) as HTMLDivElement;
        if (!zon) return;

        
        let personContainer = document.createElement("div");
        personContainer.className =
            "person-item flex flex-col justify-center items-center w-[45%] md:w-[22%] max-w-[120px] mb-3";

        let img = document.createElement("div");
        img.className =
            "w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-cover bg-center border-2 border-amber-200";
        img.style.backgroundImage = `url(${p.photoUrl})`;

        let name = document.createElement("p");
        name.className = "text-white font-bold text-center text-sm mt-1";
        name.textContent = p.nom;

        personContainer.appendChild(img);
        personContainer.appendChild(name);

        let ajouterBtn = zon.querySelector("#AjouterToZone") as HTMLElement | null;
        

        if (ajouterBtn && ajouterBtn.parentElement) {
            ajouterBtn.parentElement.insertBefore(personContainer, ajouterBtn);
        }
    });

    afficherLesPerson();
}






