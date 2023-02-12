const url = require("url");
const con = require("../database").con;
const fs = require("fs");

// Post User
function postUser(req, res) {
  let body = "";
  req.on("data", function (chunk) {
    if (chunk !== null) {
      body += chunk;
    }
  });

  req.on("end", function () {
    let q = url.parse(body, true);
    let idInput = q.query.userID.trim();
    let firstNameInput = q.query.userFirstName.trim();
    let lastNameInput = q.query.userLastName.trim();
    let emailInput = q.query.userEmail.trim();
    let addressInput = q.query.userAddress.trim();
    let postalInput = q.query.userPostalCode.trim();

    // console.log("UID: ", idInput);
    // console.log("firstName: ", firstNameInput);
    // console.log("lastName: ", lastNameInput);
    // console.log("address: ", addressInput);
    // console.log("postalCode: ", postalInput);

    con.getConnection(function (err, connection) {
      if (err) throw err;
      let sql = `INSERT INTO user(userID, userFirstName, userLastName, userEmail, userAddress, userPostalCode) values ('${idInput}', '${firstNameInput}', '${lastNameInput}', '${emailInput}', '${addressInput}', '${postalInput}')`;
      connection.query(sql, function (err, result) {
        connection.release();
        if (err) throw err;
        console.log(`User Created with ID: ${idInput}`);
        console.log(result);
      });
    });
  });
}

function getSingleUserByID(req, res) {
  let q = url.parse(req.url, true);
  let id = q.query.userID;
  con.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = `SELECT * FROM user where userID='${id}'`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      connection.release();
      res.end(JSON.stringify(result));
    });
  });
}

// Get User By userID
function getUserByUserID(req, res) {
  let q = url.parse(req.url, true);
  let id = q.query.userID;
  // console.log(id);
  con.getConnection(function (err, connection) {
    if (err) throw err;
    // console.log("Read: Connected!");
    let sql = `SELECT * FROM user where userID='${id}'`;
    connection.query(sql, function (err, result) {
      connection.release();
      if (err) throw err;
      let userFirstName = JSON.stringify(result[0].userFirstName);
      let userEmail = JSON.stringify(result[0].userEmail);
      let userPhone = JSON.stringify(result[0].userPhone);
      let userAddress = JSON.stringify(result[0].userAddress);
      let userPostalCode = JSON.stringify(result[0].userPostalCode);
      let userImagePath = JSON.stringify(result[0].userImagePath);
      let userDescription = JSON.stringify(result[0].userDescription);

      // console.log(result);

      res.write(`Hello ${userFirstName}!\n`);
      res.write(`${userEmail}\n`);
      res.write(`${userPhone}\n`);
      res.write(`${userAddress}\n`);
      res.write(`${userPostalCode}\n`);
      res.write(`${userImagePath}\n`);
      res.write(`${userDescription}\n`);

      res.end();
    });
  });
}

// Update User profile
function updateUserProfile(req, res) {
  let body = "";
  req.on("data", function (chunk) {
    if (chunk !== null) {
      body += chunk;
    }
  });

  req.on("end", function () {
    let q = url.parse(body, true);
    // console.log(body);
    let idInput = q.query.userID.trim();
    let addressInput = q.query.userAddress.trim();
    let postalInput = q.query.userPostalCode.trim();
    let descriptionInput = q.query.userDescription.trim();
    let phoneInput = q.query.userPhone.trim();

    // console.log("UID: ", idInput);
    // console.log("address: ", addressInput);
    // console.log("postalCode: ", postalInput);
    // console.log("description: ", descriptionInput);
    // console.log("phone number: ", phoneInput);
    // console.log("sale start time: ", saleStartInput);
    // console.log("sale end time: ", saleEndInput);

    con.getConnection(function (err, connection) {
      if (err) throw err;
      let sql = `UPDATE user SET userAddress = '${addressInput}', userPostalCode = '${postalInput}', userDescription = '${descriptionInput}', userPhone = '${phoneInput}' WHERE userID = '${idInput}'`;
      connection.query(sql, function (err, result) {
        connection.release();
        if (err) throw err;
        console.log(`User updated with ID: ${idInput}`);
        console.log(result);
        res.end();
      });
    });
  });
}

// POST profile image
function postProfileImage(req, res) {
  let q = url.parse(req.url, true);
  let userID = q.query.userID;

  // let body = "";
  let filePath = `./imageUploads/${userID}.png`;
  req.on("data", function (data) {
    console.log(filePath);
    fs.writeFile(filePath, data, function () {
      res.end();
    });
  });

  // let body = "";
  // req.on("data", function (chunk) {
  //     if (chunk !== null) {
  //         body += chunk;
  //     }
  // });

  req.on("end", function () {
    con.getConnection(function (err, connection) {
      if (err) throw err;
      let sql = `UPDATE user SET userImagePath = '${filePath}' WHERE userID = '${userID}'`;
      connection.query(sql, function (err, result) {
        connection.release();
        if (err) throw err;
        console.log(`Profile image inserted to user with userID: ${userID}`);
        console.log(result);
        res.end();
      });
    });
  });
}

module.exports = {
  postUser,
  getUserByUserID,
  postProfileImage,
  updateUserProfile,
  getSingleUserByID,
};