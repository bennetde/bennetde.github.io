import { Command } from "./Command.js";


export class SetNameCommand extends Command {
    constructor(terminal) {
        super(terminal, 2);
    }

    execute(node, args) {
        let text = "";
        if(args[1] == "") {
            text = "Name cannot be empty!\nUsage: name <newname>";
        } else {
            data.username = args[1];
            text = `Changed name to ${args[1]}`;
        }

        let textNode = createText(text);
        document.getElementById("username").innerHTML = this.terminal.getPrefix();
        node.appendChild(textNode);
    }
}