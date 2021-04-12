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

function changeName(name) {
    username = name;
    document.getElementById("usernameInput").innerHTML = getPrefix();
}

function callCommand(input) {

    let arr = input.split(" ");
    let cmd = commands[arr[0]];
    if(cmd === undefined) {
        return createText("Unknown command");
    }
    return commands[arr[0]](arr.slice(1).join(" "));
    /*

    if(input.startsWith("help")) {
        return help();
    }
    else if(input.startsWith("clear")) {
        document.getElementById('previousCommands').innerHTML = '';
        return undefined;
    }
    else if(input.startsWith("eval")) {
        let ret = eval(input.slice(5));
        return createText(`» ${ret}`);
    } else if (input.startsWith("name")) {
        let newName = input.slice(5);
        changeName(newName);
        return createText(`Name changed to ${newName}`)
    } else if(input.startsWith("contact")) {
        let str = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg> <a href='https://github.com/bennetde'>GitHub</a><br><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
      <path d="M6.552 6.712c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888.008-.488-.36-.888-.816-.888zm2.92 0c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888s-.36-.888-.816-.888z"/>
      <path d="M13.36 0H2.64C1.736 0 1 .736 1 1.648v10.816c0 .912.736 1.648 1.64 1.648h9.072l-.424-1.48 1.024.952.968.896L15 16V1.648C15 .736 14.264 0 13.36 0zm-3.088 10.448s-.288-.344-.528-.648c1.048-.296 1.448-.952 1.448-.952-.328.216-.64.368-.92.472-.4.168-.784.28-1.16.344a5.604 5.604 0 0 1-2.072-.008 6.716 6.716 0 0 1-1.176-.344 4.688 4.688 0 0 1-.584-.272c-.024-.016-.048-.024-.072-.04-.016-.008-.024-.016-.032-.024-.144-.08-.224-.136-.224-.136s.384.64 1.4.944c-.24.304-.536.664-.536.664-1.768-.056-2.44-1.216-2.44-1.216 0-2.576 1.152-4.664 1.152-4.664 1.152-.864 2.248-.84 2.248-.84l.08.096c-1.44.416-2.104 1.048-2.104 1.048s.176-.096.472-.232c.856-.376 1.536-.48 1.816-.504.048-.008.088-.016.136-.016a6.521 6.521 0 0 1 4.024.752s-.632-.6-1.992-1.016l.112-.128s1.096-.024 2.248.84c0 0 1.152 2.088 1.152 4.664 0 0-.68 1.16-2.448 1.216z"/>
    </svg> Bennet#6438<br><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
  </svg> <a href="mailto:bennet@deboben.de">bennet@deboben.de</a>`
      return createText(str);
    }
    else {
        return createText("Unknown command");
    }
    */
}




window.onload = function() {
    document.getElementById("usernameInput").innerHTML = getPrefix();
    document.getElementById("motd").innerText = (data.motd);
}