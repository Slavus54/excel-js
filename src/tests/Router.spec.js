import {Router} from '../core/routes/Router'
import {Page} from '../core/Page'

class Dashboard extends Page {
    getRoot() {
        const root = document.createElement('p')
        root.innerHTML = 'dashboard'
        return root
    }
}

class ExcelPage extends Page {

}

let root = document.createElement('div')

let router = new Router(root, {
    dashboard: Dashboard,
    excel: ExcelPage
})

describe('test router', () => {
    test('should be defined', () => {
        expect(router).toBeDefined()
    })

    test('routeer should render dashboard', () => {
        //router.changePageHandler()
        expect(root.innerHTML).toBe('<p>dashboard</p>')
    })
})