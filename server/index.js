import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import scrapeData from "./puppeteerScript.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/scrapedata", async (req, res) => {
    const { link } = req.body;

    // Check if link is provided
    if (!link) {
        return res.status(400).send("No link provided.");
    }

    try {
        const scrapedData = await scrapeData(link);
        res.send({ data: scrapedData });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while scraping data.");
    }
});
