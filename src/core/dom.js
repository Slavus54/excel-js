class Dom {
    constructor (selector) {
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