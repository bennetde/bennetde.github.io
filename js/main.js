var host = 'bennet.tech';
var username = 'guest';
function getPrefix() {
    return `${username}@${host}`;
}

function changeText(string) {
    document.getElementById('inputDisplay').innerText = string;
}

function submitText(string) {
    // Add Element to List
    let newElem = createPreviousInput(string);
    document.getElementById('previousCommands').appendChild(newElem);

    let commandResult = callCommand(string);
    if(commandResult != undefined)
        document.getElementById('previousCommands').appendChild(commandResult)

    newElem.scrollIntoView();

    // Clear Input
    document.getElementById('inputText').value = '';
    document.getElementById('inputDisplay').innerText = '';
}

// Listen for Enter event
document.getElementById("inputText").addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        submitText(document.getElementById('inputText').value);
    }
});

function disableCaret(event) {

    if(event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
    }
}

function createPreviousInput(input) {
    let divider = document.createElement("div");
    divider.classList.add("input");
    
    let user = document.createElement("p");
    user.className = "user bold";
    user.innerText = getPrefix();

    let colon = document.createElement("p");
    colon.innerText = ":";

    let cursor = document.createElement("p");
    cursor.className = "cursor bold";
    cursor.innerText = "~";

    let end = document.createElement("p");
    end.innerText = "$ " + input;

    divider.appendChild(user);
    divider.appendChild(colon);
    divider.appendChild(cursor);
    divider.appendChild(end);

    return divider;
}

function callCommand(input) {

    let arr = input.split(" ");
    let cmd = commands[arr[0]];
    if(cmd === undefined) {
        return createText("Unknown command");
    }
    return commands[arr[0]](arr.slice(1).join(" "));
}

window.onload = function() {
    document.getElementById("usernameInput").innerHTML = getPrefix();
    document.getElementById("motd").innerText = (data.motd);
}