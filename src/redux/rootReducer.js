import {TABLE_RESIZE, ROW_RESIZE, CHANGE_TEXT, APPLY_STYLE, CURRENT_CELL, SET_TABLENAME, SET_VIEW} from './types'
import {stylesToString} from '../core/utils'

export function rootReducer (state, action) {
    switch(action.type) {
        case TABLE_RESIZE:
            let prevState = state.colState || {}
            prevState[action.data.id] = action.data.value
            return {...state, colState: prevState}

        case ROW_RESIZE:
            let prevRowState = state.rowState || {}
            prevRowState[action.data.id] = action.data.value
            return {...state, rowState: prevRowState}

        case CHANGE_TEXT: 
            let oldDataState = state.dataState || {}
            oldDataState[action.data.id] = action.data.value
            return {...state, currentText: action.data.value, dataState: oldDataState}

        case APPLY_STYLE:
            const prev = state.stylesState || {}

            action.data.ids.forEach(el => {
                prev[el] = {...prev[el], ...action.data.value}
            })
            return {...state, stylesState: prev, currentStyle: {...state.currentStyle, ...action.data.value}}
        
        case CURRENT_CELL:
            return {...state, currentStyle: action.data}

        case SET_TABLENAME:
            return {...state, currentTableName: action.data}

        case SET_VIEW:
                return {...state, lastView: action.data}
        default: return state
    }
}