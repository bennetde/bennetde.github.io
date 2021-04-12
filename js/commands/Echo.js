import { Command } from "./Command.js";


export class EchoCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        let textNode = createText(args.slice(1).join(" "));
        node.appendChild(textNode);
    }
}