'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function WaterProgress() {
  const [waterLiters, setWaterLiters] = useState(0)
  const maxLiters = 4

  const addWater = () => {
    if (waterLiters < maxLiters) {
      setWaterLiters(prev => prev + 1)
    }
  }

  const progressPercentage = (waterLiters / maxLiters) * 100

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Water Progress</h2>
      <div className="flex items-center">
        <div className="flex-1 bg-gray-200 rounded-full h-8 mr-4">
          <div
            className="bg-blue-500 rounded-full h-8 transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <Button
          onClick={addWater}
          disabled={waterLiters >= maxLiters}
          className="w-20"
        >
          {waterLiters >= maxLiters ? 'Done!' : `Add 1L`}
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {waterLiters} / {maxLiters} liters
      </p>
    </div>
  )
}

