import { Command } from "./Command.js";


export class AllCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        this.terminal.recieveInput('about');
        this.terminal.recieveInput('skills');
        this.terminal.recieveInput('contact');
    }
}