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


async function getData() {
    const snapshot = await firebase.firestore().collection('missions').get()
    return snapshot.docs.map(doc => doc.data());
}

async function createTable(){
    const data = await getData();
    const user = JSON.parse(localStorage.getItem("userData"));
    let myTeam = [];
    let opponentTeam = [];
    let myMission;
    console.log(user);
    console.log(data);
    for (mission of data){
        if (mission.a.includes(user.name)){
            myTeam = mission.a;
            opponentTeam = mission.b;
            myMission = mission;
            document.getElementById("my-th").style.backgroundColor =  "darkblue";
            document.getElementById("my-th").style.color =  "white";
            document.getElementById("other-th").style.backgroundColor =  "darkred";
            document.getElementById("other-th").style.color = "white"
        } 
        else if (mission.b.includes(user.name)){
            myTeam = mission.b;
            opponentTeam = mission.a;
            myMission = mission 
            document.getElementById("my-th").style.backgroundColor =  "darkred";
            document.getElementById("my-th").style.color =  "white";
            document.getElementById("other-th").style.backgroundColor =  "darkblue";
            document.getElementById("other-th").style.color = "white"

        }
    }

    const myTable = document.getElementById("my-clan");
    for (let name of myTeam){
        var txt = document.createTextNode(name);
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(txt);
        tr.appendChild(td);
        myTable.appendChild(tr);
    }

    const opponentTable = document.getElementById("other-clan");
    for (let name of opponentTeam){
        var txt = document.createTextNode(name);
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(txt);
        tr.appendChild(td);
        opponentTable.appendChild(tr);
    }

    var missionHeader = document.getElementById("mission");
    console.log(missionHeader)
    missionHeader.innerText = myMission.mission;
}
createTable();