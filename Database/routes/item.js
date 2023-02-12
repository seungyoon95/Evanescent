const url = require("url");
const con = require("../database").con;
const fs = require("fs");

// POST ITEM
function postItem(req, res) {
  let q = url.parse(req.url, true);
  let userIDInput = q.query.userID;
  let itemNameInput = q.query.itemName.trim();
  let itemPriceInput = q.query.itemPrice.trim();
  let itemDescriptionInput = q.query.itemDescription.trim();
  let itemQuantityInput = q.query.itemQuantity.trim();
  let startTime = q.query.startTime.trim();
  let endTime = q.query.endTime.trim();

  let filePath = `./itemImages/${itemNameInput}.png`;

  req.on("data", function (data) {
    fs.writeFile(filePath, data, function () {
      res.end();
    });
  });

  req.on("end", function () {
    con.getConnection(function (err, connection) {
      if (err) throw err;
      let sql = `INSERT INTO item(userID, itemName, itemPrice, itemDescription, itemQuantity, startTime, endTime, itemImagePath) values ('${userIDInput}', '${itemNameInput}', ${itemPriceInput}, '${itemDescriptionInput}', ${itemQuantityInput}, '${startTime}', '${endTime}', '${filePath}')`;
      connection.query(sql, function (err, result) {
        connection.release();
        if (err) throw err;
        console.log(`Item Created`);
        res.end(result);
      });
    });
  })
}

// GET ITEM BY itemID
function getItemByItemID(req, res) {
  let q = url.parse(req.url, true);
  let id = q.query.itemID.trim();

  con.getConnection(function (err, connection) {
    if (err) throw err;

    let sql = `SELECT itemID FROM item WHERE itemID=${id}`;
    connection.query(sql, function (err, result) {
      connection.release();
      if (err) throw err;
      //   let itemUser = JSON.stringify(result[0].userID);
      //   let itemName = JSON.stringify(result[0].itemName);
      //   let itemPrice = JSON.stringify(result[0].itemPrice);
      //   let itemDescription = JSON.stringify(result[0].itemDescription);
      //   let itemQuantity = JSON.stringify(result[0].itemQuantity);
      res.end(JSON.stringify(result));
      console.log("?");
    });
  });
}

// GET ALL ITEMS OF user BY userID
function getItemByUserID(req, res) {
  let q = url.parse(req.url, true);
  let id = q.query.userID.trim();

  con.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = `SELECT * FROM item WHERE userID='${id}'`;
    connection.query(sql, function (err, result) {
      connection.release();
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
}

// SEARCH ALL ITEMS THAT MATCH IN COLUMNS iteNAME and ItemDescription and itemPrice
function getItemSearchAll(req, res) {
  let q = url.parse(req.url, true);
  let searchVal = q.query.searchValue.trim();

  con.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = `SELECT userID, itemID, itemName, itemDescription FROM item WHERE itemName LIKE '%${searchVal}%' OR itemDescription LIKE '%${searchVal}%' OR itemPrice LIKE '%${searchVal}%'`;
    connection.query(sql, function (err, result) {
      connection.release();
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
}

function getItemDetails(req, res) {
  let q = url.parse(req.url, true);
  let itemID = q.query.itemID.trim();

  con.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = `select * FROM item WHERE itemID=${itemID}`;
    connection.query(sql, function (err, result) {
      connection.release();
      if (err) throw err;

      let itemName = JSON.stringify(result[0].itemName);
      let itemPrice = JSON.stringify(result[0].itemPrice);
      let itemDescription = JSON.stringify(result[0].itemDescription);
      let itemQuantity = JSON.stringify(result[0].itemQuantity);
      let startTime = JSON.stringify(result[0].startTime);
      let endTime = JSON.stringify(result[0].endTime);
      let itemImagePath = JSON.stringify(result[0].itemImagePath);

      res.write(`${itemName}\n`);
      res.write(`${itemPrice}\n`);
      res.write(`${itemDescription}\n`);
      res.write(`${itemQuantity}\n`);
      res.write(`${startTime}\n`);
      res.write(`${endTime}\n`);
      res.write(`${itemImagePath}\n`);

      res.end();
    });
  });
}

module.exports = {
  postItem,
  getItemByItemID,
  getItemByUserID,
  getItemSearchAll,
  getItemDetails,
};
