function createText(text) {
    let node = document.createElement("p");
    node.innerHTML = text;
    return node;
}

function createImage(src) {
    let node = document.createElement("img");
    node.src = `svg/${src}.svg`;
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
    let discord = createImageWithText(data.contact.discord, 'discord', false, null)
    let github = createImageWithText('GitHub', 'github', true, data.contact.github);

    divider.appendChild(github);
    divider.appendChild(discord);
    return divider;
}

function motd() {
    return createText(data.motd);
}


let commands = {
    "help": help,
    "clear": clear,
    "echo": echo,
    "about": about,
    "skills": skills,
    "contact": contact,
    "motd": motd,
}