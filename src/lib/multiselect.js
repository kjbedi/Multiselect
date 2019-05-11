import { sanitizeInput } from '../util/sanitizer';

export class Multiselect {
    /// Param 1:- Takes the dom element within which the plugin will render elements.
    /// Param 2:- Takes the contents in a array of object format..
    constructor(elem, contents = []) {
        this.element = elem;
        this.contents = sanitizeInput(contents);
        this.init();
    }

    init() {
        let ul = document.createElement( 'ul' );
        this.ul = this.element.appendChild( ul );
        this.renderList();
    }

    renderList() {
        let liElements = this.contents.map((content, index) => this.getLi(content.text, content.isSelected, index));
        for( let li of liElements ){
            this.appendLi( li );
        }
    }

    appendLi(li) {
        this.ul.appendChild(li);
    }

    getLi(text, isSelected, index) {
        let li = document.createElement('li');
        li.appendChild(this.getCheckBox(text, isSelected, index));
        li.appendChild(this.getContainerText(text));
        return li;
    }

    getCheckBox(text, isSelected, index) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = text;
        checkbox.checked = isSelected;
        checkbox.addEventListener('change', () => {
            this.contents[index].isSelected = checkbox.checked;
            this.parseOutput();
         });
        return checkbox;
    }

    getContainerText(text) {
        let containerText = document.createElement('span');
        containerText.innerText = text;
        return containerText;
    }

    parseOutput() {
        const output = this.contents.filter((content) => content.isSelected === true).map((content) => content.text)
        return output;
    }

    onChange(func) {
        if(typeof func === 'function') {
            func(parseOutput());
        } else {
            console.error('Attach a callback function');
        }
    }

    getValues() {
        return this.parseOutput();
    }
}