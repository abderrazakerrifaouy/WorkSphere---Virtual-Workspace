import { Experience, PersonProfile } from './model'
import { createProfile, getListPerson, checkImageURL, addToZone, canAccess } from './model.js'

function getEl<T extends HTMLElement = HTMLElement>(selector: string): T | null {
    return document.querySelector(selector) as T | null;
}
function showEl(el: HTMLElement | null) {
    if (!el) return;
    el.classList.remove('hidden');
    el.classList.add('flex');
}
function hideEl(el: HTMLElement | null) {
    if (!el) return;
    el.classList.remove('flex');
    el.classList.add('hidden');
}


export function aficherForemAjouterPerson() {
    const AjouterData = getEl<HTMLDivElement>('#AjouterData');
    showEl(AjouterData);
}
export function closeForemAjouterPerson() {
    const AjouterData = getEl<HTMLDivElement>('#AjouterData');
    hideEl(AjouterData);
}

const experiencesContainer = getEl<HTMLDivElement>('#experiencesContainer');
export function addExperions() {
    if (!experiencesContainer) return;

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

    expDiv.querySelector('.remove-btn')?.addEventListener('click', (e) => {
        const target = (e.currentTarget as HTMLElement);
        expDiv.remove();
    });

    experiencesContainer.appendChild(expDiv);
}


function erroreMessage(message: string) {
    const nodeErrore = document.createElement('div');
    nodeErrore.className =
        'absolute right-5 top-5 z-[100] bg-red-500 text-white font-bold p-2 rounded shadow';
    nodeErrore.innerHTML = `
        <h4>${message}</h4>
        <div id="progress" class=" h-full bg-amber-900/40 top-0 left-0 absolute overflow-hidden rounded"></div>
    `;
    document.body.appendChild(nodeErrore);
    const progress = nodeErrore.querySelector('#progress') as HTMLDivElement;
    let width = 0;
    const timer = setInterval(() => {
        width += 1;
        if (progress) progress.style.width = width + '%';
        if (width >= 100) {
            clearInterval(timer);
            nodeErrore.remove();
        }
    }, 50);
}


function createProfileCard(person: PersonProfile): HTMLDivElement {
    const profile = document.createElement('div') as HTMLDivElement;
    profile.className = 'cursor-pointer';
    profile.innerHTML = `
        <div class="flex flex-col items-center lg:flex-row lg:justify-around lg:bg-[#a2d6f9] lg:gap-2 lg:p-2 lg:rounded-[10px]">
            <img src="${person.photoUrl}" class="w-9 h-9 lg:w-15 lg:h-15 rounded-full border object-cover shadow" />
            <p class="font-medium text-gray-700 truncate w-20 lg:w-30 lg:text-2xl">${person.nom}</p>
        </div>`;
    profile.addEventListener('click', () => afficherPopupPerson(person.id));
    return profile;
}


function renderPersonList(
    persons: PersonProfile[],
    options?: {
        titleText?: string,
        showDeleteFilterBtn?: boolean
    }
) {
    const container = getEl<HTMLDivElement>('#listPersonElemnt');
    if (!container) return;

    if (options?.showDeleteFilterBtn === false) {
        hideEl(getEl('#deleteFiltrage'))
    } else {
        showEl(getEl('#deleteFiltrage'))
    }

    const titeLiset = container.previousElementSibling?.querySelector('h2') as HTMLElement | null;
    if (titeLiset && options?.titleText) {
        titeLiset.textContent = options.titleText;
    } else if (titeLiset) {
        titeLiset.textContent = 'liste Person';
    }

    container.innerHTML = '';
    persons.forEach((person) => {
        if (person.location === 'sonZon') {
            container.appendChild(createProfileCard(person));
        }
    });
}


