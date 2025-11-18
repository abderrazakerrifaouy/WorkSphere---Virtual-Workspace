

function aficherForemAjouterPerson(){
    let AjouterData =  document.querySelector("#AjouterData") as HTMLDivElement 

    AjouterData.classList.replace("hidden" , "flex")
}


function closeForemAjouterPerson(){
    let AjouterData =  document.querySelector("#AjouterData") as HTMLDivElement 

    AjouterData.classList.replace("flex" , "hidden")

}