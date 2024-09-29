
const apiUrl = 'https://ghibliapi.vercel.app/films/'
const display = document.querySelector('#display-data');
const input = document.querySelector("#input");

const colherDados = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data
}

const mostrarResultado = async () => {
    let query = input.value;

    const payload = await colherDados();

    let dataDisplay = payload.filter((eventData) => {
        if (query === "") {
            return eventData
        } 
        else if (eventData.title.toLowerCase().includes(query.toLowerCase())) {
            return eventData
        }
    }).map((object) => {
        const { title, original_title_romanised, director, release_date} = object;

        return `
        <div class="container">
            <p>Título: ${title}</p>
            <p>Título Original: ${original_title_romanised}</p>
            <p>Diretor: ${director}</p>
            <p>Data de Lançamento: ${release_date}</p>
        </div>
        <hr>
        `

    }).join("");

    display.innerHTML = dataDisplay;
}

mostrarResultado();

input.addEventListener("input", () => {
    mostrarResultado();
})















