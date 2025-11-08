function padZero(num) {
    return num < 10 ? '0' + num : num;
}

async function updateServerStatus() {
    const serverStatus = document.getElementById("server-status");
    const serverIcon = document.getElementById("server-icon");
    const lastUpdate = document.getElementById("last-update");

    const serverIp = "IP";
    const serverPort = 25565;

    try {
        const response = await fetch(`https://mcapi.us/server/status?ip=${serverIp}&port=${serverPort}`);
        const data = await response.json();

        if (data.online) {
            serverStatus.textContent = "ONLINE";
            serverStatus.style.color = "#53b800"; // zielony
            serverIcon.innerHTML = '<i class="fa-solid fa-satellite-dish" style="color: #53b800;"></i>';
        } else {
            serverStatus.textContent = "OFFLINE";
            serverStatus.style.color = "#eb0000"; // czerwony
            serverIcon.innerHTML = '<i class="fa-solid fa-satellite-dish" style="color: #eb0000;"></i>';
        }
    } catch (error) {
        console.error("Błąd podczas sprawdzania statusu serwera:", error);
        serverStatus.textContent = "ERROR";
        serverStatus.style.color = "#ffa600ff"; // pomarańczowy
        serverIcon.innerHTML = '<i class="fa-solid fa-satellite-dish" style="color: #ffa600ff;"></i>';
    }

    const now = new Date();
    lastUpdate.textContent = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
}

function updateDateTime() {
    const hourEl = document.getElementById("full-date");
    const dayName = document.getElementById("day-name");
    const now = new Date();

    const days = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];

    hourEl.textContent = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
    dayName.textContent = `${days[now.getDay()]} ${padZero(now.getDate())}.${padZero(now.getMonth()+1)}.${now.getFullYear()}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);
updateServerStatus();
