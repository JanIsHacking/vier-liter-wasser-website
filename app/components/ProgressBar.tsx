import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface ProgressBarProps {
  current: number
  max: number
  onIncrement: () => void
  label: string
}

export default function ProgressBar({ current, max, onIncrement, label }: ProgressBarProps) {
  const progressPercentage = (current / max) * 100

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-500">{current}/{max}</span>
      </div>
      <div className="flex items-center">
        <div className="flex-1 bg-gray-200 rounded-full h-4 mr-2 overflow-hidden">
          <motion.div
            className="bg-blue-500 h-4"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={onIncrement}
            disabled={current >= max}
            size="icon"
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

