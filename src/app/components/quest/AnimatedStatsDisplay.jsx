import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function AnimatedStatBar({ label, value, maxValue = 20, color = 'teal' }) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = Math.min(100, (value / maxValue) * 100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'S', color: 'text-purple-400' }
    if (percentage >= 80) return { grade: 'A', color: 'text-teal-400' }
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400' }
    if (percentage >= 60) return { grade: 'C', color: 'text-amber-400' }
    return { grade: 'D', color: 'text-rose-400' }
  }

  const grade = getGrade()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="capitalize font-semibold text-white text-lg">{label}</span>
          <span className={`${grade.color} font-bold text-xl`}>{grade.grade}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-white">{animatedValue}</span>
          <span className="text-slate-500 text-sm">/ {maxValue}</span>
        </div>
      </div>

      <div className="relative w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${(animatedValue / maxValue) * 100}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </div>
        
        {/* Percentage Label */}
        <div className="absolute inset-0 flex items-center justify-end pr-3">
          <span className="text-xs font-bold text-white drop-shadow-lg">
            {Math.round((animatedValue / maxValue) * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export function StatComparison({ label, current, previous }) {
  const difference = current - previous
  const isIncrease = difference > 0
  const isDecrease = difference < 0
  
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
      <span className="text-slate-300 font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-xl">{current}</span>
        {isIncrease && (
          <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            +{difference}
          </div>
        )}
        {isDecrease && (
          <div className="flex items-center gap-1 text-rose-400 text-sm font-semibold">
            <TrendingDown className="w-4 h-4" />
            {difference}
          </div>
        )}
        {!isIncrease && !isDecrease && (
          <div className="flex items-center gap-1 text-slate-500 text-sm font-semibold">
            <Minus className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  )
}

export function RadarChart({ stats }) {
  const maxValue = 20
  const categories = Object.keys(stats)
  const values = Object.values(stats)
  
  // Calculate points for polygon
  const getPoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2
    const radius = 100
    const percentage = value / maxValue
    const x = 150 + radius * percentage * Math.cos(angle)
    const y = 150 + radius * percentage * Math.sin(angle)
    return `${x},${y}`
  }

  const points = values.map((val, idx) => getPoint(val, idx, categories.length)).join(' ')

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx="150"
            cy="150"
            r={100 * scale}
            fill="none"
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {categories.map((_, idx) => {
          const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2
          const x = 150 + 100 * Math.cos(angle)
          const y = 150 + 100 * Math.sin(angle)
          return (
            <line
              key={idx}
              x1="150"
              y1="150"
              x2={x}
              y2={y}
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="1"
            />
          )
        })}

        {/* Data polygon */}
        <polygon
          points={points}
          fill="rgba(139, 92, 246, 0.3)"
          stroke="rgba(139, 92, 246, 1)"
          strokeWidth="2"
          className="animate-draw-polygon"
        />

        {/* Data points */}
        {values.map((val, idx) => {
          const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2
          const percentage = val / maxValue
          const x = 150 + 100 * percentage * Math.cos(angle)
          const y = 150 + 100 * percentage * Math.sin(angle)
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="4"
              fill="white"
              className="animate-pulse"
            />
          )
        })}

        {/* Labels */}
        {categories.map((cat, idx) => {
          const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2
          const x = 150 + 120 * Math.cos(angle)
          const y = 150 + 120 * Math.sin(angle)
          return (
            <text
              key={idx}
              x={x}
              y={y}
              textAnchor="middle"
              className="text-xs fill-slate-300 font-semibold capitalize"
            >
              {cat}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

// Add to globals.css
const chartStyles = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes draw-polygon {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-draw-polygon {
  animation: draw-polygon 1.5s ease-out;
}
`