async function loadPosts() {
    const container = document.getElementById("posts-container");

    try {
        const response = await fetch("scripts/get_posts.php");
        const posts = await response.json();

        container.innerHTML = "";

        if (posts.length === 0) {
            container.innerHTML = "<p>Brak postów do wyświetlenia.</p>";
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post-card");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <small>${post.date} | ${post.author}</small>
                <p>${post.content}</p>
                <hr>
            `;
            container.appendChild(postElement);
        });

    } catch (error) {
        console.error("Błąd przy wczytywaniu postów:", error);
        container.innerHTML = "<p>Nie udało się załadować postów.</p>";
    }
}

// Załaduj posty po otwarciu strony
loadPosts();