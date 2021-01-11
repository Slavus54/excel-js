import {TABLE_RESIZE, ROW_RESIZE, CHANGE_TEXT, APPLY_STYLE, CURRENT_CELL, SET_TABLENAME} from './types'

export function TableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function RowResize(data) {
    return {
        type: ROW_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeCurrSt(data) {
    return {
        type: CURRENT_CELL,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function setTableName(data) {
    return {
        type: SET_TABLENAME,
        data
    }
}