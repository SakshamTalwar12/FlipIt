const express = require("express");
const path = require("path");
const serverless = require("serverless-http");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    console.log("User visited /, serving start.html...");
    res.sendFile(path.join(__dirname, "public", "start.html"));
});

app.post("/", (req, res) => {
    const difficulty = req.body.difficulty;
    console.log("Difficulty selected:", difficulty);

    let redirectUrl;
    if (difficulty === "easy") {
        redirectUrl = "/easy.html";
    } else if (difficulty === "medium") {
        redirectUrl = "/medium.html";
    } else if (difficulty === "hard") {
        redirectUrl = "/hard.html";
    } else {
        return res.status(400).json({ error: "Invalid difficulty selected." });
    }

    res.json({ redirectUrl });
});

// Export the app as a serverless function
module.exports.handler = serverless(app);
