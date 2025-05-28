/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type TodosType = Todo[]

export type TodoStateType = {
  todos: TodosType,
  todosLoading: boolean
}

export type UserStateType = {
  userInfo: User | null
  isUserLoading: boolean
  isUserError: boolean
}