const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db",
});

app.use(cors());

function handleDisconnect() {
    console.log("handleDisconnect()");
    connection.destroy();
    connection = mysql.createConnection(connection);
    connection.connect(function(err) {
        if (err) {
            console.log(" Error when connecting to db  (DBERR001):", err);
            setTimeout(handleDisconnect, 1000);
        }
    });
}

connection.connect(function(err) {
    if (err) {
        console.log("Connection is asleep (time to wake it up): ", err);
        setTimeout(handleDisconnect, 1000);
        handleDisconnect();
    }
});


app.get("/register", (req, res) => {
    const { name, password, email } = req.query;
    connection.query(`insert into USERS values("${name}" , "${password}" , "${email}")`, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
})

app.get("/login", (req, res) => {
    const { name } = req.query;
    connection.query(`select * from USERS where name="${name}"`, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
})

app.get("/items", (req, res) => {
    const { username } = req.query;
    connection.query(`select * from ITEMS where username="${username}"`, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
})

app.get("/additem", (req, res) => {
    const { username, itemname, category, amount } = req.query;
    connection.query(`insert into ITEMS values("${username}" , "${itemname}" , "${category}" , ${amount})`, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
})

app.listen(4000, () => {
    console.log("Server up!!");
});