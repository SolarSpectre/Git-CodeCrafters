const fs = require("fs");
const path = require("path");

//constants
const command = process.argv[2];
const argument = process.argv[4];
function createGitDirectory() {
   fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
   fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
   fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });

   fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
   console.log("Initialized git directory");
 }
function checkCommand(command){
    switch (command) {
    case "init":
        createGitDirectory();
        break;
    default:
        throw new Error(`Unknown command ${command}`);
    }
}

 checkCommand(command);
