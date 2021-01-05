import {$} from '../../core/dom'

export function columnResizer(event) {
    const target = $(event.target)

    const parent = target.closest('[data-type="res"]')
            const coords = parent.getCords()
            let cells = document.querySelectorAll('.cell')
            let selectedCells = []

            for (let i = 0; i < cells.length; i++) {
               if (parent.el.dataset.index === cells[i].dataset.index) {
                    selectedCells.push(cells[i])
               }
            }


            
            

    document.onmousemove = e => {
        const delta = Math.floor(e.pageX - coords.right)
        let arren = {key: 'width', value: Math.floor(coords.width + delta) + 'px'}
        
        parent.css(arren)
        
        for (let i = 0; i < selectedCells.length; i++) {
            
            selectedCells[i].style.width = Math.floor(coords.width + delta) + 'px'
            selectedCells[i].children[0].classList.toggle('col-resize__active')
            selectedCells[i].children[0].classList.toggle('col-resize')
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        for (let i = 0; i < selectedCells.length; i++) {
            selectedCells[i].children[0].classList.toggle('col-resize')
        }
    }
}

export function rowResizer(event) {
    const target = $(event.target)
    const parent = target.closest('[data-type="res"]')
    const coords = parent.getCords()

    const indexes = parent.el.dataset.index
    const rowCells = document.querySelectorAll(`.row-data`)         

    document.onmousemove = e => {
        const delta = Math.floor(e.pageY - coords.y - 21)

        for (let i = 0; i < rowCells.length; i++) {
            if (rowCells[i].dataset.index === indexes) {
                let cur = rowCells[i]
                for (let j = 0; j < cur.children.length; j++) {
                   cur.children[j].style.height = Math.floor(coords.height + delta) + 'px'
                   cur.children[j].children[1].classList.toggle('row-resize__active')
                }
            }
        }
        let arren = {key: 'height', value: Math.floor(coords.height + delta) + 'px'}
        parent.css(arren)
    }

    document.onmouseup = () => {
        document.onmousemove = null
        for (let i = 0; i < rowCells.length; i++) {
            if (rowCells[i].dataset.index === indexes) {
                let cur = rowCells[i]
                for (let j = 0; j < cur.children.length; j++) {
                    cur.children[j].children[1].classList.toggle('row-resize')
                }
            }
        }
    }
}