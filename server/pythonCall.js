import { spawn } from "child_process";

const runPythonProcess = async () => {
  return new Promise((resolve, reject) => {
    console.log("Python is ready to go...");

    let pythonOutput = "";

    const pythonProcess = spawn(
      "python",
      ["./tri-model.py"]
    );
    // console.log(pythonProcess);
    pythonProcess.stdout.on("data", (data) => {
      console.log("Im here on python stdout");
      console.log(`Python stdout: ${data}`);
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python Error: ${data}`);
      // console.log("Im here on python error");
    });

    pythonProcess.on("close", (code) => {
      console.log(
        `Python process exited with code ${code} and output sent to client`
      );
      resolve(pythonOutput);
    });
  });
};

export default { runPythonProcess };
