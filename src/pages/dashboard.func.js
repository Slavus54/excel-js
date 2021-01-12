export function toHTML(el, data) {
    let date = el.split(':')[1]
    let newDate = ''
    if (date !== undefined) {
        newDate = date.split('-').join(':')
    }
     
    return `
    <li class="db__record">
        <a href="/#excel/${el.split('excel:')[1] || ''}">Таблица id: ${el.split(':')[1] || 'simple'}</a>
        <strong>Last view: ${data.lastView || ''}</strong>
        <strong>Date of creation: ${newDate || ''}</strong>
    </li>
    `
}

export function getKeys() {
    let arr = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
     
        if (key.includes('excel:')) {
            let val = JSON.parse(localStorage.getItem(key))
            let obj = {
                index: key,
                data: val
            }
            arr.push(obj)
        }
        
        if (!key.includes('excel')) {
            continue
        }
    
        // keys.push(val)
        
    }
   
    return arr
}

export function createRecords() {
    let keys = getKeys()
    console.log(keys)
    if (!keys.length) {
        return `<h2>Вы пока не создали ни одной таблицы</h2>`
    } else {
        return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
  
        <ul class="db__list">
        ${keys.map((el) => toHTML(el.index, el.data)).join('')}
        </ul>
    `
    }
   
    
    
    
}