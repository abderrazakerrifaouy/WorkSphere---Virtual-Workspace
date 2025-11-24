var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { aficherForemAjouterPerson, closeForemAjouterPerson, addExperions, getProfileData, afficherLesPerson, ajouterToZone, rocherch } from './doom.js';
import { getListPerson } from './model.js';
function q(sel) {
    return document.querySelector(sel);
}
function qAll(sel) {
    return document.querySelectorAll(sel);
}
function initApp() {
    var _a;
    const addPerson = q('#addProfile');
    const closseForet = q('#closeIcone');
    const addExperienceBtn = q('#addExperienceBtn');
    const profileForm = q('#profileForm');
    const AddtoZone = qAll('#AjouterToZone');
    const inputeSearch = q('#paretRocherche');
    addPerson === null || addPerson === void 0 ? void 0 : addPerson.addEventListener('click', () => aficherForemAjouterPerson());
    closseForet === null || closseForet === void 0 ? void 0 : closseForet.addEventListener('click', () => closeForemAjouterPerson());
    addExperienceBtn === null || addExperienceBtn === void 0 ? void 0 : addExperienceBtn.addEventListener('click', () => addExperions());
    afficherLesPerson();
    profileForm === null || profileForm === void 0 ? void 0 : profileForm.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const isValid = yield getProfileData();
        console.log('profile valid?', isValid);
        if (isValid) {
            closeForemAjouterPerson();
            profileForm.reset();
        }
    }));
    if (AddtoZone && AddtoZone.length > 0) {
        AddtoZone.forEach((elemet) => {
            elemet.addEventListener('click', () => ajouterToZone(elemet));
        });
    }
    (_a = q('#deleteFiltrage')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        afficherLesPerson();
    });
    if (inputeSearch) {
        inputeSearch.addEventListener('input', () => {
            const valeuInput = inputeSearch.value.trim();
            rocherch(valeuInput);
        });
    }
}
function loadProfiles() {
    try {
        const raw = localStorage.getItem("Profiles");
        // ila ma kaynach data or raw = null
        if (!raw)
            return [];
        const list = JSON.parse(raw);
        // ila jat parsed w maشي array, nرجعو array
        return Array.isArray(list) ? list : [];
    }
    catch (error) {
        console.error("Error reading localStorage:", error);
        return [];
    }
}
let listPerso = getListPerson();
listPerso = [...loadProfiles()];
initApp();
