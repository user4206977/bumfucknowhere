const ADMINS = {
    "Szczerbatek": "qwertyzxc",
    "MasnyWojtuś": "7355608"
};

let currentUser = null;

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("login-message");

    if (ADMINS[username] && ADMINS[username] === password) {
        currentUser = username;
        document.getElementById("login-form").style.display = "none";
        document.getElementById("post-form").style.display = "block";
        document.getElementById("manage-posts").style.display = "block";
        loadPosts();
    } else {
        message.textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
}

async function addPost() {
    const title = document.getElementById("post-title").value.trim();
    const content = document.getElementById("post-content").value.trim();
    const message = document.getElementById("post-message");

    if (!title || !content) {
        message.style.color = "red";
        message.textContent = "Uzupełnij wszystkie pola.";
        return;
    }

    const postData = {
        title: title,
        content: content,
        author: currentUser
    };

    try {
        const response = await fetch("scripts/save_post.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        });

        const result = await response.json();

        if (result.success) {
            message.style.color = "lightgreen";
            message.textContent = "Post dodany pomyślnie!";
            document.getElementById("post-title").value = "";
            document.getElementById("post-content").value = "";
            loadPosts();
        } else {
            message.style.color = "red";
            message.textContent = "Błąd podczas dodawania posta.";
        }

    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.textContent = "Błąd połączenia z serwerem.";
    }
}

async function loadPosts() {
    const container = document.getElementById("posts-list");
    container.innerHTML = "Ładowanie...";

    try {
        const response = await fetch("scripts/get_posts.php");
        const posts = await response.json();

        if (posts.length === 0) {
            container.innerHTML = "<p>Brak postów do wyświetlenia.</p>";
            return;
        }

        container.innerHTML = "";
        posts.forEach(post => {
            const div = document.createElement("div");
            div.classList.add("post-item");
            div.innerHTML = `
                <p><strong>${post.title}</strong><br>
                <small>${post.date} | ${post.author}</small></p>
                <button class="btn" style="background:#b80000" onclick="deletePost('${post.id}')">Usuń</button>
                <hr style="opacity:0.1;">
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        container.innerHTML = "Błąd podczas ładowania postów.";
    }
}

async function deletePost(id) {
    if (!confirm("Na pewno chcesz usunąć ten post?")) return;

    try {
        const response = await fetch("scripts/delete_post.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        const result = await response.json();
        if (result.success) {
            loadPosts();
        } else {
            alert("Nie udało się usunąć posta.");
        }
    } catch (error) {
        console.error(error);
        alert("Błąd połączenia z serwerem.");
    }
}