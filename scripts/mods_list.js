// Funkcja wczytująca listę modów z folderu mods/list
async function loadMods() {
const listContainer = document.getElementById("mods-list");
listContainer.innerHTML = '';

try {
    const response = await fetch('mods/list/');
    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // Wyciągamy linki
    const links = Array.from(doc.querySelectorAll('a'))
        .map(a => a.getAttribute('href'))
        .filter(href => href && href !== '../') // pomijamy folder nadrzędny
        .map(href => {
            // Pobieramy tylko nazwę pliku
            return href.split('/').filter(part => part && part !== 'mods' && part !== 'list').pop();
        })
        .filter(name => name && name.endsWith('.jar')); // <-- tylko pliki .jar

    if (links.length === 0) {
        listContainer.innerHTML = '<li>Brak modów w folderze.</li>';
    } else {
        links.forEach(name => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = 'mods/list/' + name;
            a.textContent = name;
            a.className = 'author-link'; // styl taki jak linki w stopce
            a.setAttribute('download', ''); // kliknięcie pobiera plik
            li.appendChild(a);
            listContainer.appendChild(li);
        });
    }
} catch (error) {
    listContainer.innerHTML = '<li>Nie udało się wczytać modów.</li>';
    console.error(error);
}
}

loadMods();