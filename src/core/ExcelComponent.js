import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
    constructor(root, opt = {}) {
        super(root, opt.listeners)
        this.name = opt.name
    }
    
    toHTML() {
        return ''
    }

    init() {
        this.initDomListener()
        
    }

    remove() {
        this.removeDomListeners()
    }
}