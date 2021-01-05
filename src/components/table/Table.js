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
        // if (this.curCol !== null) {
        //     this.diffX = event.clientX - this.curX
        //     let styles = getComputedStyle(this.curCol)
        //     let done = styles.width.split('').filter(el => el !== 'p')
        //     let donen = done.filter(el => el !== 'x')
        //     donen = donen.join('')
        //     let finish = Math.floor(parseInt(donen) + parseInt(this.diffX)).toString()
        //     this.curCol.style.width = finish + 'px'
        // }
       
    }

    onMouseup() {
        //console.log('table mouseup')
    }
}