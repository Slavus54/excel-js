import {Page} from '../core/Page'
import {$} from '../core/dom'
import {createRecords} from './dashboard.func'

export class Dashboard extends Page {
    getRoot() {
      const now = new Date().toISOString()
        return $.create('div', 'db').html(`
       
    
        <div class="db__header">
          <h1>Excel Панель управления</h1>
        </div>
  
        <div class="db__new">
          <div class="db__view">
            <a href="#excel/${now}" class="db__create">
              Новая <br /> Таблица
            </a>
          </div>
        </div>
  
        <div class="db__table db__view">
  
          ${createRecords()}
  
        </div>
  

        `)
    }

    destroy() {
        console.log('destroy')
    }
}