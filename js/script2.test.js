// Simulação do DOM
document.body.innerHTML = `
    <input id="input" name="name" type="text" placeholder="Digite o título em inglês" autofocus></input>
    <div id="display-data"></div>
`;

// Declare as funções no escopo global
const apiUrl = 'https://ghibliapi.vercel.app/films/';
const display = document.querySelector('#display-data');
const input = document.querySelector("#input");

function colherDados() {
    return fetch(apiUrl)
        .then(res => res.json());
}

function mostrarResultado() {
    let query = input.value;

    return colherDados().then(payload => {
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

describe('Testes do Projeto Studio Ghibli', () => {
    const mockData = [
        {
            title: 'Castle in the Sky',
            original_title_romanised: 'Tenkū no shiro Rapyuta',
            director: 'Hayao Miyazaki',
            release_date: '1986',
        }
    ];

    beforeEach(() => {
        // Mock do fetch diretamente
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restaura o mock após cada teste
    });

    test('A função colherDados deve retornar dados da API', async () => {
        const data = await colherDados();
        expect(data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledTimes(1); // Verifica se o fetch foi chamado uma vez
        expect(fetch).toHaveBeenCalledWith(apiUrl); // Verifica se o fetch foi chamado com a URL correta
    });

    test('A função mostrarResultado deve exibir corretamente os dados no HTML', async () => {
        input.value = 'Castle in the Sky'; // Simula um valor de entrada
        await mostrarResultado();

        const display = document.querySelector('#display-data').innerHTML;
        const estruturaEsperada = `
            <div class="container">
                <p>Título: Castle in the Sky</p>
                <p>Título Original: Tenkū no shiro Rapyuta</p>
                <p>Diretor: Hayao Miyazaki</p>
                <p>Data de Lançamento: 1986</p>
            </div>
            <hr>
        `;

        // Remove espaços em branco desnecessários para comparação
        const normalizeHTML = (html) => html.replace(/\s+/g, ' ').trim();

        expect(normalizeHTML(display)).toBe(normalizeHTML(estruturaEsperada));
    });
});
