import { Command } from "./Command.js";


export class MotdCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        let textNode = createText(data.motd);
        node.appendChild(textNode);
    }
}