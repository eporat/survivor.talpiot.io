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
console.log(localStorage.getItem("userData"))
const user = JSON.parse(localStorage.getItem("userData"));

const clan = user.clan;

console.log(user);

function addRadioButton(text) {
    var div = document.getElementById("clan-members");
    var button = document.createElement("button");
    var label = document.createElement("label");
    var element = document.createElement("input");
    //Assign different attributes to the element.
    element.setAttribute("type", "radio");
    element.setAttribute("value", "You have chosen " + text);
    element.setAttribute("name", "optradio");
    element.setAttribute("class", "radio");
    label.className = "d-block";
    label.innerHTML += text;
    label.appendChild(element);  
    button.appendChild(label);  
    div.appendChild(button);
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
        if (data.email != user.email){
            addRadioButton(capitalizeFirstLetter(data.firstName) + " " + capitalizeFirstLetter(data.lastName));
        }
    })
})


