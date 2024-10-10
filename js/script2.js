const apiUrl = 'https://ghibliapi.vercel.app/films/';
const display = document.querySelector('#display-data');
const input = document.querySelector("#input");

function colherDados() {
    return fetch(apiUrl)
        .then(res => res.json());
}

function mostrarResultado() {
    let query = input.value;

    colherDados().then(payload => {
        let dataDisplay = payload.filter((eventData) => {
            if (query === "") {
                return eventData;
            } else if (eventData.title.toLowerCase().includes(query.toLowerCase())) {
                return eventData;
            }
        }).map((object) => {
            const { title, original_title_romanised, director, release_date } = object;

            return `
            <div class="container">
                <p>Título: ${title}</p>
                <p>Título Original: ${original_title_romanised}</p>
                <p>Diretor: ${director}</p>
                <p>Data de Lançamento: ${release_date}</p>
            </div>
            <hr>
            `;
        }).join("");

        display.innerHTML = dataDisplay;
    });
}

function configurarEventos() {
    input.addEventListener("input", () => {
        mostrarResultado();
    });
}

//Gerando um erro para aparecer no Lint
const x = y;  

// Chame configurarEventos para iniciar os eventos
configurarEventos();