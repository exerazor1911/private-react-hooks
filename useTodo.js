import { useReducer, useEffect } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodo = () => {

    const initialState = [//{
        //     id: new Date().getTime(),
        //     description: 'Recolectar la piedra del alma',
        //     done: false,
        // },
        // {
        //     id: new Date().getTime() * 3,
        //     description: 'Recolectar la piedra del tiempo',
        //     done: false,
        // }
        ];

        const init = () => {
            return JSON.parse(localStorage.getItem('todos')) || []
        }

        const [todos, dispatch] = useReducer(todoReducer, initialState, init);


        useEffect(() => {
            localStorage.setItem('todos', JSON.stringify(todos));
      
          }, [todos])


        const handleNewTodo = (todo) => {
            const action = {
                type: '[TODO] Add Todo',
                payload: todo
            }
        
            dispatch(action);
        }

        const handleRemoveTodo = (id) => {
            const action = {
                type: '[TODO] Remove Todo',
                payload: id
            }

            dispatch(action);
        }

        const handleToggleTodo = (id) => {
            dispatch({
                type: '[TODO] Toggle Todo',
                payload: id
            })
        }

        let todosCount = todos.length;
        let pendingTodosCount= todos.filter(todo => !todo.done).length;

        return {
            todos,
            handleNewTodo,
            handleRemoveTodo,
            handleToggleTodo,
            todosCount,
            pendingTodosCount
        }

}
