import axios from "axios";

// const BASED_URL = "https://jsonplaceholder.typicode.com";
const BASED_URL = "https://dummyjson.com";
const GITHUB_BASED_URL = "https://api.github.com/users/caisere";

// https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10

// API request to get github user
async function getGithubUser() {
    try {
        const response = await axios.get(`${GITHUB_BASED_URL}`);
        // console.log(response.data);
        return response.data;
    } catch {
        throw new Error("Failed to fetch github user");
    }
}

// getGithubUser();

// API requesst to get all todos with client side pagination
async function getTodos(pageParam = 1, limit = 10) {
    const skip = (pageParam - 1) * limit;
    try {
        const response = await axios.get(
        `${BASED_URL}/todos?limit=${limit}&skip=${skip}`
        );
        // console.log(response.data.todos);

        // get the total data from the API response
        const total = parseInt(response.headers["x-total-count"] || "200", 10);

        // return the data and the total
        return {
            data: response.data.todos,
            total,
        };
    } catch {
        throw new Error("Failed to fetch todos");
    }
}

// API Request to get a specific todo with the todo id
async function getEachTodo(id) {
    try {
        const response = await axios.get(`${BASED_URL}/todos/${id}`);
        // console.log(response.data);
        return response.data;
    } catch {
        throw new Error("Failed to fetch todo");
    }
}

// API Request to add a new todo
async function addTodo(todo) {
    try {
        const response = await axios.post(`${BASED_URL}/todos`, todo);
        return response.data;
    } catch {
        throw new Error("Failed to add todo");
    }
}

// API Request to update a todo using the todo id
async function updateTodo({ id, newTodo }) {
    try {
        const response = await axios.put(`${BASED_URL}/todos/${id}`, newTodo);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update todo: ${error.message}`);
    }
}

// API Request to delete a todo using the todo id
async function deleteTodo(id) {
    try {
        const response = await axios.delete(`${BASED_URL}/todos/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete todo");
    }
}

export {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    getGithubUser,
    getEachTodo,
};
