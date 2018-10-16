import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';

import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'] 
  filtroActual: fromFiltro.filtrosValidos;
  pendietes: number;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    })
  }

  cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos) {
    const action = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(action);
  }

  contarPendientes(todos: Todo[]) {
    this.pendietes = todos.filter(todo => !todo.completado).length;
  }

  limpiarCompletados() {
    const action = new fromTodo.LimpiarCompletadosAction();
    this.store.dispatch(action);
  }

}
