import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'

export class Router {
    constructor(sel, routes) {
        if (!sel) {
            throw new Error('Selector is not provided')
        }
        this.placeholder = $(sel)
        this.routes = routes
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler(e) {
        
        if (this.page) {
            this.page.destroy()
        }
        let Page = ActiveRoute.path === '' ? this.routes.dashboard : this.routes.excel
        
        if (ActiveRoute.path === '') {
            this.page = new Page(ActiveRoute.param)

            this.placeholder.append(this.page.getRoot())
        } else if (ActiveRoute.path.includes('excel')) {
            let node = document.querySelector('.db')
            if (node) {
                this.placeholder.removeNode(node)
            }   
        

            this.page = new Page(ActiveRoute.param)

            this.placeholder.append(this.page.getRoot())

            this.page.afterRender()
            
        }
     
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}