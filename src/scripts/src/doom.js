"use strict";
function aficherForemAjouterPerson() {
    let AjouterData = document.querySelector("#AjouterData");
    AjouterData.classList.replace("hidden", "flex");
}
function closeForemAjouterPerson() {
    let AjouterData = document.querySelector("#AjouterData");
    AjouterData.classList.replace("flex", "hidden");
}
