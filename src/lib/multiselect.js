import { sanitizeInput } from '../util/sanitizer';

export class Multiselect {
    /**
     * Constructor
     * @param {*} elem Takes the dom element within which the plugin will render elements.
     * @param {*} contents Takes the contents in an array of objects format E.g.
     * [
                    { text: 'Monica', isSelected: true },
                    { text: 'Chandler', isSelected: true },
                    { text: 'Joey', isSelected: false },
                    { text: 'Geller', isSelected: false },
                ]
     */
    constructor(elem, contents = []) {
        this.element = elem;
        this.contents = sanitizeInput(contents);
        this.init();
    }

    /**
     * Create ul elements and render all li elements.
     */
    init() {
        let ul = document.createElement('ul');
        this.ul = this.element.appendChild(ul);
        this.renderList();
    }

    /**
     * Function to render li lists.
     */
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
        li.appendChild(this.getCheckBox(isSelected, index));
        li.appendChild(this.getContainerText(text));
        return li;
    }

    getCheckBox(isSelected, index) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isSelected;
        checkbox.addEventListener('change', () => {
            this.contents[index].isSelected = checkbox.checked;
            this.changeFunc(this.parseOutput())
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

    /**
     * onChange callback to get checkbox change events
     * @param {*} func
     */
    onChange(func) {
        if(typeof func === 'function') {
            this.changeFunc = func;
        }
    }

    /**
     * Function to get current selected values
     */
    getSelectedValues() {
        return this.parseOutput();
    }
}