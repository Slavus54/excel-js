const codes = {
    A: 65,
    Z: 90
}

function createCell(content, row) {
    return function (_, i) {
        return `
            <div class="cell" contenteditable data-type="cell" data-index=${i} data-row=${row} data-id=${row}:${i}>
                ${content}
                <div class="col-resize" data-resize="cell"></div>
                <div class="row-resize" data-resize="cell"></div>
            </div>  
            `
    }
    
}

function createCol(content, i) {
    return `
        <div class="column" data-type="res" data-index=${i}>
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, i = '') {
    const resizer = i || i === 0 ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
    <div class="row" data-type="res" data-index=${i}>
    <div class="row-info">
        ${typeof i === 'number' ?  i + 1 : ''}
        ${resizer}
    </div>
    <div class="row-data" data-index=${i}>
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
    }).map((el, i) => createCol(el, i)).join('')

    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const newCols = new Array(colsCont).fill('').map(createCell('', row)).join('')
        rows.push(createRow(newCols, row))
    }
    
    return rows.join('')
}