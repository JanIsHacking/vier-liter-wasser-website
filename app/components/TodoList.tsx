'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar'
import { saveProgress, loadTodayProgress } from '../utils/storage'

const todos = [
  { id: 'water', label: 'Drink Water', max: 4 },
  { id: 'workouts', label: 'Workouts', max: 2 },
  { id: 'reading', label: 'Reading', max: 1 },
  { id: 'diet', label: 'Healthy Diet', max: 1 },
  { id: 'pictures', label: 'Progress Pictures', max: 1 },
]

export default function TodoList({ onProgressUpdate }: { onProgressUpdate: (progress: Record<string, number>) => void }) {
  const [progress, setProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    const todayProgress = loadTodayProgress();
    setProgress(todayProgress);
    onProgressUpdate(todayProgress);
  }, [onProgressUpdate]);

  const incrementProgress = useCallback((id: string) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [id]: Math.min((prev[id] || 0) + 1, todos.find(todo => todo.id === id)?.max || 1)
      };
      saveProgress(id);
      onProgressUpdate(newProgress);
      return newProgress;
    });
  }, [onProgressUpdate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-4">Daily Tasks</h2>
      {todos.map(todo => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: todos.indexOf(todo) * 0.1 }}
        >
          <ProgressBar
            current={progress[todo.id] || 0}
            max={todo.max}
            onIncrement={() => incrementProgress(todo.id)}
            label={todo.label}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

