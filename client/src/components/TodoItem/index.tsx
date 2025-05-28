import { Button, Input } from '../ui';
import type {Todo} from '../../types';
import { useRef, useState} from 'react';
import { Pencil, Save, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { editTodoAsync, deleteTodoAsync, completeTodoAsync } from '@/redux/slices/todoSlice';

type TodoItemType = {
  todo: Todo
}

const TodoItem: React.FC<TodoItemType> = ({todo}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {todosLoading} = useAppSelector((state) => state.todo);

  const handleDelete: (_id: string) => void = (_id) => {
    if (_id) dispatch(deleteTodoAsync(_id))
  };

  const handleEditAndSave: (_id: string) => void = (_id) => {
    if(!isEditing){
      inputRef.current?.focus();
      setIsEditing(true);
    }else{
      setIsEditing(false);
      dispatch(editTodoAsync({_id, title: todoTitle}))
    }
  };

  const handleComplete: (_id: string) => void = (_id) => {
    if (_id) dispatch(completeTodoAsync({_id, completed: !todo.completed}))
  };

  return (
    <div className={`w-full flex items-center p-2 gap-2 rounded-md ${todo.completed ? 'bg-green-300' : 'bg-indigo-300'}`}>
      <Input
        type="checkbox"
        checked={todo.completed}
        className="size-4"
        onChange={() => handleComplete(todo._id)}
      />
      <input
        type="text"
        ref={inputRef}
        value={todoTitle}
        readOnly={!isEditing}
        disabled={todo.completed}
        className={`w-full px-2 py-1 text-lg! text-gray-900! border-none! rounded-md focus:outline-none! focus:ring-2! focus:ring-indigo-400! focus:border-indigo-600! transition-all! duration-200! ease-in-out! ${todo.completed ? 'line-through bg-green-300' : ''}`}
        onChange={(e): void => setTodoTitle(e.target.value)}
      />
      <Button
        type="button"
        className="size-7 p-2 bg-indigo-500 hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-gray-600"
        disabled={todo.completed || todosLoading}
        onClick={(): void => handleEditAndSave(todo._id)}
      >
        {isEditing ? <Save /> : <Pencil />}
      </Button>
      <Button
        type="button"
        className="size-7 p-2 bg-indigo-500 hover:bg-red-500"
        disabled={todosLoading}
        onClick={(): void => handleDelete(todo._id)}>
        <Trash2 />
      </Button>
    </div>
  );
};

export default TodoItem;
