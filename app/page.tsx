'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DailyProgress from './components/DailyProgress'
import TodoList from './components/TodoList'
import { requestNotificationPermission, scheduleNotification } from './utils/notifications'
import confetti from 'canvas-confetti'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const [totalSteps, setTotalSteps] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const todos = [
      { id: 'water', max: 4 },
      { id: 'workouts', max: 2 },
      { id: 'reading', max: 1 },
      { id: 'diet', max: 1 },
      { id: 'pictures', max: 1 },
    ]
    const total = todos.reduce((acc, todo) => acc + todo.max, 0)
    setTotalSteps(total)

    requestNotificationPermission();
    scheduleNotification('75 Hard Challenge', 'Remember to stay on track with your goals!', 4 * 60 * 60 * 1000); // Notify after 4 hours
  }, [])

  const handleProgressUpdate = useCallback((progress: Record<string, number>) => {
    const completed = Object.values(progress).reduce((acc, val) => acc + val, 0);
    setCompletedSteps(completed);
    
    if (completed === totalSteps && totalSteps > 0) {
      setShowCelebration(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [totalSteps])

  const closeCelebration = () => {
    setShowCelebration(false)
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="p-8">
          <motion.h1
            className="text-2xl font-bold text-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            75 Hard Challenge
          </motion.h1>
          <DailyProgress totalSteps={totalSteps} completedSteps={completedSteps} />
          <TodoList onProgressUpdate={handleProgressUpdate} />
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={closeCelebration}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                  <p>You&#39;ve completed all tasks for today!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

