const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const itemID = urlParams.get('itemID');
console.log(itemID);

let result = null;
let itemName = null;
let itemPrice = null;
let itemDescription = null;
let itemQuantity = null;
let startTime = null;
let endTime = null;
let imagePath = null;

function displayItemDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const itemID = urlParams.get('itemID');
    console.log(itemID);
    const xhttp = new XMLHttpRequest();
    // let endPointRoot = "https://comp4800clientside.herokuapp.com/API/items/itemDetails/?itemID=";
    let endPointRoot = "http://localhost:8888/API/items/itemDetails/?itemID=";
    
    xhttp.open("GET", endPointRoot + itemID, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            result = this.responseText.split("\n");
            console.log(result);
            console.log(result.length);
    
            itemName = result[0].replaceAll("\"", "");
            itemPrice = result[1];
            itemDescription = result[2].replaceAll("\"", "");
            itemQuantity = result[3];
            startTime = result[4].replaceAll("\"", "");
            endTime = result[5].replaceAll("\"", "");
            imagePath = result[6].replaceAll("\"", "");
    
            let currentDate = new Date().getTime();
            console.log("currentDate:", currentDate);
    
            let saleStart = new Date(`${startTime}`);
            let saleEnd = new Date(`${endTime}`);
    
            saleStart = saleStart.getTime();
            saleEnd = saleEnd.getTime();
    
            console.log("saleStart", saleStart);
            console.log("saleEnd", saleEnd);
    
            if (currentDate < saleStart || currentDate > saleEnd) {
                document.getElementById("addCartButton").disabled = true;
            } else {
                document.getElementById("addCartButton").disabled = false;
            }

            startTime = startTime.replaceAll("T", " ");
            startTime = startTime.replaceAll("Z", " ");
            startTime = startTime.replaceAll("000", "00");
            endTime = endTime.replaceAll("T", " ");
            endTime = endTime.replaceAll("Z", " ");
            endTime = endTime.replaceAll("000", "00");
    
            console.log("Name: ", itemName);
            console.log("Price: ", itemPrice);
            console.log("Description: ", itemDescription);
            console.log("Quantity: ", itemQuantity);
            console.log("StartTime: ", startTime);
            console.log("EndTime: ", endTime);
            console.log("ImagePath: ", imagePath);
    
            // if (imagePath !== "null" && imagePath !== undefined) {
            //     let image = document.createElement("img");
            //     image.src = imagePath;
            //     document.getElementById("imageDiv").append(image);
            // } else {
            //     document.getElementById("imageTxt").innerHTML = "No Image for this item!";
            // }
    
            // document.getElementById("itemName").innerHTML = itemName;
            // document.getElementById("itemDescription").innerHTML = "<strong>Description: </strong><br /><br />" + itemDescription;
            // document.getElementById("itemQuantity").innerHTML = "<strong>Quantity Available: </strong>" + itemQuantity;
            // document.getElementById("startTime").innerHTML = "<strong>Sale Start: </strong>" + startTime;
            // document.getElementById("endTime").innerHTML = "<strong>Sale End: </strong>" + endTime;
            // document.getElementById("itemPrice").innerHTML = "CAD $" + itemPrice;
    
            let placeholderNumImgs = 3;
            let placeholderNumOpts = 0;
            displayModals(placeholderNumImgs);
            displayCarousel(placeholderNumImgs);
            displayItemInfo(placeholderNumOpts, placeholderNumOpts);
        }
    }
    // ?item=1&artist=1
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const id = urlParams.get('id')

    // search db for item
    // itemResult = queryResult;
    // let placeholderNumImgs = 3;
    // let placeholderNumOpts = 4;

}

