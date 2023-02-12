const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const userID = urlParams.get("userID");

const xhttp = new XMLHttpRequest();
let endPointRoot = "http://localhost:8888/API/users/singleUser/?userID=";

xhttp.open("GET", endPointRoot + userID, true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let jsonResult = JSON.parse(this.responseText);
    console.log(jsonResult);
    if (jsonResult[0]["userDescription"] !== null) {
      document.getElementById("userDescription").innerHTML =
        jsonResult[0]["userDescription"];
      document.getElementById("artistName").innerHTML =
        jsonResult[0]["userFirstName"] +
        (jsonResult[0]["userLastName"] ?
          ` ${jsonResult[0]["userLastName"]}` :
          "");
    }
  }
};

let itemEndPoint = "http://localhost:8888/API/items/byUser/?userID=";
const xhttp0 = new XMLHttpRequest();
xhttp0.open("GET", itemEndPoint + userID, true);
xhttp0.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp0.send();
xhttp0.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let itemResult = JSON.parse(this.responseText);

    let length = itemResult.length;
    for (let i = 0; i < length; i++) {
      if (itemResult[i]["itemImagePath"] !== null) {
        let newIMG = document.createElement("img");
        newIMG.src = `.${itemResult[i]["itemImagePath"]}`;
        console.log(itemResult[i]["itemImagePath"]);
        let newDiv = document.createElement("div");
        newDiv.className = "swiper-slide";
        newDiv.appendChild(newIMG);
        document.getElementById("imageContainer").appendChild(newDiv);
      }
    }
  }
};