import { Terminal } from "./Terminal.js";


let terminal = new Terminal(document.getElementById("previousCommands"));

let inputElem = document.getElementById("inputText");
let inputDisplay = document.getElementById("inputDisplay");

// Listen for Enter event
inputElem.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        let input = inputElem.value;
        terminal.recieveInput(input);
        inputElem.value = '';
        inputDisplay.innerText = '';
    }
});

inputElem.addEventListener("keydown", function(event) {
    if(event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
    }
});

inputElem.addEventListener("input", function(event) {
    inputDisplay.innerText = event.target.value;
})

window.onload = function() {
    document.getElementById("username").innerHTML = terminal.getPrefix();
    document.getElementById("motd").innerText = (data.motd);

}