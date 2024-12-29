import { motion } from 'framer-motion'

interface DailyProgressProps {
  totalSteps: number
  completedSteps: number
}

export default function DailyProgress({ totalSteps, completedSteps }: DailyProgressProps) {
  const progressPercentage = (completedSteps / totalSteps) * 100

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-2">Daily Progress</h2>
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="bg-green-500 h-4"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <motion.p
        className="text-sm text-gray-600 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {completedSteps} / {totalSteps} steps completed
      </motion.p>
    </motion.div>
  )
}

