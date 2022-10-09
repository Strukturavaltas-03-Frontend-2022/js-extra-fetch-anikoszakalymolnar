const teamsURL = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json';
const playersURL = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json';


const teamsFetch = fetch(teamsURL).then((res) => res.json());
const playersFetch = fetch(playersURL).then((res) => res.json());

const addPropertyRow = (tbody, property, value) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    const td = document.createElement('td');
    tr.appendChild(td);
    td.textContent = property;
    const td2 = document.createElement('td');
    tr.appendChild(td2);
    td2.textContent = value;
}


const addPlayersRow = (tbody, player) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    const td = document.createElement('td');
    tr.appendChild(td);
    td.textContent = player.name;
    const td2 = document.createElement('td');
    tr.appendChild(td2);
    td2.textContent = player.position;
    const td3 = document.createElement('td');
    tr.appendChild(td3);
    td3.textContent = player.club;
}

// Jelenítsd meg a HTML-oldalon a magyar csapat alapvető adatait (legalább hármat).
const showTeam = (team) => {

    const tbody = document.querySelector('.team__body');
    addPropertyRow(tbody, 'Coach', team.Coach);
    addPropertyRow(tbody, 'FIFA ranking', team['FIFA ranking']);
    addPropertyRow(tbody, 'Group', team.Group);
    addPropertyRow(tbody, 'Next match', team['next match']);
};

// Jelenítsd meg a HTML-oldalon a kapott adatok alapján a magyar csapat játékosait,
// pozíciójukat és klubjukat soronként rendezve. Példa: Dibusz Dénes, Goalkeeper, Ferencváros
const showPlayers = (players) => {
    const tbody = document.querySelector('.players__body');
    players.forEach(player => {
        addPlayersRow(tbody, player);
    });
};



const init = async () => {
    let teams;
    let players;
    // adatok lekérdezése
    await Promise
        .all([teamsFetch, playersFetch])
        .then(results => {
            [teams, players] = results;
            teams = teams.sheets.Teams;
            players = players.sheets.Players;
        })
        .catch(error => {
            console.error(error);
        });

    // magyar csapat megkeresése
    const hunTeam = teams.find(team => team.Team == 'Hungary');
    // adatok megjelenítése
    showTeam(hunTeam);
    showPlayers(players);
};

init();