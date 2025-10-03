'use client'
import { motion, AnimatePresence } from "framer-motion"
import { backdropVariants, modalVariants } from "./ModalVariants.jsx"

export default function UnderMaintenanceModal({ isOpen, onClose, feature }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-8 text-center"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              🚧
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-2">Under Maintenance</h2>
            <p className="text-slate-400 mb-6">
              {feature} sedang dalam pengembangan dan akan segera hadir!
            </p>

            <button
              onClick={onClose}
              className="w-full secondary-cta text-white font-bold py-3 rounded-lg"
            >
              Mengerti
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
