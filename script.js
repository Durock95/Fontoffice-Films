window.onload = () => {
    getFilms("Aventure");
    document.getElementById("genre").addEventListener("change", (event) => {
        event.preventDefault();
        getFilms(event.target.value)
    })
}

function afficher(data) {
    document.getElementById("films").innerHTML = "";
    data.forEach(film => {
        let li = document.createElement("li");
        li.innerHTML = `${film.title} (${film.year} - ${film._id}) <a href="#" onclick="getFilm('${film._id}')">Détails</a>`;
        document.getElementById("films").appendChild(li);
    });

}

function afficherFilm(data) {
    console.log("afficherFilm",data);
    document.getElementById("popup").innerHTML = "";
    let h2 = document.createElement("h2");
    h2.innerHTML = `${data.title}`;
    document.getElementById("popup").appendChild(h2);
}

function getFilms(genre) {
    fetch(`http://localhost:5000/api/films/filtre/${genre}`).then(response => {
        return response.json()
    }).then(data => {
        console.log("data", data)
        afficher(data)
    }).catch(e => {
        console.log("Erreur")
    })
}

function getFilm(id) {
    fetch(`http://localhost:5000/api/films/${id}`).then(response => {
        return response.json()
    }).then(data => {
        console.log("data", data)
        afficherFilm(data)
    }).catch(e => {
        console.log("Erreur")
    })
    
}