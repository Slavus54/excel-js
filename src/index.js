import './module'
import './scss/index.scss'
import {storage, debounce} from './core/utils'
import {Excel} from './components/excel/Excel'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/Formula'
import {Table} from './components/table/Table'
import {Store} from './core/createStore'
import {rootReducer} from './redux/rootReducer'
import {initialState} from './redux/initialState'
import {Router} from './core/routes/Router' 
import {Dashboard} from './pages/Dashboard'
import {ExcelPage} from './pages/ExcelPage'

// const store = new Store(rootReducer, initialState)
new Router('#app', {
    dashboard: Dashboard,
    excel: ExcelPage
})
// const stateLis = debounce(state => {
//     console.log('App state'+JSON.stringify(state))
//     storage('excel-state', state)
// }, 300)

// store.subscribe(stateLis)

// const excel = new Excel('#app', {
//     components: [Header, Toolbar, Formula, Table],
//     store
// })

// excel.render()