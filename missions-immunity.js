const firebaseConfig = {
    apiKey: "AIzaSyBaCDLYSYm1MoA32DRZZ7IsSoMOgPQiv00",
    authDomain: "survivor-talpiot.firebaseapp.com",
    databaseURL: "https://survivor-talpiot.firebaseio.com",
    projectId: "survivor-talpiot",
    storageBucket: "survivor-talpiot.appspot.com",
    messagingSenderId: "1095946708691",
    appId: "1:1095946708691:web:5938505f860bc60fad9626",
    measurementId: "G-1PCRC0VX79"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const colors = {
    "a": "darkblue",
    "b": "darkred",
    "c": "darkgreen"
}

async function getData(name) {
    const snapshot = await firebase.firestore().collection(name).get()
    return snapshot.docs.map(doc => doc.data());
}

async function createTable(){
    let data = await getData('missions-immunity');
    const myUser = JSON.parse(localStorage.getItem("userData"));
    let teams = {};
    let myMission;
    let units = [];
    for (mission of data){
        if (mission.units && mission.units.includes(myUser.clan+myUser.unit)){
            document.getElementById("my-th").style.backgroundColor = colors[myUser.clan];
            document.getElementById("my-clan").style.display = "table"

            myMission = mission;
            for (unit of mission.units){
                teams[unit] = [];
            }
        }
    }
    console.log(myMission)

    data = await getData('users');

    for (user of data){
        if (myMission.units.includes(user.clan+user.unit)){
            teams[user.clan+user.unit].push(user.name);
        }
    }

    console.log(teams);
    console.log(units);

    const myTable = document.getElementById("my-clan");
    for (let name of teams[myUser.clan + myUser.unit]){
        var txt = document.createTextNode(name);
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(txt);
        tr.appendChild(td);
        myTable.appendChild(tr);
    }

    var missionHeader = document.getElementById("mission");
    console.log(missionHeader)
    missionHeader.innerText = myMission.mission;
}

createTable();