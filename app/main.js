//constants
const command = process.argv[2];
const argument = process.argv[4];

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
