class Dom {
    constructor (selector) {
        this.sel = selector
        this.el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.el.innerHTML = html
            
            return this
        }
        return this.el.outerHTML
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, fn) {
        this.el.addEventListener(eventType, fn)
    }

    remove(eventType, fn) {
        this.el.removeEventListener(eventType, fn)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.el
        }
        if (Element.prototype.append) {
            this.el.append(node)
        } else {
            this.el.appendChild(node)
        }
    }

    closest(sel) {
        return $(this.el.closest(sel))
    }

    getCords() {
        return this.el.getBoundingClientRect()
    }

    css(styles) {
        this.el.style[styles.key] = styles.value
    }

    getStyles(styles = []) {
        return styles.reduce((res, c) => {
            res[c] = this.el.style[c]
            return res
        }, {})
    }

    find (selector) {
        return this.el.querySelector(selector)
    }

    focus() {
        this.el.focus()
        return this
    }

    text(text) {
        if (typeof text === 'string') {
            this.el.textContent = text
            return this
        }
        return this.el.textContent.trim()
    }   

    attr(name, value) {
        if (value) {
            this.el.setAttribute(name, value)
            return this
        }
        return this.el.getAttribute(name)
    }

    removeNode(node) {
        this.el.removeChild(node)
    }
}

export function $(sel) {
    return new Dom(sel)
}

$.create = (tagname, classes='') => {
    const el = document.createElement(tagname)

    if (classes) {
        el.classList.add(classes)
    }

    return $(el)
}