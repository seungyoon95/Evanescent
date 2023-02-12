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
    // let signIn = document.getElementById("signInButton");
    // let signUp = document.getElementById("signUpButton");
    // signIn.remove();
    // signUp.remove();
    let navList = document.getElementById("navList");

    let li_profile = document.createElement("li");
    let a_profile = document.createElement("a");
    a_profile.innerHTML = "Profile";
    a_profile.id = "button_profile";
    a_profile.href = "profile.html";
    li_profile.appendChild(a_profile);
    navList.appendChild(li_profile);

    let li_signOut = document.createElement("li");
    let a_signOut = document.createElement("a");
    a_signOut.innerHTML = "Sign Out";
    a_signOut.id = "button_signOut";
    a_signOut.href = "index.html";
    a_signOut.addEventListener("click", function () {
      signOut(auth).then(() => {
        console.log("Signing Out");
        window.location.href = "index.html";
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    });
    li_signOut.appendChild(a_signOut);
    navList.appendChild(li_signOut);


    // console.log(userID);
    // add user to database
    const xhttp = new XMLHttpRequest();
    // Change this for hosted server app
    const endPointRoot = "http://localhost:8888/API/users/?userID=";

    xhttp.open("GET", endPointRoot + userID, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // console.log(`User with ID:${userID} retrieved`);
        let result = this.responseText.split("\n");
        if (result[0] !== "null" && result[0] !== undefined) {
          document.getElementById("userName").innerHTML = result[0].replaceAll(
            '"',
            ""
          );
        } else {
          document.getElementById("userName").innerHTML = "";
        }

        if (result[1] !== "null" && result[1] !== undefined) {
          document.getElementById("email").value = result[1].replaceAll(
            '"',
            ""
          );
        } else {
          document.getElementById("email").value = "";
        }

        if (result[2] !== "null" && result[2] !== undefined) {
          document.getElementById("phoneNumber").value = result[2].replaceAll(
            '"',
            ""
          );
        } else {
          document.getElementById("phoneNumber").value = "";
        }

        if (result[3] !== "null" && result[3] !== undefined) {
          document.getElementById("streetAddress").value = result[3].replaceAll(
            '"',
            ""
          );
        } else {
          document.getElementById("streetAddress").value = "";
        }

        if (result[4] !== "null" && result[4] !== undefined) {
          document.getElementById("postalCode").value = result[4].replaceAll(
            '"',
            ""
          );
        } else {
          document.getElementById("postalCode").value = "";
        }

        if (result[5] !== "null" && result[5] !== undefined) {
          let path = result[5].replaceAll('"', '');
          console.log("Image Path: ", path);
          let image = document.createElement("img");
          image.src = path;
          document.getElementById("imageDiv").prepend(image);
        } else {
          console.log("NO IMAGE!");
        }

        if (result[6] !== "null" && result[6] !== undefined) {
          document.getElementById("description").innerHTML =
            result[6].replaceAll('"', "");
        } else {
          document.getElementById("description").innerHTML = "";
        }
      }
    };
  } else {
    // User is signed out
    window.location.href = "signIn.html";
  }
});

document.getElementById("submitImage").addEventListener("click", function () {
  const ID = userID;

  let image = document.getElementById("profileImageInput").files[0];

  if (image != undefined) {
    console.log(image);

    let params = `?userID=${ID}`;

    const xhttp = new XMLHttpRequest();
    const endPointRoot = "http://localhost:8888/API/users/userImage/";
    xhttp.open("POST", endPointRoot + params, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(image);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("profileImage").innerHTML = this.responseText;
        console.log(`${image.name} Uploaded!`);
      }
    };
    alert(`${image.name} uploaded!`);
    // location.reload();
  } else {
    alert("Image not added!");
  }
});

document.getElementById("button_update").addEventListener("click", function () {
  const ID = userID;
  const email = document.getElementById("email").value;
  const streetAddress = document.getElementById("streetAddress").value;
  const postalCode = document.getElementById("postalCode").value;
  const description = document.getElementById("description").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  const xhttp = new XMLHttpRequest();
  const endPointRoot = "http://localhost:8888/API/users/update/";

  let params = `?userID=${ID}
        &userEmail=${email}
        &userAddress=${streetAddress}
        &userPostalCode=${postalCode}
        &userDescription=${description}
        &userPhone=${phoneNumber}`;

  xhttp.open("POST", endPointRoot, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("updateText").innerHTML = this.responseText;
      console.log("user updated!");
    }
  };
  alert("Profile Updated!");
  location.reload();
});

//Onclick function for sign out button
document.getElementById("button_signOut").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Signing out");
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});