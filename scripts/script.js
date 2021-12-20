const API_URL = "https://rickandmortyapi.com/api/character/";
const CHARACTER_URL = "https://rickandmortyapi.com/api/character/?name="

const main = document.getElementById("main");
const form = document.getElementById('form');
const search = document.getElementById('search');
const h2 = document.querySelector("h2");

// Consulta de API con la url de la variable
const getCharacter = (character) => {
    const peticion = fetch(character);
    peticion
        .then((resp) => resp.json())
        .then((data) => showCharacter(data.results))
        .catch((error) =>
            swal.fire({
                title: "Hubo un error con el servidor",
                text: "Intente de nuevo mas tarde",
                icon: "warning",
                confirmButtonText: "Aceptar",
            })

        );
}

getCharacter(API_URL);

// Impresion de resultados en pantalla con un for.each
const showCharacter = (characters) => {
    if (characters.length == 0) {
        swal.fire({
            title: "El personaje no existe",
            text: "Intente de nuevo con otro nombre",
            icon: "warning",
            confirmButtonText: "Aceptar",
        });
    }
    else {
        main.innerHTML = ``
        characters.forEach(element => {
            const { id, name, status, species, gender, image } = element;
            const divCharacter = document.createElement('div');
            divCharacter.innerHTML = `
        <div class="target">
        <div>
          <img src="${image}" />
        </div>
        <div id="${id}">
          <h4>${name}</h4>
        </div>
        <div class="status">
          <h5>Estado</h5>
          <span>${status}</span>
        </div>
        <div class="status2">
          <h5>Genero</h5>
          <span>${gender} - ${species}</span>
        </div>
      </div>
        `
            main.appendChild(divCharacter);
        });

    }
}

// Evento Submit para buscar
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const term = search.value;
    if (term && term !== "") {
        getCharacter(CHARACTER_URL + term);
        search.value = ""
    }
    else {
        window.location.reload();
    }
})

h2.addEventListener("click", () => {
    getCharacter(API_URL);
});
