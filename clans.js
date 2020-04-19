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
    const snapshot = await firebase.firestore().collection('users').get()
    return snapshot.docs.map(doc => doc.data());
}

async function createTable(){
    const data = await getData();

    const dict = {'a': [], 'b': [], 'c': []};

    for (let userData of data){
        dict[userData.clan].push(userData);
    }

    for (let clan of Object.keys(dict)) {
        const table = document.getElementById("clans-"+clan);
        for (let userData of dict[clan]){
            var txt = document.createTextNode(userData.name);
            var c = document.createElement("p");
            c.innerHTML = "יחידה " + userData.unit;
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.style.fontSize = "3vh";
            td.appendChild(txt);
            td.appendChild(c)
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }
}
createTable();