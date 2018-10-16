import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Kurohige');
const todo2 = new Todo('Llegar a Raftel');

todo1.completado = true;


const estadoInicial: Todo[] = [
    todo1, todo2
];

export function todoReducer(state = estadoInicial, action: fromTodo.Actions): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo];

        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit
                }
            });

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todo => {
                return {
                    ...todo,
                    completado: action.completado
                };
            })

        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit
                }
            });
        
        case fromTodo.BORRAR_TODO:
            return state.filter(todo => todo.id !== action.id);

        case fromTodo.LIMPIAR_COMPLETAODS:
            return state.filter(todo => !todo.completado);    

        default:
            return state
    }
}