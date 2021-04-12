function createText(text) {
    let node = document.createElement("p");
    node.innerText = text;
    return node;
}

function createImage(src, width, height) {
    let node = document.createElement("img");
    node.src = `img/${src}`;
    if(width != undefined && height != undefined) {
        node.style = `width:${width}%;height:${height};`;
    }

    return node;
}

function createImageWithText(text, src, textIsLink, link) {
    let node = document.createElement("div");
    node.className = 'input';

    node.appendChild(createImage(src));
    if(textIsLink) {
        node.appendChild(createLink(" " + text, link));
    } else {
        node.appendChild(createText(" " + text));
    }

    return node;
}

function createLink(text, link) {
    let node = document.createElement("a");
    node.innerText = text;
    node.href = link;
    return node;
}

function echo(text) {
    return createText(text);
}

function help() {
    return createText("All commands:\n" + Object.keys(commands).join("\n"));
}

function clear() {
    document.getElementById('previousCommands').innerHTML = '';
    return document.createElement("div");
}

function about() {
    let str = `name: ${data.about.name}\nbirthdate: ${data.about.birthDate}\ncurrently: ${data.about.currently}`
    return createText(str);
}

function skills() {
    let str = `languages: ${data.skills.languages}\nlibraries/engines: ${data.skills.librariesAndEngines}`
    return createText(str);
}

function contact() {
    
    let divider = document.createElement('div');
    divider.className = 'commands'
    let discord = createImageWithText(data.contact.discord, 'discord.svg', false, null)
    let github = createImageWithText('GitHub', 'github.svg', true, data.contact.github);

    divider.appendChild(github);
    divider.appendChild(discord);
    return divider;
}

function motd() {
    return createText(data.motd);
}

function changeName(newName) {
    if(newName == '') {
        return createText("Usage: name <name>");
    }
    if(newName == 'root') {
        return createText('A̙̳̲͓͋̎̀c̖c͏̺̅e̲ͪ͋́͟͟s̴̮̦̥̮ͣs̤̻ ̠̰͗ͧ͊ͣd̤͔̝̤ͬ͛e̵̗̻̪̓̔̈̿n͏ḭ̷̧̌͝͏́̈͢e̟͍͓͊̐͋̾ͧ͡d͓');
    }
    username = newName;
    document.getElementById('usernameInput').innerHTML = getPrefix();
    return createText(`Name changed to ${newName}`);
}

function all() {
    let divider = document.createElement('div');
    divider.className='commands';
    divider.appendChild(createText("About:"))
    divider.appendChild(about());
    divider.appendChild(createText("Skills:"))
    divider.appendChild(skills());
    divider.appendChild(createText("Contact:"))
    divider.appendChild(contact());
    return divider;
}

function dog() {
    return createImage('lenny.jfif', 50, 50);
}

let commands = {
    "help": help,
    "clear": clear,
    "echo": echo,
    "about": about,
    "skills": skills,
    "contact": contact,
    "motd": motd,
    "name": changeName,
    "all": all,
    "dog": dog,
}