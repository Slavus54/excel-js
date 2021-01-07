import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
    constructor(root, opt = {}) {
        super(root, opt.listeners)
        this.name = opt.name
        this.emitter = opt.emitter
        this.unsubs = []
        this.prepare()
    }
    
    prepare() {
        
    }
    
    toHTML() {
        return ''
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubs.push(unsub)
    }

    init() {
        this.initDomListener()
        
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    remove() {
        this.removeDomListeners()
        this.unsubs.forEach(el => el())
    }
}