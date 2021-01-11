import {ExcelComponent} from '../../core/ExcelComponent'
import {storage} from '../../core/utils'
import * as actions from '../../redux/actions'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor (root, options) {
        super(root, {
            name: 'Header',
            listeners: ['input'],
            subscribe: ['currentTableName'],
            ...options
        })
    }

    storeChanged(data) {
        console.log(data.currentTableName)
    } 
    
    onInput(e) {
        console.log(e.target.value)
        this.$dispatch(actions.setTableName(e.target.value))
    }

    toHTML() {
        let state = storage('excel-state')

        return `<input type="text" class="input" value="${state.currentTableName}" />
        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>`
    }
}