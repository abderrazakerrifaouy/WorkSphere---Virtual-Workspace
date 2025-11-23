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
/* Small DOM helpers to remove repetition */
function q(sel) {
    return document.querySelector(sel);
}
function qAll(sel) {
    return document.querySelectorAll(sel);
}
function on(el, ev, cb) {
    if (!el)
        return;
    el.addEventListener(ev, cb);
}
/* Initialization */
function initApp() {
    const addPerson = q('#addProfile');
    const closseForet = q('#closeIcone');
    const addExperienceBtn = q('#addExperienceBtn');
    const profileForm = q('#profileForm');
    const AddtoZone = qAll('#AjouterToZone'); // note: using id for multiple elements is not ideal; consider using a class
    const inputeSearch = q('#paretRocherche');
    on(addPerson, 'click', () => aficherForemAjouterPerson());
    on(closseForet, 'click', () => closeForemAjouterPerson());
    on(addExperienceBtn, 'click', () => addExperions());
    // initial render
    afficherLesPerson();
    on(profileForm, 'submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const isValid = yield getProfileData();
        console.log('profile valid?', isValid);
        if (isValid) {
            closeForemAjouterPerson();
            profileForm.reset();
        }
    }));
    // Attach add-to-zone handlers (safely)
    if (AddtoZone && AddtoZone.length > 0) {
        AddtoZone.forEach((elemet) => {
            elemet.addEventListener('click', () => ajouterToZone(elemet));
        });
    }
    // Clear filter button (may be absent)
    on(q('#deleteFiltrage'), 'click', () => {
        afficherLesPerson();
    });
    // Search input (ensure it's an input)
    if (inputeSearch) {
        inputeSearch.addEventListener('input', () => {
            const valeuInput = inputeSearch.value.trim();
            rocherch(valeuInput);
        });
    }
}
/* Auto-run init */
initApp();
