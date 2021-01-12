import {$} from '../../core/dom'
import {Emitter} from '../../core/Emitter'
import {StoreSubscriber} from '../../core/StoreSubscriber'

export class Excel {
    constructor(opt) {
        this.components = opt.components || []
        this.emmiter = new Emitter()
        this.store = opt.store
        this.subscriber = new StoreSubscriber(opt.store)
    }

    getRoot(param) {
        const $root = $.create('div', 'excel')
        
        this.components = this.components.map((Component, i) => {
            const el = $.create('div', Component.className)
            const comp = new Component(el, {
                emitter: this.emmiter,
                store: this.store,
                param,
                view: new Date().toISOString()
            })
           
            el.html(comp.toHTML())

        
            $root.append(el) 
            return comp
        })
        return $root
    }
    
    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', e => {
                e.preventDefault()
            })
        }
        this.subscriber.subscribeComponents(this.components)
       
        this.components.forEach(comp => comp.init())
        
    }

    remove() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(comp => comp.remove())
        document.removeEventListener('contextmenu', e => {
            e.preventDefault()
        })
    }
}