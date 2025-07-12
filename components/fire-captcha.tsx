"use client"

import { useState, useRef, useEffect } from 'react'
import { Check, X, Flame } from 'lucide-react'

interface DraggableItem {
  id: string
  name: string
  icon: string
  isCorrect: boolean
  isDragging: boolean
}

interface DroppedItem {
  id: string
  name: string
  icon: string
  isCorrect: boolean
}

export default function FireCaptcha({ onComplete }: { onComplete: (success: boolean) => void }) {
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([
    { id: 'wood', name: 'Drewno', icon: '🪵', isCorrect: true, isDragging: false },
    { id: 'bark', name: 'Kora brzozowa', icon: '🪨', isCorrect: true, isDragging: false },
    { id: 'matches', name: 'Zapałki', icon: '🥢', isCorrect: true, isDragging: false },
    { id: 'gasoline', name: 'Benzyna', icon: '⛽', isCorrect: false, isDragging: false },
    { id: 'plastic', name: 'Plastik', icon: '🥤', isCorrect: false, isDragging: false },
    { id: 'water', name: 'Butelka wody', icon: '💧', isCorrect: false, isDragging: false },
  ])

  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fireZoneRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.DragEvent, item: DraggableItem) => {
    e.dataTransfer.setData('text/plain', item.id)
    setDraggableItems(prev => 
      prev.map(i => i.id === item.id ? { ...i, isDragging: true } : i)
    )
  }

  const handleDragEnd = (item: DraggableItem) => {
    setDraggableItems(prev => 
      prev.map(i => i.id === item.id ? { ...i, isDragging: false } : i)
    )
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const itemId = e.dataTransfer.getData('text/plain')
    const item = draggableItems.find(i => i.id === itemId)
    
    if (item && !droppedItems.find(di => di.id === itemId)) {
      const newDroppedItem: DroppedItem = {
        id: item.id,
        name: item.name,
        icon: item.icon,
        isCorrect: item.isCorrect
      }
      
      setDroppedItems(prev => [...prev, newDroppedItem])
      setDraggableItems(prev => prev.filter(i => i.id !== itemId))
    }
  }

  const removeDroppedItem = (itemId: string) => {
    const item = droppedItems.find(i => i.id === itemId)
    if (item) {
      setDroppedItems(prev => prev.filter(i => i.id !== itemId))
      setDraggableItems(prev => [...prev, {
        id: item.id,
        name: item.name,
        icon: item.icon,
        isCorrect: item.isCorrect,
        isDragging: false
      }])
    }
  }

  const checkCompletion = () => {
    const correctItems = droppedItems.filter(item => item.isCorrect)
    const incorrectItems = droppedItems.filter(item => !item.isCorrect)
    
    const success = correctItems.length === 3 && incorrectItems.length === 0
    setIsCompleted(true)
    setShowResult(true)
    
    setTimeout(() => {
      setShowResult(false)
      onComplete(success)
    }, 2000)
  }

  const resetCaptcha = () => {
    setDroppedItems([])
    setDraggableItems([
      { id: 'wood', name: 'Drewno', icon: '🪵', isCorrect: true, isDragging: false },
      { id: 'bark', name: 'Kora brzozowa', icon: '🌳', isCorrect: true, isDragging: false },
      { id: 'matches', name: 'Zapałki', icon: '🔥', isCorrect: true, isDragging: false },
      { id: 'gasoline', name: 'Benzyna', icon: '⛽', isCorrect: false, isDragging: false },
      { id: 'plastic', name: 'Plastik', icon: '🥤', isCorrect: false, isDragging: false },
      { id: 'water', name: 'Butelka wody', icon: '💧', isCorrect: false, isDragging: false },
    ])
    setIsCompleted(false)
    setShowResult(false)
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">Zbuduj ognisko</h3>
        <p className="text-sm text-gray-600">
          Przeciągnij potrzebne przedmioty do ogniska. Potrzebujesz: drewna, kory brzozowej i zapałek.
        </p>
      </div>

      {/* Fire zone */}
      <div 
        ref={fireZoneRef}
        className={`relative min-h-32 border-2 border-dashed rounded-lg mb-6 p-4 transition-colors ${
          dragOver 
            ? 'border-[rgb(var(--primary))] bg-[rgba(var(--primary),0.05)]' 
            : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute top-2 left-2 text-2xl">🔥</div>
        <div className="text-center text-sm text-gray-500 mb-2">Ognisko</div>
        
        {droppedItems.length === 0 && (
          <div className="text-center text-gray-400 text-sm">
            Przeciągnij tutaj potrzebne przedmioty
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 justify-center">
          {droppedItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                item.isCorrect 
                  ? 'bg-green-100 border-green-300 text-green-800' 
                  : 'bg-red-100 border-red-300 text-red-800'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
              <button
                onClick={() => removeDroppedItem(item.id)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Available items */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Dostępne przedmioty:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {draggableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={() => handleDragEnd(item)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-move transition-all ${
                item.isDragging 
                  ? 'opacity-50 scale-95' 
                  : 'hover:bg-gray-50 hover:shadow-sm'
              } ${
                item.isCorrect 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-red-300 bg-red-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={checkCompletion}
          disabled={droppedItems.length === 0 || isCompleted}
          className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg hover:bg-[rgb(var(--primary-dark))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Sprawdź ognisko
        </button>
        <button
          onClick={resetCaptcha}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Resetuj
        </button>
      </div>

      {/* Result overlay */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            {droppedItems.filter(item => item.isCorrect).length === 3 && 
             droppedItems.filter(item => !item.isCorrect).length === 0 ? (
              <div className="text-green-600">
                <Check size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Ognisko gotowe!</h3>
                <p>Wszystkie przedmioty są poprawne.</p>
              </div>
            ) : (
              <div className="text-red-600">
                <X size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Błąd!</h3>
                <p>Nie wszystkie przedmioty są poprawne.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 