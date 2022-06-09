let mymap // Variable qui permettra de stocker la carte
let marqueur
// On attend que le DOM soit chargé
window.onload = () => {
    // Nous initialisons la carte et nous la centrons sur Paris
    mymap = L.map('detailsMap').setView([13.5539143,2.1305520], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);
    mymap.on('click', mapClickListen)
    L.marker([13.5539143, 2.1305520]).addTo(map)
        .bindPopup("<h3>Boutique</h3>")
        .openPopup();
}
/**
 * Cette fonction se déclenche au clic, crée un marqueur et remplit les champs latitude et longitude
 * @param {event} e
 */
function mapClickListen(e) {
    // On récupère les coordonnées du clic
    pos = e.latlng

    // On crée un marqueur
    addMarker(pos)

    // On affiche les coordonnées dans le formulaire
    document.querySelector("#registration_form_lat").value=pos.lat
    document.querySelector("#registration_form_lon").value=pos.lng
}
/**
 * Ajoute un marqueur sur la carte
 * @param {*} pos
 */
function addMarker(pos){
    // On vérifie si le marqueur existe déjà
    if (marqueur !== undefined) {
        // Si oui, on le retire
        mymap.removeLayer(marqueur);
    }

    // On crée le marqueur aux coordonnées "pos"
    marqueur = L.marker(
        pos, {
            // On rend le marqueur déplaçable
            draggable: true
        }
    )

    // On écoute le glisser/déposer et on met à jour les coordonnées
    marqueur.on('dragend', function(e) {
        pos = e.target.getLatLng();
        document.querySelector("#registration_form_lat").value=pos.lat;
        document.querySelector("#registration_form_lon").value=pos.lng;
    });

    // On ajoute le marqueur
    marqueur.addTo(mymap)
}
let a=['a','b','c']
let b=a.includes('h')
console.log(b)