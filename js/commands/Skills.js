import { Command } from "./Command.js";


export class SkillsCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        let str = `languages: ${data.skills.languages}\nlibraries/engines: ${data.skills.librariesAndEngines}`
        node.appendChild(createText(str));
    }
}