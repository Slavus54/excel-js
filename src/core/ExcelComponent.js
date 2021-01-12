import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
    constructor(root, opt = {}) {
        super(root, opt.listeners)
        this.name = opt.name
        this.emitter = opt.emitter
        this.store = opt.store
        this.storeSub = null
        this.unsubs = []
        this.subscribe = opt.subscribe || []
        this.param = opt.param
        this.view = opt.view
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

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    }

    storeChanged() {}
    remove() {
        this.removeDomListeners()
        this.unsubs.forEach(el => el())
        this.storeSub.unsubscribe()
    }
}