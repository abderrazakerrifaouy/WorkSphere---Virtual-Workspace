var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createProfile, listPerson, checkImageURL, addToZone, canAccess } from './model.js';
export function aficherForemAjouterPerson() {
    const AjouterData = document.querySelector("#AjouterData");
    if (!AjouterData)
        return;
    AjouterData.classList.remove("hidden");
    AjouterData.classList.add("flex");
}
export function closeForemAjouterPerson() {
    const AjouterData = document.querySelector("#AjouterData");
    if (!AjouterData)
        return;
    AjouterData.classList.remove("flex");
    AjouterData.classList.add("hidden");
}
const experiencesContainer = document.getElementById("experiencesContainer");
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
export function getProfileData() {
    return __awaiter(this, void 0, void 0, function* () {
        const nomInput = document.getElementById("nom");
        const roleInput = document.getElementById("role");
        const emailInput = document.getElementById("email");
        const telInput = document.getElementById("telephone");
        const photoInput = document.getElementById("photoUrl");
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
        if (!/^\d{10}$/.test(telephone)) {
            erroreMessage("Téléphone doit contenir 10 chiffres");
            telInput.focus();
            return false;
        }
        const isValid = yield checkImageURL(photoUrl);
        const image = isValid ? photoUrl : "../media/profileVide.jpg";
        const experiences = [];
        const experienceElems = document.querySelectorAll("#experience-item");
        experienceElems.forEach((expElem) => {
            var _a, _b;
            const company = expElem.querySelector("#company").value || "";
            const position = expElem.querySelector("#position").value || "";
            const startDate = expElem.querySelector("#startDate").value || "";
            const endDate = ((_a = expElem.querySelector("#endDate")) === null || _a === void 0 ? void 0 : _a.value) || "";
            const description = ((_b = expElem.querySelector("#description")) === null || _b === void 0 ? void 0 : _b.value) || "";
            experiences.push({ company, position, startDate, endDate, description });
            return true;
        });
        const p = {
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
        return true;
    });
}
export function afficherLesPerson() {
    var _a, _b;
    let listPersonElemnt = document.querySelector("#listPerson");
    (_a = document.querySelector("#deleteFiltrage")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    const titeLiset = (_b = listPersonElemnt.previousElementSibling) === null || _b === void 0 ? void 0 : _b.querySelector("h2");
    if (titeLiset) {
        titeLiset.textContent = `liste Person`;
    }
    listPersonElemnt.innerHTML = "";
    listPerson.filter((p) => p.location == "sonZon").forEach((person) => {
        let profile = document.createElement("div");
        profile.innerHTML = `<div class="flex flex-col items-center cursor-pointer lg:flex-row lg:justify-around lg:bg-[#a2d6f9] lg:gap-2 lg:p-2 lg:rounded-[10px] ">
                    <img src="${person.photoUrl}" class="w-9 h-9  lg:w-15 lg:h-15 rounded-full border  object-cover shadow" />
                    <p class="font-medium text-gray-700 truncate w-20 lg:w-30 lg:text-2xl">${person.nom}</p>
                </div>`;
        profile.addEventListener("click", () => {
            afficherPopupPerson(person.id);
        });
        listPersonElemnt.appendChild(profile);
    });
}
function afficherLesPersonFiltred(listPerson, zoneName) {
    var _a, _b;
    (_a = document.querySelector("#deleteFiltrage")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    const listPersonElemnt = document.querySelector("#listPerson");
    const titeLiset = (_b = listPersonElemnt.previousElementSibling) === null || _b === void 0 ? void 0 : _b.querySelector("h2");
    if (titeLiset) {
        titeLiset.textContent = `liste acsese ${zoneName}`;
        console.log("zoneName =", zoneName);
    }
    listPersonElemnt.innerHTML = "";
    listPerson.forEach((person) => {
        if (person.location != zoneName) {
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
                let zon = document.querySelector(`#${zoneName}`);
                if (!zon) {
                    console.error("Zone introuvable dans le DOM :", zoneName);
                    return;
                }
                if (addToZone(person.id, zoneName)) {
                    afficherLesPersontoZone();
                }
            });
            listPersonElemnt.appendChild(profile);
        }
    });
}
export function ajouterToZone(Elemet) {
    let paretElement = Elemet.closest(".zone");
    console.log(paretElement);
    let zoneName = paretElement === null || paretElement === void 0 ? void 0 : paretElement.id;
    console.log(zoneName);
    let listCorrect = listPerson.filter((person) => canAccess(person, zoneName !== null && zoneName !== void 0 ? zoneName : ""));
    console.log(zoneName);
    afficherLesPersonFiltred(listCorrect, zoneName !== null && zoneName !== void 0 ? zoneName : "empty");
}
function erroreMessage(message) {
    const nodeErrore = document.createElement("div");
    nodeErrore.className =
        "absolute right-5 top-5 z-[100] bg-red-500 text-white font-bold p-2 rounded shadow";
    nodeErrore.innerHTML = `
        <h4>${message}</h4>
        <div id="progress" class=" h-full bg-amber-900/40 top-0 left-0 absolute overflow-hidden rounded">
        </div>
    `;
    document.body.appendChild(nodeErrore);
    const progress = nodeErrore.querySelector("#progress");
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
        let zon = document.querySelector(`#${p.location}`);
        if (!zon)
            return;
        let personContainer = document.createElement("div");
        personContainer.className =
            "person-item flex flex-col  justify-around items-center w-[45%] md:w-[22%] max-w-[120px] mb-3";
        let img = document.createElement("div");
        img.className =
            "w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-cover bg-center border-2 border-amber-200";
        img.style.backgroundImage = `url(${p.photoUrl})`;
        let name = document.createElement("p");
        name.className = "text-white font-bold text-center text-sm mt-1";
        name.textContent = p.nom;
        personContainer.appendChild(img);
        personContainer.appendChild(name);
        personContainer.addEventListener("click", () => {
            afficherPopupPerson(p.id);
        });
        let ajouterBtn = zon.querySelector("#AjouterToZone");
        gereZoneBackgrouned();
        if (ajouterBtn && ajouterBtn.parentElement) {
            ajouterBtn.parentElement.insertBefore(personContainer, ajouterBtn);
        }
    });
    afficherLesPerson();
}
function gereZoneBackgrouned() {
    const Ozone = {
        conference: 0,
        serveurs: 0,
        securite: 0,
        reception: 0,
        archives: 0,
        personnel: 0,
    };
    listPerson.forEach((p) => {
        if (p.location in Ozone)
            Ozone[p.location]++;
    });
    Object.keys(Ozone).forEach((zoneName) => {
        const zoneEl = document.querySelector(`#${zoneName}`);
        if (!zoneEl)
            return;
        if (Ozone[zoneName] > 0) {
            zoneEl.classList.remove("bg-red-300/60");
        }
        else {
            zoneEl.classList.add("bg-red-300/60");
        }
    });
}
function afficherPopupPerson(idPerson) {
    var _a, _b, _c, _d;
    const person = listPerson.find(p => p.id === idPerson);
    if (!person) {
        console.warn("Personne introuvable");
        return;
    }
    let popup = document.querySelector("#popupPerson");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "popupPerson";
        popup.className = "fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4";
        popup.innerHTML = `
            <div id="popupContent" class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"></div>
        `;
        document.body.appendChild(popup);
        popup.addEventListener("click", (e) => {
            if (e.target === popup)
                popup.remove();
        });
    }
    const content = popup.querySelector("#popupContent");
    const expHtml = person.experiences.map(exp => {
        var _a;
        return `
        <div class="bg-linear-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-lg mb-3 hover:shadow-md transition-shadow">
            <h3 class="font-bold text-lg text-gray-800">${exp.company}</h3>
            <p class="text-blue-600 font-medium">${exp.position}</p>
            <p class="text-sm text-gray-500 mt-1">
                <span class="inline-flex items-center">
                    📅 ${exp.startDate} → ${(_a = exp.endDate) !== null && _a !== void 0 ? _a : "Présent"}
                </span>
            </p>
            ${exp.description ? `<p class="text-gray-700 mt-2 text-sm leading-relaxed">${exp.description}</p>` : ""}
        </div>
    `;
    }).join("");
    content.innerHTML = `
        <div class="relative">
            <!-- Header avec dégradé -->
            <div class="bg-linear-to-r from-blue-600 to-indigo-600 p-8 rounded-t-2xl text-white text-center">
                <img src="${(_a = person.photoUrl) !== null && _a !== void 0 ? _a : './default.png'}" 
                     class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"/>
                <h2 class="text-2xl font-bold mb-1">${person.nom}</h2>
                <p class="text-blue-100 text-lg">${person.role}</p>
            </div>

            <!-- Corps du popup -->
            <div class="p-6">
                <!-- Informations de contact -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">Email :</span>
                        <span class="font-medium">${(_b = person.email) !== null && _b !== void 0 ? _b : "—"}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">Téléphone :</span>
                        <span class="font-medium">${(_c = person.telephone) !== null && _c !== void 0 ? _c : "—"}</span>
                    </div>
                </div>

                <!-- Section Expériences -->
                <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        Expériences professionnelles
                    </h3>
                    <div class="space-y-3">
                        ${expHtml || '<p class="text-gray-500 text-center py-4">Aucune expérience enregistrée</p>'}
                    </div>
                </div>

               
                <div class="flex justify-center mt-6">
                    <button id="closePopup" 
                            class="px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg">
                         Fermer
                    </button>
                </div>
            </div>
        </div>
    `;
    (_d = content.querySelector("#closePopup")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        popup.remove();
    });
    popup.classList.remove("hidden");
    popup.style.opacity = "0";
    setTimeout(() => {
        popup.style.transition = "opacity 0.2s";
        popup.style.opacity = "1";
    }, 10);
}
