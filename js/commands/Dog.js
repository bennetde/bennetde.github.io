import { Command } from "./Command.js";


export class DogCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        let imageNode = createImage('lenny.jfif', 50, 50);
        node.appendChild(imageNode);
    }
}