//TODO: Make this a Utility module

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