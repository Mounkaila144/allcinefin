document.addEventListener('DOMContenLoaded',valeur=function (e) {
    var user_latlon = document.querySelectorAll('[data-coordo]');
    var coordonner = Array.from(user_latlon).map(item => JSON.parse(item.dataset.coordo));
    return coordonner;
})
let v=valeur();
var mymap = L.map('detailsMap').setView([13.5539143,2.1305520], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

Object.entries(v).forEach(agence => {

    let marker = L.marker([agence[1].lat, agence[1].lon]).addTo(mymap)
    marker.bindPopup("<h3>"+agence[1].nom+"</h3>")
    marker.openPopup();
})