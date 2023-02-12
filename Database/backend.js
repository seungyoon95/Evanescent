const http = require("http");
const userRoute = require("./routes/user");
const itemRoute = require("./routes/item");
const POST = "POST";
const GET = "GET";
const PUT = "PUT";
const OPTIONS = "OPTIONS";
const fs = require("fs");
const url = require("url");

const userEndPointRoot = "/API/users/";
const itemEndPointRoot = "/API/items/";
const imageEndpointRoot = "/API/users/userImage/";

// creates folder for image uploads
fs.readdir("imageUploads", (error) => {
  if (error) {
    fs.mkdirSync("imageUploads");
  }
});

const server = http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  });

  let q = url.parse(req.url, true);
  let pathName = q.pathname;

  if (req.method === GET && q.pathname == userEndPointRoot + "singleUser/") {
    userRoute.getSingleUserByID(req, res);
  }

  if (req.method === POST && req.url === userEndPointRoot) {
    userRoute.postUser(req, res);
  }

  if (req.method === GET && q.pathname === userEndPointRoot) {
    userRoute.getUserByUserID(req, res);
  }

  if (req.method === POST && req.url === userEndPointRoot + "update/") {
    userRoute.updateUserProfile(req, res);
  }

  if (req.method === POST && pathName === imageEndpointRoot) {
    userRoute.postProfileImage(req, res);
  }

  if (req.method === POST && pathName === itemEndPointRoot) {
    itemRoute.postItem(req, res);
  }

  if (req.method === GET && pathName === itemEndPointRoot) {
    itemRoute.getItemByItemID(req, res);
  }

  if (req.method === GET && pathName === itemEndPointRoot + "searchAll/") {
    itemRoute.getItemSearchAll(req, res);
  }

  if (req.method === GET && q.pathname === itemEndPointRoot + "byUser/") {
    itemRoute.getItemByUserID(req, res);
  }

  if (req.method === GET && pathName === itemEndPointRoot + "itemDetails/") {
    itemRoute.getItemDetails(req, res);
  }
});

server.listen(8888);
