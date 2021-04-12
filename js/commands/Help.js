import { Command } from "./Command.js";


export class HelpCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        let textNode = createText("Available commands:\n" + Object.keys(this.terminal.commands).join("\n"));
        node.appendChild(textNode);
    }
}