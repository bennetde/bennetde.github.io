import { Command } from "./Command.js";


export class AboutCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        let str = `name: ${data.about.name}\nbirthdate: ${data.about.birthDate}\ncurrently: ${data.about.currently}`
        node.appendChild(createText(str));
    }
}