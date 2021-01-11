// export function createStore(rootReducer, initialState = {}) {
//     let state = rootReducer({...initialState}, {type: 'init'})
//     let listeners = []
    
    
//     return {
//         subscribe(fn) {
//             listeners.push(fn)
//             return {
//                 unsubscribe: () => {
//                     listeners = listeners.filter(el => el !== fn)
//                 }
//             }
                
//         },
//         dispatch(action) {
//             state = rootReducer(state, action)
//             listeners.forEach(lis => lis(state))
//         },
//         getState() {
//             return state
//         }
//     }
// }

export class Store {
    constructor(rootReducer, initialState = {}) {
        this.state = rootReducer({...initialState}, {type: 'init'})
        this.rootReducer = rootReducer
        this.listeners = []
    }

    subscribe(fn) {
        this.listeners.push(fn)

        return {
            unsubscribe: () => {
                this.listeners = this.listeners.filter(el => el !== fn)
            }
        }
    }

    dispatch(action) {
        this.state = this.rootReducer(this.state, action)
        this.listeners.forEach(lis => lis(this.state))
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state))
    }
}