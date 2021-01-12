import {storage} from '../core/utils'

const defaultState = {
  rowState: {},
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
  lastView: ''
}

const normalize = state => {

  let newState = {
    rowState: state.rowState,
    colState: state.colState,
    dataState: state.dataState,
    stylesState: state.stylesState,
    currentText: '',
    currentStyle: {   
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal'
    },
    currentTableName: state.currentTableName,
    lastView: state.lastView
  }

  return newState
} 

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState

  export const normalizeState = state => {
    return state ? normalize(state) : defaultState
  }