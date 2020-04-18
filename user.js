const user = JSON.parse(localStorage.getItem("userData"));
const clans = {"a": "א", "b": "ב", "c": "ג"};
const colors = {"a": "blue", "b": "red", "c": "green"}
document.getElementById("name").innerHTML = user.name;
document.getElementById("clan").innerHTML = "שבט: " + `<span id="clan-color">${clans[user.clan]}<\span>`;
document.getElementById("clan-color").style.color = colors[user.clan];
document.getElementById("unit").innerHTML = "צוות: " + user.unit;