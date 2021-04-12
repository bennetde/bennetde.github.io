export class Command {

    constructor(terminal, requiredMinArgs) {
        this.name = this.constructor.name;
        this.terminal = terminal;
        this.requiredMinArgs = requiredMinArgs;
    }

    call(args) {
        let node = document.createElement("div");
        Command.outputDiv.appendChild(node);
        if(args.length < this.requiredMinArgs) {
            this.error(node, args);
            return;
        }

        this.execute(node, args);

    }

    error(wrapper, args) {
        let errorMessage = createText("Not enough arguments");
        wrapper.appendChild(errorMessage);
    }

    execute(wrapper, args) {
        console.error("Not implemented");
    }
}
Command.outputDiv = undefined;