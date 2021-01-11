import {$} from '../../core/dom'

export class TableSelection {
    constructor () {
        this.group = []
        this.move = null
        this.start = null
    }

    selectOne(target) {
        target.classList.toggle('selected')
        this.clearAllBefore(this.group)
        this.group = []
        this.group.push(target)
        
    }
    
    selectGroup(start, end, root) {
        this.group = []
        const cols = this.range(start.dataset.index, end.dataset.index)
        const rows = this.range(start.dataset.row, end.dataset.row)
        let cells = document.querySelectorAll('.cell')
        cells.forEach(e => {
            e.classList.remove('selected')
        })

        const ids = cols.reduce((acc, col) => {
            rows.forEach(row => {
                acc.push(`${row}:${col}`)
            })
            return acc
        }, [])
  

        let arrs = ids.map(id => root.find([`[data-id="${id}"]`]))
   
        arrs.forEach(e => {
            e.classList.add('selected')
            this.group.push(e)
        })
       
    }

    addStyle(style) {
        this.group.forEach(el => {
            let key = Object.keys(style)
            let valen = Object.values(style)
            $(el).css({key, value: valen})
        })
    }

    clearAllBefore(list) {
        list.forEach(el => {
            el.classList.remove('selected')
        })
        list = []
    }

    getIds() {
        return this.group.map(el => {
            return el.dataset.id
        })
    }

    // moveOne(target, code, root) {
    //     if (code === 13) {
    //         if (target !== this.start) {
    //             this.move = target
    //         }
    //         this.start = target            
    //         if (this.move !== null) {
                
    //             let row = this.move.dataset.id.split(':')[0]
    //             let col = this.move.dataset.id.split(':')[1]
    //             col++
                
    //             let item = root.find(`[data-id="${row}:${col}"]`)
    //             item.classList.toggle('selected')
    //             this.move = item
                
    //         } else {
    //             let id = this.start.dataset.id
    //             let row = id.split(':')[0]
    //             let col = id.split(':')[1]
    //             col++
                
    //             let item = root.find(`[data-id="${row}:${col}"]`)
    //             item.classList.toggle('selected') 
    //             this.move = item
    //         }
            
    //     }
    // }

    clearMove(target) {

        target.classList.toggle('cell') 
    }

    range(start, end) {
        if (end < start) {
            [end, start] = [start, end]
        }
        return new Array(end - start + 1)
                        .fill('')
                        .map((_, index) => parseInt(start) + parseInt(index))
    }
}