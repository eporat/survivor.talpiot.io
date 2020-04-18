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
    let data = await getData('missions');
    const myUser = JSON.parse(localStorage.getItem("userData"));
    let teams = {};
    let myMission;
    let units = [];
    for (mission of data){
        if (mission.units && mission.units.includes(myUser.clan+myUser.unit)){
            document.getElementById("my-th").style.backgroundColor = colors[myUser.clan];
            units = mission.units.slice()
            units.splice(units.indexOf(myUser.clan+myUser.unit), 1);
            console.log(units);
            for (let key of mission.units){
                teams[key] = [];
            }
            if (units.length == 1){
                let otherClan = units[0];
                document.getElementById("other-th-0").style.backgroundColor =  colors[otherClan[0]];
                document.getElementById("other-clan-1").style.display = "none"
            }
            else {
                let clan1 = units[0];
                let clan2 = units[1];
                console.log(clan1[0])

                document.getElementById("other-th-0").style.backgroundColor =  colors[clan1[0]];
                document.getElementById("other-th-1").style.backgroundColor =  colors[clan2[0]];

            }
            myMission = mission;
        }
    }

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

    for (let i = 0; i < units.length; i++){
        const opponentTable = document.getElementById("other-clan-"+i);
        for (let name of teams[units[i]]){
            var txt = document.createTextNode(name);
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.appendChild(txt);
            tr.appendChild(td);
            opponentTable.appendChild(tr);
        }
    }

    var missionHeader = document.getElementById("mission");
    console.log(missionHeader)
    missionHeader.innerText = myMission.mission;
}

createTable();