export async function getProfileData() {
    const nomInput = getEl<HTMLInputElement>('#nom');
    const roleInput = getEl<HTMLInputElement>('#role');
    const emailInput = getEl<HTMLInputElement>('#email');
    const telInput = getEl<HTMLInputElement>('#telephone');
    const photoInput = getEl<HTMLInputElement>('#photoUrl');

    const nom = nomInput?.value.trim() ?? '';
    const role = roleInput?.value.trim() ?? '';
    const email = emailInput?.value.trim() ?? '';
    const telephone = telInput?.value.trim() ?? '';
    const photoUrl = photoInput?.value.trim() ?? '';

    if (!nom) {
        erroreMessage('Nom obligatoire');
        nomInput?.focus();
        return false;
    }
    if (!role) {
        erroreMessage('Role obligatoire');
        roleInput?.focus();
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erroreMessage('Email non valide');
        emailInput?.focus();
        return false;
    }
    if (!/^\d{10}$/.test(telephone)) {
        erroreMessage('Téléphone doit contenir 10 chiffres');
        telInput?.focus();
        return false;
    }

    const isValidImage = await checkImageURL(photoUrl);
    const image = isValidImage ? photoUrl : '../media/profileVide.jpg';

    const experiences: Experience[] = [];
    const experienceElems = Array.from(document.querySelectorAll('.experience-item'));

    const today = new Date().toISOString().split('T')[0];
    let valideExperrionce = true;

    for (const expElem of experienceElems) {
        const company = ((expElem.querySelector('#company') as HTMLInputElement | null)?.value ?? '').trim();
        const position = ((expElem.querySelector('#position') as HTMLInputElement | null)?.value ?? '').trim();
        const startDate = (expElem.querySelector('#startDate') as HTMLInputElement | null)?.value ?? '';
        const endDate = (expElem.querySelector('#endDate') as HTMLInputElement | null)?.value ?? '';
        const description = ((expElem.querySelector('#description') as HTMLTextAreaElement | null)?.value ?? '').trim();

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

    if (!valideExperrionce) return false;

    const p: PersonProfile = {
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
}


export function afficherLesPerson() {
    renderPersonList(getListPerson(), { titleText: 'liste Person', showDeleteFilterBtn: false });
}

export function afficherLesPersonRocherch(listRocherche: PersonProfile[]) {
    renderPersonList(listRocherche, { titleText: 'liste Person', showDeleteFilterBtn: false });
}


function afficherLesPersonFiltred(persons: PersonProfile[], zoneName: string) {
    getEl('#deleteFiltrage')?.classList.remove('hidden');
    const container = getEl<HTMLDivElement>('#listPersonElemnt');
    if (!container) return;

    const titeLiset = container.previousElementSibling?.querySelector('h2') as HTMLElement | null;
    if (titeLiset) titeLiset.textContent = `liste acsese ${zoneName}`;

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
                const zon = getEl<HTMLDivElement>(`#${zoneName}`);
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


export function ajouterToZone(Elemet: Element) {
    const parentElement = Elemet.closest('.zone') as HTMLElement | null;
    const zoneName = parentElement?.id ?? '';
    const listCorrect = getListPerson().filter((person) => canAccess(person, zoneName));
    afficherLesPersonFiltred(listCorrect, zoneName || 'empty');
}


function createZonePersonItem(p: PersonProfile) {
    const personContainer = document.createElement('div');
    personContainer.className =
        'person-item flex flex-col justify-around items-center w-[45%] md:w-[22%] max-w-[120px] mb-3';

    const img = document.createElement('div');
    img.className =
        'w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-cover bg-center border-2 border-amber-200';
    img.style.backgroundImage = `url(${p.photoUrl})`;

    const name = document.createElement('p');
    name.className = 'text-white font-bold text-center text-sm mt-1';
    name.textContent = p.nom;

    personContainer.appendChild(img);
    personContainer.appendChild(name);
    personContainer.addEventListener('click', () => afficherPopupPerson(p.id));

    return personContainer;
}

function gereZoneBackgrouned() {
    const Ozone: Record<string, number> = {
        conference: 0,
        serveurs: 0,
        securite: 0,
        reception: 0,
        archives: 0,
        personnel: 0,
    };

    getListPerson().forEach((p) => {
        if (p.location in Ozone) Ozone[p.location]++;
    });

    Object.keys(Ozone).forEach((zoneName) => {
        const zoneEl = getEl<HTMLElement>(`#${zoneName}`);
        if (!zoneEl) return;

        if (Ozone[zoneName] > 0) {
            zoneEl.classList.remove('bg-red-300/60');
        } else {
            zoneEl.classList.add('bg-red-300/60');
        }
    });
}

function afficherLesPersontoZone() {
    document.querySelectorAll('.person-item').forEach(e => e.remove());

    getListPerson().forEach((p) => {
        const zon = getEl<HTMLDivElement>(`#${p.location}`);
        if (!zon) return;

        const item = createZonePersonItem(p);
        const ajouterBtn = zon.querySelector('#AjouterToZone') as HTMLElement | null;
        gereZoneBackgrouned();

        if (ajouterBtn && ajouterBtn.parentElement) {
            ajouterBtn.parentElement.insertBefore(item, ajouterBtn);
        }
    });

    afficherLesPerson();
}


function afficherPopupPerson(idPerson: number) {
    const person = getListPerson().find(p => p.id === idPerson);
    if (!person) {
        console.warn('Personne introuvable');
        return;
    }

    let popup = getEl<HTMLDivElement>('#popupPerson');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popupPerson';
        popup.className = 'fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4';
        popup.innerHTML = `
            <div id="popupContent" class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"></div>
        `;
        document.body.appendChild(popup);
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup?.remove();
        });
    }

    const content = popup.querySelector('#popupContent') as HTMLDivElement;
    const expHtml = (person.experiences || []).map(exp => `
        <div class="bg-linear-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-lg mb-3 hover:shadow-md transition-shadow">
            <h3 class="font-bold text-lg text-gray-800">${exp.company}</h3>
            <p class="text-blue-600 font-medium">${exp.position}</p>
            <p class="text-sm text-gray-500 mt-1">
                <span class="inline-flex items-center">📅 ${exp.startDate} → ${exp.endDate ?? 'Présent'}</span>
            </p>
            ${exp.description ? `<p class="text-gray-700 mt-2 text-sm leading-relaxed">${exp.description}</p>` : ''}
        </div>
    `).join('');

    content.innerHTML = `
        <div class="relative">
            <div class="bg-linear-to-r from-blue-600 to-indigo-600 p-8 rounded-t-2xl text-white text-center">
                <img src="${person.photoUrl ?? './default.png'}" 
                     class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"/>
                <h2 class="text-2xl font-bold mb-1">${person.nom}</h2>
                <p class="text-blue-100 text-lg">${person.role}</p>
            </div>

            <div class="p-6">
                <div class="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">Email :</span>
                        <span class="font-medium">${person.email ?? '—'}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-600">Téléphone :</span>
                        <span class="font-medium">${person.telephone ?? '—'}</span>
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

    content.querySelector('#closePopup')?.addEventListener('click', () => popup?.remove());

    popup.classList.remove('hidden');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup!.style.transition = 'opacity 0.2s';
        popup!.style.opacity = '1';
    }, 10);
}


export function rocherch(valeuInput: string) {
    const listName: PersonProfile[] = getListPerson().filter((person) => person.nom.startsWith(valeuInput));
    const listRole: PersonProfile[] = getListPerson().filter((person) => person.role.startsWith(valeuInput));
    const listFinal = [...listName, ...listRole];
    const uniqueList = [...new Map(listFinal.map(item => [item.id, item])).values()];
    afficherLesPersonRocherch(uniqueList);
}