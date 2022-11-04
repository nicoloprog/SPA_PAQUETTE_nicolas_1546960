import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// Page actuelle en string. Utilisé dans les v-if
const page = ref("accueil")

// Informations utilisés par la page actuelle
const page_infos = ref(null)

const projets = ref([])

const grille = ref([
    "", "", "",
    "", "", "",
    "", "", "",
])

const tour_joueur = ref("x")

const fin = ref(false)

const vainqueur = ref(null)

fetch("data/projets.json").then(resp => {
    resp.json().then(contenu_json =>{
        projets.value = contenu_json
    })
})


function jouer(index) {
    grille.value[index] = tour_joueur.value
    changerJoueur()
    verifierFin()
}

function changerJoueur() {
    if (tour_joueur.value == "x") {
        tour_joueur.value = "o"
    } else {
        tour_joueur.value = "x"
    }

    // tour_joueur.value = (tour_joueur.value == "x") 
    //     ? "o" 
    //     : "x"
}

function verifierFin() {
    const horizontal1 = grille.value[0] + grille.value[1] + grille.value[2]
    const horizontal2 = grille.value[3] + grille.value[4] + grille.value[5]
    const horizontal3 = grille.value[6] + grille.value[7] + grille.value[8]
    
    const vertical1 = grille.value[0] + grille.value[3] + grille.value[6]
    const vertical2 = grille.value[1] + grille.value[4] + grille.value[7]
    const vertical3 = grille.value[2] + grille.value[5] + grille.value[8]

    const diago1 = grille.value[0] + grille.value[4] + grille.value[8]
    const diago2 = grille.value[2] + grille.value[4] + grille.value[6]

    const liste = [
        horizontal1, horizontal2, horizontal3,
        vertical1, vertical2, vertical3,
        diago1, diago2,
    ]

    for (let ligne of liste) {
        if (ligne == "xxx" || ligne == "ooo") {
            vainqueur.value = ligne[0]
            fin.value = true
            return
        }
    }

}
/**
 * Change de page vers `nouvelle_page`.
 * Possibilité de passer un deuxième paramètre pour transférer de l'info à la nouvelle page
 * @param {string} nouvelle_page 
 * @param {any} nouvelle_info 
 */
function changerPage(nouvelle_page, nouvelle_info = null) {
    page.value = nouvelle_page
    page_infos.value = nouvelle_info
}


const root = {
    setup() {
        return {
            page,
            page_infos,
            projets,
            grille,
            tour_joueur,
            fin,
            vainqueur,

            changerPage,
            jouer,
        }
    }
}

createApp(root).mount("#app")