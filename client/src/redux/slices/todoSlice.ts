import { ADD_TODO, DELETE_TODO, EDIT_TODO, GET_TODOS } from '@/utils/constants';
import protectedAxios from '../../services/axios';
import type { Todo, TodoStateType } from '../../types';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const initialState: TodoStateType = {
  todos: [],
  todosLoading: false,
};

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const response = await protectedAxios.get(GET_TODOS);
  return response.data;
});

export const addTodoAsync = createAsyncThunk('todos/add', async (title: string) => {
  const response = await protectedAxios.post(ADD_TODO, {title});
  return response.data; 
});

export const deleteTodoAsync = createAsyncThunk('todos/delete', async (_id: string) => {
  await protectedAxios.delete(`${DELETE_TODO}/${_id}`);
  return _id;
});

export const editTodoAsync = createAsyncThunk(
  'todos/edit',
  async ({ _id, title }: { _id: string; title: string }) => {
    console.log(_id, title);
    const response = await protectedAxios.patch(`${EDIT_TODO}/${_id}`, {title, action: 'edit'});
    return response.data;      
  }
);

export const completeTodoAsync = createAsyncThunk(
  'todos/complete',
  async ({ _id, completed }: { _id: string; completed: boolean }) => {
    const response = await protectedAxios.patch(`${EDIT_TODO}/${_id}`, { completed, action: 'complete'});
    return response.data;      
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     // === FETCH ===
    builder.addCase(fetchTodos.pending, (state) => {
      state.todosLoading = true;
    })
    .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.todosLoading = false;
      state.todos = action.payload;
    })
    .addCase(fetchTodos.rejected, (state) => {
      state.todosLoading = false;
      toast.error('Failed to fetch todos')
    })

    // === ADD ===
    .addCase(addTodoAsync.pending, (state) => {
      state.todosLoading = true;
    })
    .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.todosLoading = false;
      state.todos.push(action.payload);
      toast.success('Added todo successfully')
    })
    .addCase(addTodoAsync.rejected, (state) => {
      state.todosLoading = false;
      toast.error('Failed to add todo')
    })

    // === DELETE ===
    .addCase(deleteTodoAsync.pending, (state) => {
      state.todosLoading = true;
    })
    .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<string>) => {
      state.todosLoading = false;
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
      toast.success('Deleted todo successfully')
    })
    .addCase(deleteTodoAsync.rejected, (state) => {
      state.todosLoading = false;
      toast.error('Failed to delete todo')
    })

    // === EDIT ===
    .addCase(editTodoAsync.pending, (state) => {
      state.todosLoading = true;
    })
    .addCase(editTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.todosLoading = false;
      state.todos = state.todos.map(todo =>
        todo._id === action.payload._id ? action.payload : todo
      );
      toast.success('Updated todo successfully')
    })
    .addCase(editTodoAsync.rejected, (state) => {
      state.todosLoading = false;
      toast.error('Failed to update todo')
    })

        // === COMPLETE ===
    .addCase(completeTodoAsync.pending, (state) => {
      state.todosLoading = true;
    })
    .addCase(completeTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.todosLoading = false;
      state.todos = state.todos.map(todo =>
        todo._id === action.payload._id ? action.payload : todo
      );
      toast.success('Updated todo successfully')
    })
    .addCase(completeTodoAsync.rejected, (state) => {
      state.todosLoading = false;
      toast.error('Failed to update todo')
    });
  }
});

export default todoSlice.reducer;
