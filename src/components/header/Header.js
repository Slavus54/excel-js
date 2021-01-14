import {ExcelComponent} from '../../core/ExcelComponent'
import {storage} from '../../core/utils'
import {storag} from '../../redux/initialState'
import * as actions from '../../redux/actions'
import {storageName} from '../../core/LocalStorageSaver'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor (root, options) {
        super(root, {
            name: 'Header',
            listeners: ['input', 'click'],
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

    onClick(e) {
        if (e.target.textContent === 'delete') {
          
            deleteTable(this.param)
        } else {
            
           
        }
  
    }
 
    toHTML() {
        
        let state = storage(storageName(this.param))
        this.$dispatch(actions.setView(this.view))
        return `<input type="text" class="input" value="${state.currentTableName}" />
        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <a href="/"><i class="material-icons">exit_to_app</i></a>
            </div>
        </div>`
    }
}

function deleteTable(key) {
    
    localStorage.removeItem(`excel:${key}`)
} 