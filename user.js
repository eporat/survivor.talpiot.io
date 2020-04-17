const user = JSON.parse(localStorage.getItem("userData"));

document.getElementById("name").innerHTML = user.name;