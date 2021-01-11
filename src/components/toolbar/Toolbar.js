import {ExcelComponent} from '../../core/ExcelComponent'
import {ExcelStateComponent} from '../../core/ExcelStateComponent' 
import {createToolbar} from './toolbar.template' 
import {$} from '../../core/dom'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor (root, options) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyle'],
            ...options
        })
    }

    prepare() {
        this.initState({
            textAlign: 'left',
            fontWeight: 'normal',
            textDecoration: 'none',
            fontStyle: 'normal'
        })
    }

    get template () {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(data) {
        this.setState(data.currentStyle)
    }   

    onClick(event) {
        const target = event.target
        
        if (target.dataset.type === 'button' || target.children[0].dataset.type === 'button') {

            let valen = JSON.parse(target.parentNode.dataset.value)
            this.$emit('toolbar:addStyle', valen)
            console.log(this.state)
        }
    }
}