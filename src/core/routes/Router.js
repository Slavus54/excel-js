import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'
import {Loader} from '../../components/Loader'

export class Router {
    constructor(sel, routes) {
        if (!sel) {
            throw new Error('Selector is not provided')
        }
        this.placeholder = $(sel)
        this.routes = routes
        this.loader = new Loader()
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    async changePageHandler(e) {
        
        if (this.page) {
            this.page.destroy()
        }
        this.placeholder.append(this.loader)

        let Page = ActiveRoute.path === '' ? this.routes.dashboard : this.routes.excel
        
        if (ActiveRoute.path === '') {
            this.page = new Page(ActiveRoute.param)
            let root = await this.page.getRoot()
            let node = document.querySelector('.loader')
            
            this.placeholder.append(root)
            if (node) {
                this.placeholder.removeNode(node)
            }  
        } else if (ActiveRoute.path.includes('excel')) {
            let node = document.querySelector('.db')
            let nodeL = document.querySelector('.loader')
            if (node && nodeL) {
                this.placeholder.removeNode(node)
            }   
        

            this.page = new Page(ActiveRoute.param)
            let root = await this.page.getRoot()
            this.placeholder.append(root)
            this.placeholder.removeNode(nodeL)
            this.page.afterRender()
            
        }
     
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}