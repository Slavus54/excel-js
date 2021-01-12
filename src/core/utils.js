export function capitalize(str = '') {
    if (typeof str !== 'string') {
        return ''
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key)) || localStorage.setItem(key, JSON.stringify({rowState: {},
            colState: {},
            dataState: {},
            stylesState: {},
            currentText: '',
            currentStyle: {   
              textAlign: 'left',
              fontWeight: 'normal',
              textDecoration: 'none',
              fontStyle: 'normal'
            },
            currentTableName: 'New table',
            lastView: ''}))
    }

    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function stylesToString(styles = {}) {
    return Object.keys(styles).map(el => `${camelToDash(el)}: ${styles[el]}`).join(';')
}

export function debounce(fn, wait) {
    let timeout

    return function (...args) {
        let later = () => {
            clearTimeout(timeout)
            fn.apply(this, args) // save context
            // fn(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}