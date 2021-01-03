const codes = {
    A: 65,
    Z: 90
}

function createCell(content) {
    return `
    <div class="cell" contenteditable>
        ${content}
    </div>  
    `
}

function createCol(content) {
    return `
        <div class="column">
            ${content}
        </div>
    `
}

function createRow(content, i = '') {
    return `
    <div class="row">
    <div class="row-info">
        ${typeof i === 'number' ?  i + 1 : ''}
    </div>
    <div class="row-data">
        ${content}
    </div>
    </div>
    `
} 

export function createTable(rowsCount = 15) {
    const colsCont = codes.Z - codes.A + 1
    const rows = []

    const cols = new Array(colsCont).fill('').map((el, index) => {
        return String.fromCharCode(codes.A + index)
    }).map(createCol).join('')

    rows.push(createRow(cols))
    
    for (let i = 0; i < rowsCount; i++) {
        const newCols = new Array(colsCont).fill('').map((el) => createCell('')).join('')
        rows.push(createRow(newCols, i))
    }
    
    return rows.join('')
}