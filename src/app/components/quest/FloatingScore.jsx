import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FloatingScore = memo(({ effect }) => {
  if (!effect) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed top-24 right-8 flex flex-col items-end justify-center pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {Object.entries(effect).map(([stat, value], index) => (
          <motion.div
            key={`${stat}-${value}-${Date.now()}`}
            className={`text-lg font-bold px-4 py-2 rounded-lg shadow-2xl mb-2 ${
              value > 0 
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white' 
                : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
            }`}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: 50,
              rotate: value > 0 ? -15 : 15
            }}
            animate={{ 
              opacity: 1, 
              scale: [0, 1.2, 1],
              x: 0,
              y: [-10, 0],
              rotate: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            exit={{ 
              opacity: 0,
              y: -50,
              scale: 0.8,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="flex items-center gap-2"
              animate={{ 
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.3,
                delay: 0.5 + index * 0.1
              }}
            >
              {/* Animated Icon */}
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: value > 0 ? [0, -10, 10, 0] : [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                {value > 0 ? '↑' : '↓'}
              </motion.span>
              
              {/* Stat name */}
              <span className="capitalize">{stat}</span>
              
              {/* Value with emphasis */}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.2 + index * 0.1
                }}
                className="font-extrabold"
              >
                {value > 0 ? '+' : ''}{value}
              </motion.span>
            </motion.div>

            {/* Particle effects */}
            <motion.div
              className="absolute inset-0 rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full ${
                    value > 0 ? 'bg-yellow-300' : 'bg-white'
                  }`}
                  initial={{ 
                    x: '50%', 
                    y: '50%',
                    scale: 0
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.05
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
})

FloatingScore.displayName = 'FloatingScore'

export default FloatingScore