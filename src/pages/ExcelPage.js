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
import {LocalStorageSaver} from '../core/LocalStorageSaver'

 

class StateProcessor {
    constructor(saver, delay = 300) {
        this.saver = saver
        this.listen = debounce(this.listen.bind(this), delay)
    }

    listen(state) {
        this.saver.save(state)
    }

    get() {
        return this.saver.get()
    }
}



export class ExcelPage extends Page {
    constructor(param) {
        super(param)
        this.storeSub = null
        this.processor = new StateProcessor(
            new LocalStorageSaver(this.params)
        )
    }       
    async getRoot() {
        // const state = storage(storageName(this.params))
        const state = await this.processor.get()
 
        const store = new Store(rootReducer, normalizeState(state))
       
        // const stateLis = debounce(state => {
        //     console.log('App state'+JSON.stringify(state))

        //     storage(storageName(this.params), state)
        // }, 300)
        
        console.log(this.params)
        this.storeSub = store.subscribe(this.processor.listen)

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
        this.storeSub.unsubscribe()
    }
}