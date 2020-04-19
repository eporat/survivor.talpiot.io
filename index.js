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

const database = firebase.firestore();
const usersRef = database.collection("users");

async function getData() {
    const snapshot = await firebase.firestore().collection('users').get()
    return snapshot.docs.map(doc => doc.data());
}

async function login(){
    const name = document.getElementById("name").value;

    const doc = await usersRef.doc(name).get();
    if (doc.data()) {
        userData = doc.data();
        localStorage.setItem('userData', JSON.stringify(userData));
        document.location.href = "user.html"
    }
    else {
        alert("משתמש לא קיים")
        // const clan = choose();
        // const userData = {
        //     clan: clan,
        //     immunity: false,
        //     numberOfVotes: 1,
        //     unit: chooseUnit(clan),
        //     voted: false,
        //     name: name
        // }
        // localStorage.setItem('userData', JSON.stringify(userData));
        // await usersRef.doc(name).set(userData)

    }
}

function choose() {
    const r = Math.random();
    if (r < 0.4) {
        return "a"
    } else if (r < 0.8) {
        return "b"
    }
    return "c";
}


function chooseUnit(clan) {
    const r = Math.random();
    console.log(r);
    if (clan == "c"){
        return 1;
    }
    if (r < 0.5) {
        return 1;
    } else {
        return 2;
    }
}