function displayModals(length){
    let outputContainer = document.getElementById("modalImageColumn");
    let output = "";
    // let length = 3;//replace with number of image results
    outputContainer.innerHTML = "";
    
    // <a>
    //    <img class="img-fluid z-depth-1" src="assets/img/750.png" alt="" data-toggle="modal" data-target="#modal1">
    // </a>
    // <br>
    // <br>
    for (let i = 0; i < length; i++) {
        output = "";
        output += "<a>";

        output += "<img class='img-fluid z-depth-1' src=" + imagePath + " alt='' data-toggle='modal' data-target='#modal1'>";
        // output += "<img class='img-fluid z-depth-1' src='assets/img/" + (750 + i) +".png' alt='' data-toggle='modal' data-target='#modal" + (i+1) + "'>";

        output += "</a><br><br>";
        
        outputContainer.innerHTML += output;
    }
    // <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    //     <div class="modal-dialog modal-lg" role="document">
    //         <!--Content-->
    //         <div class="modal-content">
    //             <!--Body-->
    //             <div class="modal-body mb-0 p-0">
    //                 <img class='img-fluid w-100' src="assets/img/750.png" alt="" />
    //             </div>
    //         </div>
    //         <!--/.Content-->
    //     </div>
    // </div>
    for (let i = 0; i < length; i++) {
        output = "";

        output += "<div class='modal fade' id='modal"+ (i+1) + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";

        output += "<div class='modal-dialog modal-lg' role='document'><div class='modal-content'><div class='modal-body mb-0 p-0'>";

        output += "<img class='img-fluid w-100' src='" + imagePath + "' alt='' />"
        // output += "<img class='img-fluid w-100' src='assets/img/" + (750 + i) +".png' alt='' />"

        output += "</div></div></div></div>";
        
        outputContainer.innerHTML += output;
    }

}

function displayCarousel(length){
    // <ol class="carousel-indicators">
    //     <li data-target="#itemCarousel" data-slide-to="0" class="active"></li>
    //     <li data-target="#itemCarousel" data-slide-to="1"></li>
    //     <li data-target="#itemCarousel" data-slide-to="2"></li>
    // </ol>
    // 
    // <div class="carousel-inner">
    //     <div class="carousel-item active">
    //         <img class="d-block w-100" src="assets/img/750.png" alt="nth slide">
    //     </div>
    //     <div class="carousel-item">
    //         <img class="d-block w-100" src="assets/img/500.png" alt="nth slide">
    //     </div>
    //     <div class="carousel-item">
    //         <img class="d-block w-100" src="assets/img/752.png" alt="nth slide">
    //     </div>
    // </div>
    // 
    // <a class="carousel-control-prev" href="#itemCarousel" role="button" data-slide="prev">
    //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span class="sr-only">Previous</span>
    // </a>
    // <a class="carousel-control-next" href="#itemCarousel" role="button" data-slide="next">
    //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span class="sr-only">Next</span>
    // </a>

    let outputContainer = document.getElementById("itemCarousel");
    let output = "";
    // let length = 3;//replace with number of image results
    outputContainer.innerHTML = "";
    
    // output = "<ol class='carousel-indicators'>"
    // outputContainer.innerHTML += output;

    for (let i = 0; i < length; i++) {
        // output = "";
        
        if(i == 0){
            output +=  "<ol class='carousel-indicators'>";
        }

        // output += "<img class='img-fluid z-depth-1' src=" + itemResult.image[i] + " alt='' data-toggle='modal' data-target='#modal1'>";
        output += "<li data-target='#itemCarousel' data-slide-to='" + i;
        if(i ==0){
            output +=  "' class='active'></li>";
        } else {
            output +=  "'></li>";
        }
        
        // outputContainer.innerHTML += output;
    }
    // output = "";
    output += "</ol>"
    outputContainer.innerHTML += output;
    console.log(output);
    for (let i = 0; i < length; i++) {
        
        if(i == 0){
            output = "";
            output +=  "<div class='carousel-inner'>";
        }
        
        // output += "<img class='img-fluid z-depth-1' src=" + itemResult.image[i] + " alt='' data-toggle='modal' data-target='#modal1'>";
        output += "<div class='carousel-item";
        if(i == 0){
            output +=  " active'>";
        } else {
            output +=  "'>";
        }

        output += "<img class='d-block w-100' src='" + imagePath + "' alt='slide" + i + "'></div>";
        // output += "<img class='d-block w-100' src='assets/img/" + (750 + i) +".png' alt='slide" + i + "'></div>";
        
        // outputContainer.innerHTML += output;
    }
    outputContainer.innerHTML += output;
    output = "";
    output += "<a class='carousel-control-prev' href='#itemCarousel' role='button' data-slide='prev'>"
    output += "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"
    output += "<span class='sr-only'>Previous</span>"
    output += "</a>"
    output += "<a class='carousel-control-next' href='#itemCarousel' role='button' data-slide='next'>"
    output += "<span class='carousel-control-next-icon' aria-hidden='true'></span>"
    output += "<span class='sr-only'>Next</span>"
    output += "</a>"
    outputContainer.innerHTML += output;
}

