import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";
import fileReader from "./file_reader.js";
import pythonFile from "./pythonCall.js";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});

app.get("/", async (req, res) => {
  try {
    console.log("req.query.url", req.query.url);
    const url = req.query.url;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const special_characters =
      /[\[\],"\{\}\(\)\<\>\/\?;\:|\`~\!\@\#\$\%\^\&\*\_\-\+\=\. ]/g;

    const texts = await page.$$eval(
      "p, h1, h2, h3, h4, h5, h6, li, a",
      (elements, special_characters) =>
        elements.map((element) =>
          element.textContent.replace(special_characters, "")
        ),
      special_characters
    );
    await browser.close();

    // Define the path to the JSON file
    const jsonPath = path.resolve("./", "scraped.json");
    const jsonData = JSON.stringify(texts);

    // Read the existing file
    fs.readFile(jsonPath, "utf8", (err, fileData) => {
      if (err) throw err;

      // Write the JSON data to the file, replacing any existing data
      fs.writeFile(jsonPath, jsonData, "utf8", (err) => {
        if (err) throw err;
        console.log("The file has been updated!");
      });
    });

    res.json({ texts });
    console.log("Im here");

    const fileCleanProcess = async () => {
      try {
        const fileCleanOutput = await fileReader.runFileReadProcess();
        console.log("running file clean process");
        // console.log(fileCleanOutput);
        fileCleanOutput === "error faced"
          ? console.log("error faced")
          : console.log("file clean process completed");
      } catch (error) {
        console.error(error);
      }
    };

    fileCleanProcess();

    const callPythonProcess = async () => {
      try {
        const pythonOutput = await pythonFile.runPythonProcess();
        console.log("running python process");
        res.send(pythonOutput);
      } catch (error) {
        console.error(error);
      }
    };

    callPythonProcess();
    // runProcesses();
  } catch (error) {
    console.error("Error:", error);
    console.log("now im here");
    res.status(500).send("Internal Server Error");
  }
});
