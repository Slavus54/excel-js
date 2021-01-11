import {stylesToString} from '../../core/utils' 
import {parse} from '../../core/parse'

const codes = {
    A: 65,
    Z: 90
}

function getWidth (state, i) {
    return (state[i] || 120) + 'px'
}

function getHeight (state, i) {
    return (state[i] || 24) + 'px'
}

function createCell(content, row, colState, dataState, stylesState) {
    return function (_, i) {
        let iden = row+':'+i
        let def = {
            textAlign: 'left',
            fontWeight: 'normal',
            textDecoration: 'none',
            fontStyle: 'normal'
        }
        let styles = stylesToString({...def, ...stylesState[iden]})
        if (colState[i] !== undefined) {
            return `
            <div class="cell" contenteditable data-type="cell" data-index=${i} data-row=${row} data-id=${row}:${i} style="${styles}; width: ${getWidth(colState, i)}" data-value=${ dataState[iden] || content}>
                ${dataState[iden] !== undefined && typeof dataState[iden] === 'string' ? parse(dataState[iden]) : parse(content)}
                <div class="col-resize" data-resize="cell"></div>
                <div class="row-resize" data-resize="cell"></div>
            </div>  
            ` 
        } else {
            return `
            <div class="cell" contenteditable data-type="cell" data-index=${i} data-row=${row} data-id=${row}:${i} data-value=${ dataState[iden] || content}>
                ${dataState[iden] !== undefined && typeof dataState[iden] === 'string' ? parse(dataState[iden]) : parse(content)}
                <div class="col-resize" data-resize="cell"></div>
                <div class="row-resize" data-resize="cell"></div>
            </div>  
            `
        }
      
    }
    
}

function createCol(content, i, width) {
    // let finden = null

    // for (let item in colState) {
       
    //     if (item == i) {
    //         let colen = `
    //         <div class="column" data-type="res" data-index=${item} data-width=${colState[item]}>
    //             ${content}
    //             <div class="col-resize" data-resize="col"></div>
    //         </div>
    //         `
    //         return colen

    //     }
    // } 

    return `
    <div class="column" data-type="res" data-index=${i} style="width: ${width}">
        ${content}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(content, i = '', height) {

    const resizer = i || i === 0 ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
    <div class="row" data-type="res" data-index=${i} style="height: ${height}">
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

export function createTable(rowsCount = 15, {colState, rowState, dataState, stylesState}) {
    const colsCont = codes.Z - codes.A + 1
    const rows = []
    console.log(rowState)

    const cols = new Array(colsCont).fill('').map((el, index) => {
        return String.fromCharCode(codes.A + index)
    }).map((el, i) => {
        const width = getWidth(colState, i)
        return createCol(el, i, width)
    }).join('')

    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const newCols = new Array(colsCont).fill('').map(createCell('', row, colState, dataState, stylesState)).join('')
        const height = getHeight(rowState, row)
        
        rows.push(createRow(newCols, row, height))
    }
    
    return rows.join('')
}