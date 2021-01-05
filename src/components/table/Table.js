import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {$} from '../../core/dom'
import {columnResizer, rowResizer} from './table.resizer'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor (root) {
        super(root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        })
    }

    toHTML() {
        return createTable(10) 
    }

    onClick() {
        //console.log('table click')
    }

    onMousedown(event) {
        if (event.target.dataset.resize === 'col') {

            columnResizer(event)

        } else if (event.target.dataset.resize === 'row') {
            rowResizer(event)
        }
    }

    onMousemove(event) {
     
       
    }

    onMouseup() {
 
    }
}