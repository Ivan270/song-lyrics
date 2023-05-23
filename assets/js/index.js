// API utilizada: https://lyrist.vercel.app/ con proxy para manejar error CORS https://cors-anywhere.herokuapp.com/
const apiUrl =
	'https://cors-anywhere.herokuapp.com/https://lyrist.vercel.app/api';
const formCancion = document.getElementById('buscarCancion');

formCancion.addEventListener('submit', (event) => {
	event.preventDefault();
	let artista = inputArtista.value;
	let cancion = inputCancion.value;
	// Spinner para boton buscar
	btnBuscar.innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    `;
	consultarApi(apiUrl, artista, cancion);
});

formCancion.addEventListener('keypress', () => {
	limpiarVersos();
});

const consultarApi = async (url, artista, cancion) => {
	try {
		let response = await fetch(`${url}/${cancion}/${artista}`);
		let dataCancion = await response.json();
		const letra = dataCancion.lyrics;
		const versos = letra.split('\n');

		insertarVersos(versos);
	} catch (error) {
		console.log(error);
	}
};

const limpiarVersos = () => {
	lyricsContainer.innerHTML = '';
};
const insertarVersos = (versos) => {
	versos.forEach((verso) => {
		// Limpiar letra de [verso 1] y espacios en blanco
		if (!verso.startsWith('[') && verso !== '') {
			lyricsContainer.innerHTML += `
            <div
				class="container mb-3 rounded-2 p-3 bg-light verso">
                <p class="display-6">${verso}</p>
            </div>
            
            `;
		}
	});
	// Fin del spinner boton buscar
	btnBuscar.innerHTML = `
    Buscar
    `;
};
