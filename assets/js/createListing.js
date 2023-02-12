// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let userID;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    userID = user.uid;
    document
      .getElementById("button_update")
      .addEventListener("click", function () {
        let itemName = document.getElementById("itemName").value;
        let itemPrice = document.getElementById("itemPrice").value;
        let itemDescription = document.getElementById("description").value;
        let itemQuantity = document.getElementById("itemQuantity").value;
        let saleStart = document.getElementById("saleStart").value;
        let saleEnd = document.getElementById("saleEnd").value;
        let image = document.getElementById("itemImage").files[0];

        const xhttp = new XMLHttpRequest();
        let endPointRoot = "http://localhost:8888/API/items/";

        let params = `?userID=${userID}&itemName=${itemName}&itemPrice=${itemPrice}&itemDescription=${itemDescription}&itemQuantity=${itemQuantity}&startTime=${saleStart}&endTime=${saleEnd}`;
        xhttp.open("POST", endPointRoot + params, true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhttp.send(image);
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log("Created new listing!");
            alert("Created new listing!");
            window.location.href = "index.html";  
          }
        };
      });
    // console.log(userID);
  } else {
    // User is not signed in
    window.location.href = "signIn.html";
  }
});