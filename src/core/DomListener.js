import {capitalize} from '../core/utils'

export class DomListener {
    constructor (root = null, listeners = []) {
        this.root = root
        this.listeners = listeners
    }

    initDomListener() {
        this.listeners.forEach(elem => {
            const method = getMethodName(elem)
            
            if (this[method]) {
                this[method] = this[method].bind(this)
                this.root.on(elem, this[method])
            }
          
        })
    }

    removeDomListeners() {
        this.listeners.forEach(elem => {
            const method = getMethodName(elem)
            
            if (this[method]) {
                this.root.remove(elem, this[method])
            }
            console.log(this.root)
        })
    }
}

function getMethodName (eventName) {
    return 'on'+capitalize(eventName)
}