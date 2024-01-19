const express = require('express');
const fileReader = require('./file_reader.js');  // Import the module
const pythonFile = require('./pythonCall.js');  // Import the module

const app = express();

app.get('/', async (req, res) => {
    try {
        await fileReader.runFileReadProcess();
        // Run the Python process and wait for it to complete
        const pythonOutput = await pythonFile.runPythonProcess();

        // Send the output to the client
        res.send(`Output returned from python file: ${pythonOutput}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
