const SERVER_URL: string = import.meta.env.VITE_SERVER_URL

const SIGNUP_URL: string = '/api/auth/signup'
const LOGIN_URL: string = '/api/auth/login'
const LOGOUT_URL: string = '/api/auth/logout'
const ADD_TODO: string = '/api/todos/add-todo'
const EDIT_TODO: string = '/api/todos/edit-todo'
const DELETE_TODO: string = '/api/todos/delete-todo'
const GET_TODOS: string = '/api/todos/get-todos'
const GET_USER:string = '/api/user/user-info'

export {SERVER_URL, SIGNUP_URL, LOGIN_URL, LOGOUT_URL, ADD_TODO, EDIT_TODO, DELETE_TODO, GET_TODOS, GET_USER}