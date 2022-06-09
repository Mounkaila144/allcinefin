document.addEventListener('DOMContenLoaded',valeur=function (e) {
    var user = document.querySelector('#detailsMap');
    var lati = user.dataset.lat;
    var long = user.dataset.lon;
    var nom = user.dataset.nom;
    if (e==='lati'){
        return lati;
    }
    else if (e==='long'){
        return long
    }
    else if (e==='nom'){
        return nom
    }
})


// Nous initialisons la carte et nous la centrons sur Paris
var mymap = L.map('detailsMap').setView([valeur('lati'),valeur('long')], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);
L.marker([valeur('lati'),valeur('long')]).addTo(mymap)
    .bindPopup("<h3>"+valeur('nom')+"</h3>")
    .openPopup();

