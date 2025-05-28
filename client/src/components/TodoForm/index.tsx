import {useState, type FormEvent} from 'react'
import { Input, Button } from '../ui'
import { useAppDispatch } from '@/redux/hooks'
import { addTodoAsync } from '../../redux/slices/todoSlice'

const TodoForm = () => {
    const [todo, setTodo] = useState<string>("")
    const dispatch = useAppDispatch()

  const handleSubmit: (e: FormEvent) => void = (e) => {
    e.preventDefault()
    dispatch(addTodoAsync(todo))
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center justify-between gap-4">
      <Input
        type="text"
        placeholder="Write todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="md:w-4/5 text-md! text-white! border-1! border-indigo-300 rounded-md focus:outline-none! focus:ring-2! focus:ring-indigo-400! focus:border-indigo-600! transition-all! duration-200! ease-in-out! selection:bg-indigo-200 selection:text-indigo-900"
      />
      <Button
        type="submit"
        className="md:w-1/5 bg-indigo-500 hover:bg-indigo-700 text-white !p-2">
        Add Todo
      </Button>
    </form>
  )
}

export default TodoForm
