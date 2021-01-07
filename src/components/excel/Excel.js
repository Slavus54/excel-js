import {$} from '../../core/dom'
import {Emitter} from '../../core/Emitter'

export class Excel {
    constructor(selector, opt) {
        this.$el = $(selector)
        this.components = opt.components || []
        this.emmiter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        
        this.components = this.components.map(Component => {
            const el = $.create('div', Component.className)
            const comp = new Component(el, {
                emitter: this.emmiter
            })
           
            el.html(comp.toHTML())
            $root.append(el) 
            return comp
        })
        return $root
    }
    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(comp => comp.init())
        
    }

    remove() {
        this.components.forEach(comp => comp.remove())
    }
}