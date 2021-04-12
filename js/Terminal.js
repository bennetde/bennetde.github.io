import { EchoCommand } from "./commands/Echo.js";
import {Command} from "./commands/Command.js";
import { UnknownCommand } from "./commands/Unknown.js";
import { SetNameCommand } from "./commands/SetName.js";
import { HelpCommand } from "./commands/Help.js";
import { DogCommand } from "./commands/Dog.js";
import { AboutCommand } from "./commands/About.js";
import { SkillsCommand } from "./commands/Skills.js";
import { ContactCommand } from "./commands/Contact.js";
import { AllCommand} from './commands/All.js';
import { ClearCommand } from "./commands/Clear.js";
import { MotdCommand } from "./commands/Motd.js";

export class Terminal {
    constructor(resultsElem, defaultUserName) {
        this.resultsElem = resultsElem;
        this.username = defaultUserName;
        this.commands = {
            'help': HelpCommand, 
            'echo': EchoCommand, 
            'name': SetNameCommand, 
            'dog': DogCommand,
            'about': AboutCommand,
            'skills': SkillsCommand,
            'contact': ContactCommand,
            'all': AllCommand,
            'clear': ClearCommand,
            'motd': MotdCommand,
        };

        Command.outputDiv = resultsElem;
    }

    recieveInput(input) {
        if(input == "" || input == undefined) return;

        this.createInputElement(input);
        let inputArray = input.split(" ");
        let cmd = this.commands[inputArray[0].toLowerCase()];
        if(cmd == undefined) {
            cmd = UnknownCommand;
        }
        new cmd(this).call(inputArray);
    }

    getPrefix() {
        return `${data.username}@${data.host}`;
    }

    createInputElement(input) {
        let divider = document.createElement("div");
        divider.classList.add("input");
        
        let user = document.createElement("p");
        user.className = "user bold";
        user.innerText = this.getPrefix();
    
        let colon = document.createElement("p");
        colon.innerText = ":";
    
        let cursor = document.createElement("p");
        cursor.className = "cursor bold";
        cursor.innerText = "~";
    
        let end = document.createElement("p");
        end.innerText = "$ " + input;
    
        divider.appendChild(user);
        divider.appendChild(colon);
        divider.appendChild(cursor);
        divider.appendChild(end);
    
        this.resultsElem.appendChild(divider);
    }


}