import WaterProgress from '@/app/components/WaterProgress'
import TodoList from '@/app/components/TodoList'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">75 Hard Challenge</h1>
          <WaterProgress />
          <TodoList />
        </div>
      </div>
    </div>
  )
}

