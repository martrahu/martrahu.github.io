const firebaseConfig = {
  apiKey: "AIzaSyA9Joq7tT5redc7lD7SEqH18Iq1Qcr4gQE",
  authDomain: "test-b19c8.firebaseapp.com",
  projectId: "test-b19c8",
  storageBucket: "test-b19c8.appspot.com",
  messagingSenderId: "684635456823",
  appId: "1:684635456823:web:8296fc23ef0d93560ac6b2",
  databaseURL: "https://test-b19c8-default-rtdb.firebaseio.com/"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("test");

readMessages();

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
 
  e.preventDefault();

  var name = getElementVal("name");
  var teksti = getElementVal("teksti");

    saveMessages(name, teksti);
  
    document.getElementById('alert').innerHTML = "<b>Ajanvaraus lähetetty tietokantaan</b>"
    setTimeout(() => {
      document.getElementById('alert').innerHTML = ""
    }, 3000);
    document.getElementById("contactForm").reset();

     readMessages();
}

function saveMessages(name, teksti) {
  const d = new Date();
  let time = d.getTime();
  var data = {
    timestamp: time,
    name: name,
    teksti: teksti,
  }
  contactFormDB.push(data)

  /*
  var newContactForm = contactFormDB.push();
  const d = new Date();
  let time = d.getTime();
  newContactForm.set({
    timestamp: time,
    name: name,
    teksti: teksti,
  });*/
};


function getElementVal(id) {
  return document.getElementById(id).value;
};



function readMessages() {
  document.getElementById("aikaisemmat").innerHTML = ""
  contactFormDB.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      console.log(data);
      document.getElementById("aikaisemmat").innerHTML += lisaAikaisempi(data)
    });


  })
}

function lisaAikaisempi(data) {
  const nimi=data.name
  const aika=new Date(data.timestamp).toUTCString()
  const komm=data.teksti
  return "<p>Nimimerkki: " + nimi + "</p><p>Aika:" + aika + "</p><blockquote>" + komm + "</blockquote><hr>"
}


