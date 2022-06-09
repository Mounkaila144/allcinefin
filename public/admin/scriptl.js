document.addEventListener('DOMContenLoaded',valeur=function () {
    var user = document.querySelector('#detailsMap');
    var lati = user.dataset.isLat;
    var long = user.dataset.isLon;
    return a = long + "," + lati;
}
)
// On attend que le DOM soit chargé
    let v = valeur()
    console.log(valeur())
    // Nous initialisons la carte et nous la centrons sur Paris
    var mymap = L.map('detailsMap').setView([lati, long], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);


