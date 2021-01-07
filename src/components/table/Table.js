import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {$} from '../../core/dom'
import {columnResizer, rowResizer} from './table.resizer'
import {TableSelection} from './TableSelection ' 

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor (root, options) {
        super(root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup', 'keydown', 'input'],
            ...options
        })
        this.curSel = null
        this.curSelValue = ''
        
    }

    prepare() {
        this.selector = new TableSelection()
    }

    toHTML() {
        return createTable(10) 
    }

    init() {
        super.init()
        let cell = this.root.find('[data-id="0:0"]')
        this.curSel = cell
        this.selector.selectOne(cell)
        this.$on('formula:input', text => {
            let row = this.curSel.dataset.id.split(':')[0]
            let col = this.curSel.dataset.id.split(':')[1]
            const cur = this.root.find([`[data-id="${row}:${col}"]`])
            cur.textContent = text
           
        })
        this.$on('formula:done', () => {
            console.log('Yes')
            this.curSel.focus()
        })
    }


    deleteSelect(target) {
        if (target !== null) {
            target.classList.toggle('cell')
        }
    }

    onClick(e) {
          
    }

    onMousedown(event) {
        if (event.target.dataset.resize === 'col') {

            columnResizer(event)

        } else if (event.target.dataset.resize === 'row') {
            rowResizer(event)
        } else if (event.target.dataset.type === 'cell') {
            if (event.shiftKey === true) {
                const started = event.target
                this.curSelValue = ''
                document.onmouseup = e => {
                    this.selector.selectGroup(started, e.target, this.root)
                }
            } else if (event.target.dataset.type === 'cell') {
                this.deleteSelect(this.curSel)
                this.curSelValue = ''
                this.curSel = event.target 
                console.log(event)
                this.selector.selectOne(event.target)
            }

            
        }
    }

    onMousemove(event) {
     
       
    }

    onMouseup() {

    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = e
        if (keys.includes(key) && !e.shiftKey) {
            e.preventDefault()
            let movementData = this.curSel.textContent
            this.curSelValue = ''
            this.$emit('table:move-value', movementData)
            
            let row = this.curSel.dataset.id.split(':')[0]
            let col = this.curSel.dataset.id.split(':')[1]
            const next = this.root.find(nextSel(key, row, col))
            this.selector.selectOne(next)
            next.focus()
            this.curSel = next
        }
    }

    onInput(event) {
        
        this.curSelValue += event.data
        this.$emit('table:move-input', {value: this.curSelValue, place: this.curSel})
        console.log(this.curSelValue)
    }
}

function nextSel(key, row, col) {
    const minVal = 0
    switch(key) {
        case 'Enter':
        case 'ArrowDown': 
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < minVal ? minVal : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < minVal ? minVal : row - 1
            break
    }

    return [`[data-id="${row}:${col}"]`]
}