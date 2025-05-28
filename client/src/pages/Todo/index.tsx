import TodoForm from '../../components/TodoForm';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {Card} from '../../components/ui/card';
import TodoItem from '../../components/TodoItem';
import type {Todo} from '../../types'
import { useEffect, type JSX } from 'react';
import { fetchTodos } from '@/redux/slices/todoSlice';
import Spinner from '@/components/Loader/Spinner';

const TodosPage = () => {
  const {todos, todosLoading} = useAppSelector((state) => state.todo)
  const dispatch = useAppDispatch()

  useEffect(()=> {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <main className="h-screen mx-auto bg-gray-900 flex justify-center">
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl py-10 flex flex-col items-center gap-10">
        <TodoForm />
        {todosLoading ? <Spinner /> :         
          <Card className='w-full flex flex-col gap-4 bg-gray-900 border-none py-0'>
            {todos?.length > 0 &&
              todos.map(
                (todo: Todo): JSX.Element => (
                  <TodoItem todo={todo} key={todo._id}/>
                )
            )}
          </Card>
        }
      </div>
    </main>
  );
}

export default TodosPage