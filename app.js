const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("pages/inicio", {
        titulo: "Bullworth"
    });
});

app.get("/camarilhas", (req, res) => {
    res.render("pages/camarilhas", {
        titulo: "Camarilhas | Bullworth RPG"
    });
});

app.get("/camarilhas/bullies", (req, res) => {
    res.render("pages/bullies", {
        titulo: "Bullies | Bullworth RPG"
    });
});

app.get("/camarilhas/preppies", (req, res) => {
    res.render("pages/preppies", {
        titulo: "Preppies | Bullworth RPG"
    });
});

app.get("/camarilhas/greasers", (req, res) => {
    res.render("pages/greasers", {
        titulo: "Greasers | Bullworth RPG"
    });
});

app.get("/camarilhas/jocks", (req, res) => {
    res.render("pages/jocks", {
        titulo: "Jocks | Bullworth RPG"
    });
});

app.get("/camarilhas/nerds", (req, res) => {
    res.render("pages/nerds", {
        titulo: "Nerds | Bullworth RPG"
    });
});

app.get("/camarilhas/cheers", (req, res) => {
    res.render("pages/cheers", {
        titulo: "Cheers | Bullworth RPG"
    });
});

app.get("/camarilhas/bullies/nivelamento", (req, res) => {
    res.render("pages/bullies-nivelamento", {
        titulo: "Bullies | Nivelamento"
    });
});

app.get("/camarilhas/preppies/nivelamento", (req, res) => {
    res.render("pages/preppies-nivelamento", {
        titulo: "Preppies | Nivelamento"
    });
});

app.get("/camarilhas/greasers/nivelamento", (req, res) => {
    res.render("pages/greasers-nivelamento", {
        titulo: "Greasers | Nivelamento"
    });
});

app.get("/camarilhas/jocks/nivelamento", (req, res) => {
    res.render("pages/jocks-nivelamento", {
        titulo: "Jocks | Nivelamento"
    });
});

app.get("/camarilhas/nerds/nivelamento", (req, res) => {
    res.render("pages/nerds-nivelamento", {
        titulo: "Nerds | Nivelamento"
    });
});

app.get("/camarilhas/cheers/nivelamento", (req, res) => {
    res.render("pages/cheers-nivelamento", {
        titulo: "Cheers | Nivelamento"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});