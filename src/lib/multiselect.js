export class Multiselect {
    constructor(elem, contents) {
        this.element = elem;
        this.contents = contents;
        this.init();
    }

    init() {
        let ul = document.createElement( 'ul' );
        this.ul = this.element.appendChild( ul );
        this.renderList();
    }

    renderList() {
        let liElements = this.contents.map(content => this.getLi(content.text));
        for( let li of liElements ){
            this.appendLi( li );
        }
    }

    appendLi(li) {
        this.ul.appendChild(li);
    }

    getLi(text) {
        let li = document.createElement( 'li' );
        li.innerText = text;
        return li;
    }
}