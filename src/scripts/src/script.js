var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { aficherForemAjouterPerson, closeForemAjouterPerson, addExperions, getProfileData, afficherLesPerson, ajouterToZone } from './doom.js';
let addPerson = document.querySelector("#addProfile");
let closseForet = document.querySelector("#closeIcone");
let addExperienceBtn = document.querySelector("#addExperienceBtn");
let profileForm = document.querySelector("#profileForm");
let AddtoZone = document.querySelectorAll("#AjouterToZone");
addPerson.addEventListener("click", () => aficherForemAjouterPerson());
closseForet.addEventListener("click", () => closeForemAjouterPerson());
addExperienceBtn.addEventListener("click", () => addExperions());
afficherLesPerson();
profileForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const isValid = yield getProfileData();
    console.log(isValid);
    if (isValid) {
        closeForemAjouterPerson();
        profileForm.reset();
    }
}));
Array.from(AddtoZone).forEach((elemet) => {
    elemet.addEventListener("click", () => ajouterToZone(elemet));
});
(_a = document.querySelector("#deleteFiltrage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    afficherLesPerson();
});
