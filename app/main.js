const fs = require("fs");
const path = require("path");
const zlib = require("zlib")

//constants
const command = process.argv[2];
const argument = process.argv[4];

//Read Blob Object
async function catFile(hash){
    const contentFile = await fs.readFileSync(path.join(process.cwd(), ".git", "objects", hash.substring(0, 2), hash.substring(2)));
    const dataUnzipped = zlib.inflateSync(contentFile);
    const dataString = dataUnzipped.toString('utf8');
    const content = dataString.substring(dataString.indexOf('\0')+1);
    process.stdout.write(content);
}
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
    case "cat-file":
        catFile(argument);
        break;
    default:
        throw new Error(`Unknown command ${command}`);
    }
}
 checkCommand(command);
