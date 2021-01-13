import {Store} from '../core/createStore'

const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
        return {...state, count: state.count + 1}
    }
    return state
}

const store = new Store(reducer, initialState)

describe('test store', () => {
    
    

    test('store init and returned not null', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).not.toBeNull()
    })

    test('should return object', () => {
        expect(store.getState()).toBeInstanceOf(Object)
    })

    test('should return default object', () => {
        expect(store.getState()).toEqual(initialState)
    })

    test('should change state if action exist', () => {
        store.dispatch({type: 'ADD'})
        expect(store.getState().count).toBe(1)
    })

    test('should not change state if action does not exist', () => {
        let count = store.getState().count
        store.dispatch({type: 'FUCK'})
        expect(store.getState().count).toBe(count)
    })

    test('should dispatch in async way', () => {
        return new Promise(resolve => {
            setTimeout(() => {
                store.dispatch({type: 'ADD'})
            }, 500)

            setTimeout(() => {
                expect(store.getState().count).toBe(2)
                resolve()
            }, 1000)
        })
    })
})