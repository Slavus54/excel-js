import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor (root) {
        super(root, {
            name: 'Table',
            listeners: []
        })
    }

    toHTML() {
        return createTable(10) 
    }
}