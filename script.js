const url = 'http://localhost:5001'
window.onload = () => {
    getGenres();
    getFilms("Action")
    // let select = document.getElementById("genre");
    // select.addEventListener("change", (event) => {
    //     event.preventDefault();
    //     getFilms(event.target.value)
    // })
}

// ct01.afpa-balma.fr:5100
function afficher(data) {
    document.getElementById("films").innerHTML = "";
    data.forEach(film => {
        let li = document.createElement("li");
        li.className = "h-50 btn-toolbar justify-content-between align-items-center";
        li.innerHTML = `${film.title} (${film.year}) <div class="btn-group btn-group-sm" id="btn"><a class="btn btn-outline-light" href="#" onclick="getFilm('${film._id}')">Détails</a><a class="btn btn-outline-light" id="modify" href="#" onclick="hydrateFilm('${film._id}')">Modifier</a></div>`;
        document.getElementById("films").appendChild(li);
    });

}

function afficherFilm(data) {
    let actors = data.actors.map(actor => actor.first_name + " " + actor.last_name).join(", ");
    // console.log(actors);
    let popup = document.getElementById("popup")
    popup.innerHTML = "";
    let h2 = document.createElement("h2");
    h2.innerHTML = `${data.title}`;
    let p = document.createElement("p");
    p.innerHTML = `<u>Année :</u> ${data.year} <br> <u>Réalisateur : </u> ${data.director.first_name} ${data.director.last_name} <br> <u>Acteurs :</u> ${actors} <br> <u>Synopsis :</u> ${data.summary} <br> <u>Genre :</u> ${data.genre}`;
    popup.appendChild(h2);
    popup.appendChild(p);
}

function afficherTitreGenre(genre) {
    document.querySelector("h1").innerHTML = `Films du genre "${genre}"`;
}

function createFilm() {
    getGenres();
    // console.log(data);
    let formContainer = document.getElementById("formular");
    let create = document.getElementById("form");
    // if (!data) {
    // create.addEventListener("click", (evt) => {
    //     evt.preventDefault();
    formContainer.classList.toggle("active"); // Ajoute/retire la classe active
    // Alterne l'état visible/masqué
    // console.log("Formulaire état actif ?", formContainer.classList.contains("hidden"));
    // });
    // create.append(id, title, year, genre, country, dFirstName, dLastName, aFirstName, aLastName, aBirthDate, summary, submit);
    // } else {
    //     hydrateFilm(data);
    //
    //     // modify.append(id, title, year, genre, country, dFirstName, dLastName, aFirstName, aLastName, aBirthDate, summary, submit);
    // }


}

// function modifyFilm(id) {
//     fetch(`${url}/api/films?id=${id}`).then(response => {
//         return response.json()
//     }).then(data => {
//         console.log("data", data)
//         createFilm(id);
//     }).catch(e => {
//         console.log("Erreur")
//     })
// }

function afficherGenres(data) {
    document.getElementById("genre2").innerHTML = "";
    data.forEach(genre => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.className = "dropdown-item";
        a.innerHTML = genre;
        a.addEventListener("click", (event) => {
            event.preventDefault();
            getFilms(event.target.innerHTML)
        })
        li.appendChild(a);
        document.getElementById("genre2").appendChild(li);
    });
}

function getFilms(genre) {
    document.getElementById("films").innerHTML = "";
    fetch(`${url}/api/films/filtre/${genre}`).then(response => {
        return response.json()
    }).then(data => {
        console.log("data", data)
        afficher(data)
        afficherTitreGenre(genre)
    }).catch(e => {
        console.log("Erreur")
    })
}

function getGenres() {
    fetch(`${url}/api/genres`).then(response => {
        return response.json()
    }).then(data => {
        afficherGenres(data)
    }).catch(e => {
        console.log("Erreur", e);
    })
}

function getFilm(id) {
    fetch(`${url}/api/films/${id}`).then(response => {
        return response.json()
    }).then(data => {
        console.log("data", data)
        afficherFilm(data)
    }).catch(e => {
        console.log("Erreur")
    })
}
// inputBirthDate.pattern = regexBirthDate;
// inputBirthDate.title = "Format : AAAA";
// inputBirthDate.required = true;
// inputBirthDate.placeholder = "AAAA";
// inputBirthDate.className = "form-control";
// inputBirthDate.id = "birth_date";
// inputBirthDate.name = "birth_date";
// inputBirthDate.style = `margin-left: 10px;`;

function hydrateFilm(id) {
    fetch(`${url}/api/films/${id}`).then(response => {
        return response.json()
    }).then(data => {
        console.log("data", data)
        let formContainer = document.getElementById("formular");
        formContainer.classList.toggle("active"); // Ajoute/retire la classe active
        // Alterne l'état visible/masqué
        console.log("Formulaire état actif ?", formContainer.classList.contains("hidden"));

        let id = document.querySelector("#id");
        let title = document.querySelector("#titre");
        let year = document.querySelector("#year");
        let genre = document.querySelector("#genres");
        let country = document.querySelector("#country");
        let dFirstName = document.querySelector("#d-first_name");
        let dLastName = document.querySelector("#d-last_name");
        const regexBirthDate = /^\d{4}$/;
        let div = document.querySelector("#actors");
        let label = document.querySelector("#actor");
        let ul = document.createElement('ul');
        ul.className = "list-group";
        data.actors.forEach(actors => {
            console.log(actors);
            let li = document.createElement("li");
            li.style = `list-style-type: none;`;
            li.className = "mb-2 d-flex justify-content-between";
            let inputFirstName = document.createElement("input");
            inputFirstName.type = "text";
            inputFirstName.value = actors.first_name;
            inputFirstName.className = "form-control ms-2";
            let inputLastName = document.createElement("input");
            inputLastName.type = "text";
            inputLastName.value = actors.last_name;
            inputLastName.className = "form-control ms-2";
            let inputBirthDate = document.createElement("input");
            inputBirthDate.type = "text";
            inputBirthDate.value = actors.birth_date;
            inputBirthDate.className = "form-control ms-2";
            inputBirthDate.pattern = regexBirthDate;
            li.append(inputFirstName, inputLastName, inputBirthDate);
            ul.append(li);
            label.append(ul);
            div.append(label);
        })
        // label.append(actors);

        // let aFirstName = document.querySelector("#a-first_name");
        // let aLastName = document.querySelector("#a-last_name");
        // let aBirthDate = document.querySelector("#a-birth_date");
        let summary = document.querySelector("#summary");
    let submit = document.querySelector("#submit");

        id.value = data._id;
        title.value = data.title;
        year.value = data.year;
        genre.value = data.genre;
        country.value = data.country;
        dFirstName.value = data.director.first_name;
        dLastName.value = data.director.last_name;
        // aFirstName.value = data.actors.first_name;
        // aLastName.value = data.actors.last_name;
        // aBirthDate.value = data.actors.birth_date;
        summary.value = data.summary;
        submit.value = "Modifier";


        // });
    }).catch(e => {
        console.log("Erreur")
    })
}