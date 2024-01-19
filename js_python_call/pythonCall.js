// pythonCall.js
const { spawn } = require('child_process');

const runPythonProcess = () => {
  return new Promise((resolve, reject) => {
    let pythonOutput = '';

    // const pythonProcess = spawn('C:/Users/kunsa/AppData/Local/Programs/Python/Python312/python.exe', ['hello.py']);
    const pythonProcess = spawn('C:/Users/kunsa/AppData/Local/Programs/Python/Python312/python.exe', ['tri-model.py']);

    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code} and output sent to client`);
      resolve(pythonOutput);
    });
  });
};

module.exports = {
  runPythonProcess,
};
