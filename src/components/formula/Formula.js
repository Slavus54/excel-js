import {ExcelComponent} from '../../core/ExcelComponent'
import {$} from '../../core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor (root, options) {
        super(root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `<div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>`
    }

    init() {
        super.init()
        let input = document.querySelectorAll('.input')
        this.$on('table:move-value', text => {
            input[1].textContent = text
        })
        this.$on('table:move-input', ({value, place}) => {
            input[1].textContent = value
            place.textContent = value
        })
    }

    onInput(event) {
        
        console.log(this.emitter)
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(e) {
        const {key} = e

        if (key === 'Enter') {
            e.preventDefault()
            this.$emit('formula:done')
        }
    }
}