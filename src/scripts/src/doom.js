var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createProfile, getListPerson, checkImageURL, addToZone, canAccess, saveListPersonToStorage } from './model.js';
function getEl(selector) {
    return document.querySelector(selector);
}
function showEl(el) {
    if (!el)
        return;
    el.classList.remove('hidden');
    el.classList.add('flex');
}
function hideEl(el) {
    if (!el)
        return;
    el.classList.remove('flex');
    el.classList.add('hidden');
}
export function aficherForemAjouterPerson() {
    const AjouterData = getEl('#AjouterData');
    showEl(AjouterData);
}
export function closeForemAjouterPerson() {
    const AjouterData = getEl('#AjouterData');
    hideEl(AjouterData);
}
const experiencesContainer = getEl('#experiencesContainer');
export function addExperions() {
    var _a;
    if (!experiencesContainer)
        return;
    const expDiv = document.createElement('div');
    expDiv.className = 'flex flex-col gap-2 border p-2 rounded-lg bg-gray-50';
    expDiv.innerHTML = `
        <div class="space-y-4 relative p-10 border-2 rounded-2xl experience-item">
            <button type="button" class="remove-btn absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg">
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
        </div>`;
    (_a = expDiv.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
        const target = e.currentTarget;
        expDiv.remove();
    });
    experiencesContainer.appendChild(expDiv);
}
function erroreMessage(message) {
    const nodeErrore = document.createElement('div');
    nodeErrore.className =
        'absolute right-5 top-5 z-[100] bg-red-500 text-white font-bold p-2 rounded shadow';
    nodeErrore.innerHTML = `
        <h4>${message}</h4>
        <div id="progress" class=" h-full bg-amber-900/40 top-0 left-0 absolute overflow-hidden rounded"></div>
    `;
    document.body.appendChild(nodeErrore);
    const progress = nodeErrore.querySelector('#progress');
    let width = 0;
    const timer = setInterval(() => {
        width += 1;
        if (progress)
            progress.style.width = width + '%';
        if (width >= 100) {
            clearInterval(timer);
            nodeErrore.remove();
        }
    }, 50);
}
function createProfileCard(person) {
    const profile = document.createElement('div');
    profile.className = 'cursor-pointer';
    profile.innerHTML = `
        <div class="flex flex-col items-center lg:flex-row lg:justify-around lg:bg-[#a2d6f9] lg:gap-2 lg:p-2 lg:rounded-[10px]">
            <img src="${person.photoUrl}" class="w-9 h-9 lg:w-15 lg:h-15 rounded-full border object-cover shadow" />
            <p class="font-medium text-gray-700 truncate w-20 lg:w-30 lg:text-2xl">${person.nom}</p>
        </div>`;
    profile.addEventListener('click', () => afficherPopupPerson(person.id));
    return profile;
}
function renderPersonList(persons, options) {
    var _a;
    const container = getEl('#listPersonElemnt');
    if (!container)
        return;
    if ((options === null || options === void 0 ? void 0 : options.showDeleteFilterBtn) === false) {
        hideEl(getEl('#deleteFiltrage'));
    }
    else {
        showEl(getEl('#deleteFiltrage'));
    }
    const titeLiset = (_a = container.previousElementSibling) === null || _a === void 0 ? void 0 : _a.querySelector('h2');
    if (titeLiset && (options === null || options === void 0 ? void 0 : options.titleText)) {
        titeLiset.textContent = options.titleText;
    }
    else if (titeLiset) {
        titeLiset.textContent = 'liste Person';
    }
    container.innerHTML = '';
    persons.forEach((person) => {
        if (person.location === 'sonZon') {
            container.appendChild(createProfileCard(person));
        }
    });
}
export function getProfileData() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const nomInput = getEl('#nom');
        const roleInput = getEl('#role');
        const emailInput = getEl('#email');
        const telInput = getEl('#telephone');
        const photoInput = getEl('#photoUrl');
        const nom = (_a = nomInput === null || nomInput === void 0 ? void 0 : nomInput.value.trim()) !== null && _a !== void 0 ? _a : '';
        const role = (_b = roleInput === null || roleInput === void 0 ? void 0 : roleInput.value.trim()) !== null && _b !== void 0 ? _b : '';
        const email = (_c = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value.trim()) !== null && _c !== void 0 ? _c : '';
        const telephone = (_d = telInput === null || telInput === void 0 ? void 0 : telInput.value.trim()) !== null && _d !== void 0 ? _d : '';
        const photoUrl = (_e = photoInput === null || photoInput === void 0 ? void 0 : photoInput.value.trim()) !== null && _e !== void 0 ? _e : '';
        if (!nom) {
            erroreMessage('Nom obligatoire');
            nomInput === null || nomInput === void 0 ? void 0 : nomInput.focus();
            return false;
        }
        if (!role) {
            erroreMessage('Role obligatoire');
            roleInput === null || roleInput === void 0 ? void 0 : roleInput.focus();
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            erroreMessage('Email non valide');
            emailInput === null || emailInput === void 0 ? void 0 : emailInput.focus();
            return false;
        }
        if (!/^\d{10}$/.test(telephone)) {
            erroreMessage('Téléphone doit contenir 10 chiffres');
            telInput === null || telInput === void 0 ? void 0 : telInput.focus();
            return false;
        }
        const isValidImage = yield checkImageURL(photoUrl);
        const image = isValidImage ? photoUrl : '../media/profileVide.jpg';
        const experiences = [];
        const experienceElems = Array.from(document.querySelectorAll('.experience-item'));
        const today = new Date().toISOString().split('T')[0];
        let valideExperrionce = true;
        for (const expElem of experienceElems) {
            const company = ((_g = (_f = expElem.querySelector('#company')) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : '').trim();
            const position = ((_j = (_h = expElem.querySelector('#position')) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : '').trim();
            const startDate = (_l = (_k = expElem.querySelector('#startDate')) === null || _k === void 0 ? void 0 : _k.value) !== null && _l !== void 0 ? _l : '';
            const endDate = (_o = (_m = expElem.querySelector('#endDate')) === null || _m === void 0 ? void 0 : _m.value) !== null && _o !== void 0 ? _o : '';
            const description = ((_q = (_p = expElem.querySelector('#description')) === null || _p === void 0 ? void 0 : _p.value) !== null && _q !== void 0 ? _q : '').trim();
            if (!startDate) {
                erroreMessage('Date de début est obligatoire');
                valideExperrionce = false;
                break;
            }
            if (startDate > today) {
                erroreMessage(`La date de début ${startDate} ne peut pas être dans le futur`);
                valideExperrionce = false;
                break;
            }
            if (endDate) {
                if (endDate > today) {
                    erroreMessage(`La date de fin ${endDate} ne peut pas être dans le futur`);
                    valideExperrionce = false;
                    break;
                }
                if (endDate < startDate) {
                    erroreMessage(`La date de fin ${endDate} ne peut pas être avant la date de début ${startDate}`);
                    valideExperrionce = false;
                    break;
                }
            }
            experiences.push({ company, position, startDate, endDate, description });
        }
        if (!valideExperrionce)
            return false;
        const p = {
            id: getListPerson().length,
            nom,
            role,
            email,
            telephone,
            photoUrl: image,
            experiences,
            location: 'sonZon'
        };
        console.log('Created:', createProfile(p));
        afficherLesPerson();
        return true;
    });
}
export function afficherLesPerson() {
    renderPersonList(getListPerson(), { titleText: 'liste Person', showDeleteFilterBtn: false });
}
export function afficherLesPersonRocherch(listRocherche) {
    renderPersonList(listRocherche, { titleText: 'liste Person', showDeleteFilterBtn: false });
}
function afficherLesPersonFiltred(persons, zoneName) {
    var _a, _b;
    (_a = getEl('#deleteFiltrage')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    const container = getEl('#listPersonElemnt');
    if (!container)
        return;
    const titeLiset = (_b = container.previousElementSibling) === null || _b === void 0 ? void 0 : _b.querySelector('h2');
    if (titeLiset)
        titeLiset.textContent = `liste acsese ${zoneName}`;
    container.innerHTML = '';
    persons.forEach((person) => {
        if (person.location !== zoneName) {
            const profile = document.createElement('div');
            profile.innerHTML = `
                <div class="flex flex-col items-center cursor-pointer lg:flex-row lg:justify-around lg:bg-[#a2d6f9] lg:gap-2 lg:p-2 lg:rounded-[10px]">
                    <img src="${person.photoUrl}" class="w-9 h-9 lg:w-15 lg:h-15 rounded-full border object-cover shadow" />
                    <p class="font-medium text-gray-700 truncate w-20 lg:w-30 lg:text-2xl">${person.nom}</p>
                </div>`;
            profile.addEventListener('click', () => {
                const zon = getEl(`#${zoneName}`);
                if (!zon) {
                    console.error('Zone introuvable dans le DOM :', zoneName);
                    return;
                }
                if (addToZone(person.id, zoneName)) {
                    afficherLesPersontoZone();
                }
            });
            container.appendChild(profile);
        }
    });
}
export function ajouterToZone(Elemet) {
    var _a;
    const parentElement = Elemet.closest('.zone');
    const zoneName = (_a = parentElement === null || parentElement === void 0 ? void 0 : parentElement.id) !== null && _a !== void 0 ? _a : '';
    const listCorrect = getListPerson().filter((person) => canAccess(person, zoneName));
    afficherLesPersonFiltred(listCorrect, zoneName || 'empty');
}
function createZonePersonItem(p) {
    const personContainer = document.createElement('div');
    personContainer.className =
        'person-item flex flex-col justify-around items-center w-[45%] md:w-[22%] max-w-[120px] mb-3 relative';
    const img = document.createElement('div');
    img.className =
        'w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-cover bg-center border-2 border-amber-200';
    img.style.backgroundImage = `url(${p.photoUrl})`;
    const name = document.createElement('p');
    name.className = 'text-white font-bold text-center text-sm mt-1 ';
    name.textContent = p.nom;
    personContainer.appendChild(img);
    personContainer.appendChild(name);
    personContainer.addEventListener('click', () => afficherPopupPerson(p.id));
    let deletElement = document.createElement('button');
    deletElement.className = "absolute top-0 -right-2 w-5 h-5 z-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg";
    deletElement.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            `;
    deletElement.addEventListener("click", (e) => {
        e.stopPropagation();
        let indexP = getListPerson().indexOf(p);
        getListPerson()[indexP].location = "sonZon";
        saveListPersonToStorage();
        afficherLesPersontoZone();
    });
    personContainer.appendChild(deletElement);
    return personContainer;
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
    getListPerson().forEach((p) => {
        if (p.location in Ozone)
            Ozone[p.location]++;
    });
    Object.keys(Ozone).forEach((zoneName) => {
        const zoneEl = getEl(`#${zoneName}`);
        if (!zoneEl)
            return;
        if (Ozone[zoneName] > 0) {
            zoneEl.classList.remove('bg-red-300/60');
        }
        else {
            zoneEl.classList.add('bg-red-300/60');
        }
    });
}
export function afficherLesPersontoZone() {
    document.querySelectorAll('.person-item').forEach(e => e.remove());
    getListPerson().forEach((p) => {
        const zon = getEl(`#${p.location}`);
        if (!zon)
            return;
        const item = createZonePersonItem(p);
        const ajouterBtn = zon.querySelector('#AjouterToZone');
        gereZoneBackgrouned();
        if (ajouterBtn && ajouterBtn.parentElement) {
            ajouterBtn.parentElement.insertBefore(item, ajouterBtn);
        }
    });
    afficherLesPerson();
}
function afficherPopupPerson(idPerson) {
    var _a, _b, _c, _d, _e;
    const person = getListPerson().find(p => p.id === idPerson);
    if (!person) {
        console.warn('Personne introuvable');
        return;
    }
    let popup = getEl('#popupPerson');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popupPerson';
        popup.className = 'fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4';
        popup.innerHTML = `
            <div id="popupContent" class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"></div>
        `;
        document.body.appendChild(popup);
        popup.addEventListener('click', (e) => {
            if (e.target === popup)
                popup === null || popup === void 0 ? void 0 : popup.remove();
        });
    }
    const content = popup.querySelector('#popupContent');
    const expHtml = (person.experiences || []).map(exp => {
        var _a;
        return `
        <div class="bg-linear-to-r from-blue-50 to-indigo-50  p-4 rounded-lg mb-3 hover:shadow-md transition-shadow">
            <h3 class="font-bold text-lg text-gray-800">${exp.company}</h3>
            <p class="text-blue-600 font-medium">${exp.position}</p>
            <p class="text-sm text-gray-500 mt-1">
                <span class="inline-flex items-center">📅 ${exp.startDate} → ${(_a = exp.endDate) !== null && _a !== void 0 ? _a : 'Présent'}</span>
            </p>
            ${exp.description ? `<p class="text-gray-700 mt-2 text-sm leading-relaxed">${exp.description}</p>` : ''}
        </div>
    `;
    }).join('');
    content.innerHTML = `
        <div class="relative">
            <div class="bg-linear-to-r from-blue-600 to-indigo-600 p-8 rounded-t-2xl text-white text-center">
                <img src="${(_a = person.photoUrl) !== null && _a !== void 0 ? _a : './default.png'}" 
                     class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"/>
                <h2 class="text-2xl font-bold mb-1">${person.nom}</h2>
                <p class="text-blue-100 text-lg">${person.role}</p>
            </div>

            <div class="p-6">
                <div class="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">Email :</span>
                        <span class="font-medium">${(_b = person.email) !== null && _b !== void 0 ? _b : '—'}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">Téléphone :</span>
                        <span class="font-medium">${(_c = person.telephone) !== null && _c !== void 0 ? _c : '—'}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">location :</span>
                        <span class="font-medium">${(_d = person.location) !== null && _d !== void 0 ? _d : '—'}</span>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">Expériences professionnelles</h3>
                    <div class="space-y-3">
                        ${expHtml || '<p class="text-gray-500 text-center py-4">Aucune expérience enregistrée</p>'}
                    </div>
                </div>

                <div class="flex justify-center mt-6">
                    <button id="closePopup" class="px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    `;
    (_e = content.querySelector('#closePopup')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => popup === null || popup === void 0 ? void 0 : popup.remove());
    popup.classList.remove('hidden');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.transition = 'opacity 0.2s';
        popup.style.opacity = '1';
    }, 10);
}
export function rocherch(valeuInput) {
    const listName = getListPerson().filter((person) => person.nom.startsWith(valeuInput));
    const listRole = getListPerson().filter((person) => person.role.startsWith(valeuInput));
    const listFinal = [...listName, ...listRole];
    const uniqueList = [...new Map(listFinal.map(item => [item.id, item])).values()];
    afficherLesPersonRocherch(uniqueList);
}
