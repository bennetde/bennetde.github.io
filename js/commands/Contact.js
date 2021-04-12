import { Command } from "./Command.js";


export class ContactCommand extends Command {
    constructor(terminal) {
        super(terminal, 0);
    }

    execute(node, args) {
        node.className = 'commands';
        let discord = createImageWithText(data.contact.discord, 'discord.svg', false, null)
        let github = createImageWithText('GitHub', 'github.svg', true, data.contact.github);
    
        node.appendChild(github);
        node.appendChild(discord);
    }
}