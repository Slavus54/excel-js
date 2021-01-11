import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {$} from '../../core/dom'
import {columnResizer, rowResizer} from './table.resizer'
import {TableSelection} from './TableSelection '
import * as actions from '../../redux/actions' 
import {storage} from '../../core/utils'
import {parse} from '../../core/parse'

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
        let state = storage('excel-state')
        return createTable(10, state) 
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
            this.$dispatch(actions.changeText({
                id: this.curSel.dataset.id,
                value: text
            }))
            this.curSel.attr('data-value', text).text(parse(text))
        })
  
        this.$on('formula:done', (e) => {
            let text = this.curSel.textContent
            this.curSel.textContent = parse(text)
            this.curSel.focus()
            console.log(e.path[0])
            e.path[0].textContent = ''
            console.log('Yes')
        })

        this.$on('toolbar:addStyle', style => {
            console.log(style)
            this.selector.addStyle(style)
            this.$dispatch(actions.applyStyle({
                value: style,
                ids: this.selector.getIds()
            }))
        })

       

        rerender()
    }


    deleteSelect(target) {
        if (target !== null) {
            target.classList.toggle('cell')
        }
    }

    onClick(e) {
          
    }

    async resizeCol(e) {
        const data = await columnResizer(e)
        console.log('res data'+ data.id)
        this.$dispatch(actions.TableResize(data))
    }

    async resizeRow(e) {
        const data = await rowResizer(e)
        console.log('res data'+ data.value)
        this.$dispatch(actions.RowResize(data))
    }

    onMousedown(event) {
        if (event.target.dataset.resize === 'col') {
            this.resizeCol(event)
            

        } else if (event.target.dataset.resize === 'row') {
            this.resizeRow(event)
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
                let currenen = $(event.target)
                let movementData = this.curSel.textContent 
                this.$emit('table:move-value', movementData)
                const styles = currenen.getStyles(Object.keys({
                    textAlign: 'left',
                    fontWeight: 'normal',
                    textDecoration: 'none',
                    fontStyle: 'normal'
                }))
                this.$dispatch(actions.changeCurrSt(styles))
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
        this.$dispatch(actions.changeText({
            id: this.curSel.dataset.id,
            value: this.curSelValue
        }))
        //this.$emit('table:move-input', {value: this.curSelValue, place: this.curSel})
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

function rerender() {
   let cols = document.querySelectorAll('.column')

   cols.forEach(el => {
       if (el.dataset.width !== undefined) {
           el.style.width = el.dataset.width + 'px'
       }
   })
}