var host = 'bennet.page';
var username = 'guest';
function getPrefix() {
    return `${username}@${host}`;
}

function changeText(string) {
    document.getElementById('inputDisplay').innerHTML = " " + string;
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
    document.getElementById('inputDisplay').innerHTML = '';
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
    user.innerHTML = getPrefix();

    let colon = document.createElement("p");
    colon.innerHTML = ":";

    let cursor = document.createElement("p");
    cursor.className = "cursor bold";
    cursor.innerHTML = "~";

    let end = document.createElement("p");
    end.innerHTML = "$ " + input;

    divider.appendChild(user);
    divider.appendChild(colon);
    divider.appendChild(cursor);
    divider.appendChild(end);

    return divider;
}


function callCommand(input) {

    if(input.startsWith("help")) {
        return createText("All commands:<br>help<br>clear")
    }
    else if(input.startsWith("clear")) {
        document.getElementById('previousCommands').innerHTML = '';
        return undefined;
    }
    else {
        return createText("Unknown command");
    }
}


function createText(text) {
    let node = document.createElement("p");
    node.innerHTML = text;
    return node;
}