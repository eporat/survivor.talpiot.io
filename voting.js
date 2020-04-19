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
const votesRef = database.collection("votes");

const user = JSON.parse(localStorage.getItem("userData"));

const clan = user.clan;

console.log(user);

function addRadioButton(data) {
    var text = data.name;
    var div = document.getElementById("clan-members");

    var wrapper = document.createElement("div");
    wrapper.id = "wrapper"
    var label = document.createElement("label");
    var element = document.createElement("input");
    //Assign different attributes to the element.
    element.setAttribute("type", "radio");
    element.setAttribute("value", data.name);
    element.style.marginLeft = "10px";
    element.setAttribute("name", "options");
    label.innerHTML += text;
    label.className = "btn btn-primary";
    label.appendChild(element);  
    wrapper.appendChild(label)
    div.appendChild(wrapper);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

usersRef
.where('clan', '==', clan)
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name != user.name && !data.immunity){
            addRadioButton(data);
        }
    })
})


async function vote(){
    const voted = document.querySelector('input:checked').value;
    let numberOfVotes = 0;
    let voters = [];
    let userDoc = await usersRef.doc(user.name).get()
    let userVoted = userDoc.data().voted;

    if (userVoted){
        alert("הצבעת כבר");
        return;
    }
    const doc = await votesRef.doc(voted).get()
    const data = doc.data();
    if (data){
        numberOfVotes = 0 || data.votes;
        console.log(doc);
        console.log(numberOfVotes);
        voters = data.voters || [];
    }
    
    if (!voters.includes(user.name)){
        voters.push(user.name);
        votesRef
        .doc(voted)
        .set({"votes": numberOfVotes + user.numberOfVotes, "voters": voters})
    }

    usersRef.doc(user.name).update({"voted": true});
    alert("הצבעת ל" + voted);

}