const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});