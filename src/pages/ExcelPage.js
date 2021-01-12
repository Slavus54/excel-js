import {Page} from '../core/Page'
import {$} from '../core/dom'
import {debounce, storage} from '../core/utils'
import {Excel} from '../components/excel/Excel'
import {Header} from '../components/header/Header'
import {Toolbar} from '../components/toolbar/Toolbar'
import {Formula} from '../components/formula/Formula'
import {Table} from '../components/table/Table'
import {Store} from '../core/createStore'
import {rootReducer} from '../redux/rootReducer'
import {normalizeState} from '../redux/initialState'


export function storageName(param) {
    return 'excel:' + param 
}   

export class ExcelPage extends Page {
    getRoot() {
        const state = storage(storageName(this.params))
 
        const store = new Store(rootReducer, normalizeState(state))
        const stateLis = debounce(state => {
            console.log('App state'+JSON.stringify(state))

            storage(storageName(this.params), state)
        }, 300)
        
        console.log(this.params)
        store.subscribe(stateLis)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot(this.params)
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
      
    }
}