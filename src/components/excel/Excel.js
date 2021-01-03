import {$} from '../../core/dom'

export class Excel {
    constructor(selector, opt) {
        this.$el = $(selector)
        this.components = opt.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        console.log($root)
        this.components = this.components.map(Component => {
            const el = $.create('div', Component.className)
            const comp = new Component(el)
            el.html(comp.toHTML())
            $root.append(el) 
            return comp
        })
        return $root
    }
    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(comp => comp.init())
        //this.components.forEach(comp => comp.remove())
    }
}