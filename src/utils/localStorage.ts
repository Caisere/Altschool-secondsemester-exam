import type { TodoInfo } from "../types";


interface Todo {
    id: string;
    todo: string;
    completed: boolean;
    userId: number;
}

// Local storage key for todos
const LOCAL_TODOS_KEY = "local_todos";

// Get all todos from localStorage
export const getLocalTodos = (): TodoInfo[] => {
    const todos = localStorage.getItem(LOCAL_TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
};


// function to generate a unique id for each new local todo
export const getNextLocalTodoId = () => {
    const localTodos = getLocalTodos();
    console.log(localTodos)
    if (localTodos.length === 0) return "local-1";
    const lastId = localTodos[localTodos.length - 1].id as string;
    console.log(lastId)
    const nextId = lastId.split("-")[1] + 1;// split (local, 1) at index 1 convert to number  + 1
    return `local-${nextId}`;  // return (local-nextId)
};


// function to add the newly created todo to localStorage
export const addLocalTodo = async (todo: TodoInfo): Promise<Todo> => {

     // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const todos = getLocalTodos();
    const newTodo = {
        ...todo,
        id: getNextLocalTodoId(), // get generated id from getNextLocalTodoId function
    };
    todos.push(newTodo);
    localStorage.setItem(LOCAL_TODOS_KEY, JSON.stringify(todos)); // update the local storage with the new todo
    return newTodo;
};

// function to get a specific todo from localStorage for todo details routing 
export const getLocalTodoById = (id: string) => {
    const todos = getLocalTodos();
    return todos.find((todo) => todo.id === id);
};



// // function to update newly created todo (or local storage todos) 
// export const updateLocalTodo = (id, updatedTodo) => {
//     const todos = getLocalTodos();
//     const index = todos.findIndex((todo) => todo.id === id); // return 1 if found and -1 if not found
//     if (index !== -1) { // if found update the todo
//         todos[index] = { ...todos[index], ...updatedTodo };
//         localStorage.setItem(LOCAL_TODOS_KEY, JSON.stringify(todos)); // update the local storage with the updated todos
//         return todos[index];
//     }
//     return null;
// };

// // Delete a todo from localStorage
// export const deleteLocalTodo = (id: string) => {
//     const todos = getLocalTodos();
//     const filteredTodos = todos.filter((todo) => todo.id !== id);
//     localStorage.setItem(LOCAL_TODOS_KEY, JSON.stringify(filteredTodos)); // update the local storage with the filtered todos
// };
