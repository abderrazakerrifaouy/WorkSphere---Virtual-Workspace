export let listInisealePerson;
export let Réception;
export let Salle_des_serveurs;
export let Salle_de_sécurité;
export let Manager;
export let Nettoyage;
export let Autres_rôles;
function canAccess(person, zone) {
    const role = person.role;
    switch (zone) {
        case "Réception":
            return true;
        case "Salle des serveurs":
            return role === "Technicien IT" || role === "Manager";
        case "Salle de sécurité":
            return role === "Agent de sécurité" || role === "Manager";
        case "Salle d’archives":
            return role === "Agent de sécurité" || role === "Manager" || role === "Technicien IT";
        default:
            return true;
    }
}
export function addToZone(personId, targetList, zoneName, listApre) {
    const person = listApre.find(p => p.id === personId);
    if (!person)
        return false;
    if (!canAccess(person, zoneName)) {
        console.warn(` ${person.nom} ne peut pas entrer dans ${zoneName}`);
        return false;
    }
    listApre = listApre.filter(p => p.id !== personId);
    targetList.push(person);
    return true;
}
function modifePersone(person, listPersone) {
    for (let i = 0; i < listPersone.length; i++) {
        if (listPersone[i].id == person.id) {
            listPersone[i] = person;
            return true;
        }
    }
    return false;
}
