export let listPerson = [];
export function createProfile(person) {
    return listPerson.push(person);
}
export function canAccess(person, zone) {
    const role = person.role;
    switch (zone) {
        case "serveurs":
            return (role === "Technicien IT" ||
                role === "Manager" ||
                role === "Nettoyage");
        case "securite":
            return (role === "Agent de sécurité" ||
                role === "Manager" ||
                role === "Nettoyage");
        case "archives":
            return (role === "Agent de sécurité" ||
                role === "Manager" ||
                role === "Technicien IT");
        default:
            return true;
    }
}
export function addToZone(personId, zoneName) {
    const person = listPerson.find((p) => p.id === personId);
    if (!person)
        return false;
    const peopleInZone = listPerson.filter((p) => p.location === zoneName);
    if (peopleInZone.length >= 4)
        return false;
    if (!canAccess(person, zoneName)) {
        console.warn(`${person.nom} ne peut pas entrer dans ${zoneName}`);
        return false;
    }
    person.location = zoneName;
    return true;
}
export function checkImageURL(url) {
    return new Promise((resolve) => {
        if (!url)
            return resolve(false);
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}
