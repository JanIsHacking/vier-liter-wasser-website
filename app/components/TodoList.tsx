'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const todos = [
  { id: 1, text: 'Follow a healthy diet' },
  { id: 2, text: 'Do two 45-minute workouts (at least one outside)' },
  { id: 3, text: 'Read for at least 15 minutes' },
  { id: 4, text: 'Take progress pictures' },
]

export default function TodoList() {
  const [completedTodos, setCompletedTodos] = useState<number[]>([])

  const toggleTodo = (id: number) => {
    setCompletedTodos(prev =>
      prev.includes(id) ? prev.filter(todoId => todoId !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Daily Tasks</h2>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={completedTodos.includes(todo.id)}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`ml-2 ${
                completedTodos.includes(todo.id) ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

