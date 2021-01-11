import {ExcelComponent} from '../../core/ExcelComponent'
import {$} from '../../core/dom'
import {CHANGE_TEXT} from '../../redux/types'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor (root, options) {
        super(root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText', 'colState'],
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
        // this.$on('table:move-input', ({value, place}) => {
        //     input[1].textContent = value
        //     place.textContent = value
        // })
        // this.$subscribe(state => {

        //     console.log('Text changing')
        //     input[1].textContent = state.currentText
        //     // place.textContent = state.currentText
        //     let daten = state.dataState
        //     for (let item in daten) {
        //         if (typeof item === 'string') {
        //             let cells = document.querySelectorAll('.cell')

        //             cells.forEach(el => {
        //                 if (el.dataset.id === item) {
        //                     el.textContent = daten[item]
        //                 }
        //             })
              
        //         }
                
               
        //     }
        // })
        
    }

    storeChanged({currentText}) {
        let input = document.querySelectorAll('.input')
        input[1].textContent = currentText
        let state = this.store.getState()

        let daten = state.dataState
            for (let item in daten) {
                if (typeof item === 'string') {
                    let cells = document.querySelectorAll('.cell')

                    cells.forEach(el => {
                        if (el.dataset.id === item) {
                            el.textContent = daten[item]
                        }
                    })
              
                }
                
               
            }
        console.log('changes')
    }

    onInput(event) {
        
        console.log(this.emitter)
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(e) {
        const {key} = e

        if (key === 'Enter') {
            e.preventDefault()
            this.$emit('formula:done', e)
        }
    }
}