function displayItemInfo(dropDownOneNum, dropDownTwoNum){

    let outputContainer = document.getElementById("itemCarouselName");
    let output = "";
    outputContainer.innerHTML = "";
    output += itemName;
    // output += "Item Name";
    outputContainer.innerHTML += output;


    outputContainer = document.getElementById("itemStockAmount");
    output = "";
    outputContainer.innerHTML = "";
    output += itemQuantity + " in stock";
    // output += 5 +" in stock ";
    outputContainer.innerHTML += output;


    outputContainer = document.getElementById("itemName");
    output = "";
    outputContainer.innerHTML = "";
    output += itemName;
    // output += "Item Name";
    outputContainer.innerHTML += output;

    outputContainer = document.getElementById("itemDescription");
    output = "";
    outputContainer.innerHTML = "";
    output += itemDescription;
    // output += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ligula ultricies, dapibus arcu eu, imperdiet libero. Pellentesque quis tincidunt felis. Curabitur non sem enim. Nulla aliquet mauris eu lectus laoreet vestibulum. Mauris ullamcorper eros id mauris pulvinar, vitae auctor felis eleifend. Suspendisse aliquet tincidunt lectus eget interdum. Integer viverra, odio ut egestas egestas, arcu arcu condimentum metus, sed congue orci lacus in tortor. Vivamus aliquet posuere rutrum. Sed at lacinia sapien, quis dapibus lacus. Sed sed justo pellentesque, laoreet enim sit amet, vehicula augue. Donec at erat nec ligula sagittis luctus.";
    outputContainer.innerHTML += output;

    outputContainer = document.getElementById("itemPrice");
    output = "";
    outputContainer.innerHTML = "";
    output += "CA$" + itemPrice;
    // output += "CA$"+ 49.99;
    outputContainer.innerHTML += output;

    document.getElementById("startTime").innerHTML = "<strong>Sale Start: </strong>" + startTime;
    document.getElementById("endTime").innerHTML = "<strong>Sale End: </strong>" + endTime;

    /*
    outputContainer = document.getElementById("dropdownOne");
    output = "";
    outputContainer.innerHTML = "";
    for (let i = 0; i < dropDownOneNum; i++) {
        output = "";
        
        // output += "<option value='option"+ (i+1) + "'>" + itemResult.options1[i] + "</option>";
        output += "<option value='option"+ (i+1) + "'>d1option"+(i+1)+"</option>";
        
        outputContainer.innerHTML += output;
    }
    outputContainer = document.getElementById("dropdownTwo");
    output = "";
    outputContainer.innerHTML = "";
    for (let i = 0; i < dropDownTwoNum; i++) {
        output = "";
        
        // output += "<option value='option"+ (i+1) + "'>" + itemResult.options2[i] + "</option>";
        output += "<option value='option"+ (i+1) + "'>d2option"+(i+1)+"</option>";
        
        outputContainer.innerHTML += output;
    }
*/
    
    // // output += "CA$" + itemResult.cost;
    // output += "CA$"+ 49.99;
    // outputContainer.innerHTML += output;

    // outputContainer = document.getElementById("itemCostInfo");
    // output = "";
    // outputContainer.innerHTML = "";
    // // output += "CA$" + itemResult.cost;
    // output += "CA$"+ 49.99;
    // outputContainer.innerHTML += output;
}

displayItemDetails();