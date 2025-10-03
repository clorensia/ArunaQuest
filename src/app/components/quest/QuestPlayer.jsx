'use client'
import { useGameStore } from '@/app/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

function VisualNovelScene({ scenario, onChoice, progress, scenarioIndex, totalScenarios, onExit }) {
  const { title, narrative, choices } = scenario

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center mb-4 text-sm text-slate-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="font-medium">Skenario {scenarioIndex} dari {totalScenarios}</span>
        <motion.button
          onClick={onExit}
          className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded text-slate-300 hover:bg-slate-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Keluar
        </motion.button>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="w-full bg-slate-700 rounded-full h-2.5 mb-8 overflow-hidden"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="bg-purple-500 h-2.5 rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      {/* Story Card */}
      <motion.div 
        className="glass-card p-6 md:p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h2>
        
        {/* Animated text reveal */}
        <motion.p 
          className="text-slate-300 whitespace-pre-line leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {narrative}
        </motion.p>
      </motion.div>

      {/* Choices Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.h3 
          className="text-lg font-semibold text-white mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          Pilih aksimu:
        </motion.h3>
        
        <motion.div 
          className="space-y-4"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {choices.map((choice, index) => (
            <motion.button
              key={choice.id}
              onClick={() => onChoice(choice)}
              className="w-full text-left bg-slate-800/50 border-2 border-slate-700 p-4 rounded-lg transition-all relative overflow-hidden group"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.8 + index * 0.1 }
                }
              }}
              whileHover={{ 
                scale: 1.02,
                borderColor: 'rgba(139, 92, 246, 0.8)',
                backgroundColor: 'rgba(100, 80, 150, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover gradient effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Choice number badge */}
              <motion.span 
                className="inline-flex items-center justify-center w-6 h-6 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold mr-3"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.span>
              
              <span className="relative z-10">{choice.text}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function QuestPlayer() {
  const {
    currentScenarioId,
    questData,
    currentScenarioIndex,
    handleChoice,
    resetQuest
  } = useGameStore()

  if (!questData || !currentScenarioId) return null

  const scenario = questData.scenarios[currentScenarioId]
  if (!scenario) return null

  const totalScenarios = Object.keys(questData.scenarios).length
  const progress = (currentScenarioIndex / totalScenarios) * 100

  return (
    <AnimatePresence mode="wait">
      <VisualNovelScene
        key={currentScenarioId}
        scenario={scenario}
        onChoice={handleChoice}
        progress={progress}
        scenarioIndex={currentScenarioIndex}
        totalScenarios={totalScenarios}
        onExit={resetQuest}
      />
    </AnimatePresence>
  )
}

export default QuestPlayer