function getItems() {
  const xhttp = new XMLHttpRequest();
  let endPointRoot = "http://localhost:8888/API/items/searchAll/";
  let searchValue = document.getElementById("searchText").value;
  let params = `?searchValue=${searchValue}`;

  xhttp.open("GET", endPointRoot + params, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(JSON.parse(this.responseText));
      let foundItems = JSON.parse(this.responseText);
      let outputContainer = document.getElementById("results");
      let output = "";
      let length = foundItems.length; //replace with number of results
      console.log(length);
      outputContainer.innerHTML = "";

      for (let i = 0; i < length; i++) {
        output = "";
        output += "<div class='col-lg-4 col-md-6'>";

        // outputContainer.innerHTML += "<a href='itemDetail.html?item" + resultList[i].itemID + "&artist="+ resultList[i].artistID + "'><img src='" + resultList[i].mainImage + "' class='img-fluid' alt=''></img></a>";
        output +=
          `<a href='itemDetail.html?itemID=${foundItems[i]["itemID"]}'><img src='../itemImages/${foundItems[i]["itemName"]}.png'` +
          (750 + i) +
          ".png' class='img-fluid' alt='No Image Found' style='height:200px'></img></a>";

        output += "<div>";

        // outputContainer.innerHTML += "<h4>" + resultList[i].name + "</h4>";
        output += "<h4>" + foundItems[i]["itemName"] + "</h4>";

        // outputContainer.innerHTML += "<h4>" + resultList[i].blurb + "</h4>";
        output += "<p>" + foundItems[i]["itemDescription"] + "</p>";

        output += `<a href='itemDetail.html?itemID=${foundItems[i]["itemID"]}'` +
          i +
          "' class='details-link' title='Item Details'><i class='bx bx-link'>Item Detail</i></a><br />";

        // outputContainer.innerHTML += "<a href='" + resultList[i].mainImage + "' data-gallery='portfolioGallery' class='portfolio-lightbox' preview-link title='Result 1'><i class='bx bx-plus'></i></a>"
        // output += "<a href='assets/img/" + (750 + i) +".png' data-gallery='portfolioGallery' class='portfolio-lightbox' preview-link title='Result " + i + "'><i class='bx bx-plus'></i></a>"

        // outputContainer.innerHTML += "<a href='portfolio-details.html?artist=" + resultList[i].artistID + "' class='details-link' title='Visit Artist Page'><i class='bx bx-link'></i></a>"
        output +=
          `<a href='portfolio-details.html?userID=${foundItems[i]["userID"]}'` +
          i +
          "' class='details-link' title='Visit Artist Page'><i class='bx bx-link'>Artist's page</i></a>";

        output += "</div></div>";
        outputContainer.innerHTML += output;
      }
    }
  };
}

document.getElementById("searchButton").addEventListener("click", getItems);