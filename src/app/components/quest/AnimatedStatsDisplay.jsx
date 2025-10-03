import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function AnimatedStatBar({ label, value, maxValue = 20, color = 'teal' }) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min(100, (value / maxValue) * 100)

  // Spring animation for smooth number counting
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20
  })

  useEffect(() => {
    spring.set(value)
    
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })

    return () => unsubscribe()
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
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.span 
            className="capitalize font-semibold text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {label}
          </motion.span>
          <motion.span 
            className={`${grade.color} font-bold text-xl`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.3
            }}
          >
            {grade.grade}
          </motion.span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span 
            className="font-bold text-2xl text-white"
            key={displayValue}
            initial={{ scale: 1.2, color: '#8B5CF6' }}
            animate={{ scale: 1, color: '#FFFFFF' }}
            transition={{ duration: 0.3 }}
          >
            {displayValue}
          </motion.span>
          <span className="text-slate-500 text-sm">/ {maxValue}</span>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="relative w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full`}
          style={{
            background: `linear-gradient(to right, rgb(20 184 166), rgb(94 234 212))`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(value / maxValue) * 100}%` }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3
          }}
        >
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        
        {/* Percentage Label */}
        <div className="absolute inset-0 flex items-center justify-end pr-3">
          <motion.span 
            className="text-xs font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Math.round((value / maxValue) * 100)}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export function StatComparison({ label, current, previous }) {
  const difference = current - previous
  const isIncrease = difference > 0
  const isDecrease = difference < 0
  
  return (
    <motion.div 
      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        borderColor: 'rgba(139, 92, 246, 0.5)',
        transition: { duration: 0.2 }
      }}
    >
      <span className="text-slate-300 font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <motion.span 
          className="text-white font-bold text-xl"
          key={current}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {current}
        </motion.span>
        
        {isIncrease && (
          <motion.div 
            className="flex items-center gap-1 text-green-400 text-sm font-semibold"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <TrendingUp className="w-4 h-4" />
            </motion.div>
            +{difference}
          </motion.div>
        )}
        
        {isDecrease && (
          <motion.div 
            className="flex items-center gap-1 text-rose-400 text-sm font-semibold"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <TrendingDown className="w-4 h-4" />
            </motion.div>
            {difference}
          </motion.div>
        )}
        
        {!isIncrease && !isDecrease && (
          <div className="flex items-center gap-1 text-slate-500 text-sm font-semibold">
            <Minus className="w-4 h-4" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function RadarChart({ stats }) {
  const maxValue = 20
  const categories = Object.keys(stats)
  const values = Object.values(stats)
  
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
    <motion.div 
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Background circles with animation */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <motion.circle
            key={i}
            cx="150"
            cy="150"
            r={100 * scale}
            fill="none"
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}

        {/* Axis lines */}
        {categories.map((_, idx) => {
          const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2
          const x = 150 + 100 * Math.cos(angle)
          const y = 150 + 100 * Math.sin(angle)
          return (
            <motion.line
              key={idx}
              x1="150"
              y1="150"
              x2={x}
              y2={y}
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.05 }}
            />
          )
        })}

        {/* Data polygon with draw animation */}
        <motion.polygon
          points={points}
          fill="rgba(139, 92, 246, 0.3)"
          stroke="rgba(139, 92, 246, 1)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 0.8,
            type: "spring",
            stiffness: 100
          }}
        />

        {/* Data points */}
        {values.map((val, idx) => {
          const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2
          const percentage = val / maxValue
          const x = 150 + 100 * percentage * Math.cos(angle)
          const y = 150 + 100 * percentage * Math.sin(angle)
          return (
            <motion.circle
              key={idx}
              cx={x}
              cy={y}
              r="4"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
              }}
              transition={{ 
                delay: 1 + idx * 0.1,
                duration: 0.5,
                type: "spring"
              }}
            />
          )
        })}

        {/* Labels */}
        {categories.map((cat, idx) => {
          const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2
          const x = 150 + 120 * Math.cos(angle)
          const y = 150 + 120 * Math.sin(angle)
          return (
            <motion.text
              key={idx}
              x={x}
              y={y}
              textAnchor="middle"
              className="text-xs fill-slate-300 font-semibold capitalize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + idx * 0.05 }}
            >
              {cat}
            </motion.text>
          )
        })}
      </svg>
    </motion.div>
  )
}