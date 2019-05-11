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
        let liElements = this.contents.map(content => this.getLi(content.text, content.isSelected));
        for( let li of liElements ){
            this.appendLi( li );
        }
    }

    appendLi(li) {
        this.ul.appendChild(li);
    }

    getLi(text, isSelected) {
        let li = document.createElement('li');
        li.appendChild(this.getCheckBox(text, isSelected));
        li.appendChild(this.getContainerText(text));
        return li;
    }

    getCheckBox(text, isSelected) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = text;
        checkbox.checked = isSelected;
        return checkbox
    }

    getContainerText(text) {
        let containerText = document.createElement('span');
        containerText.innerText = text;
        return containerText
    }
}