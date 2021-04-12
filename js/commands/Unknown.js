import { Command } from "./Command.js";


export class UnknownCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        let textNode = createText("Unknown Command");
        node.appendChild(textNode);
    }
}