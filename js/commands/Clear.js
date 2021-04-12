import { Command } from "./Command.js";


export class ClearCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        this.terminal.resultsElem.innerHTML = '';
    }
}