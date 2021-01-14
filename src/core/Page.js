export class Page {
    constructor (params) {
        this.params = params || new Date().toISOString()
    }

    getRoot() {
       
        throw new Error('getRoot should be implemented')
    }

    afterRender() {

    }

    destroy() {

    }
}