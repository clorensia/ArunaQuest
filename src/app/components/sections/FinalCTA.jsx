"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion(Link);

export default function FinalCTA() {
  return (
    <motion.section
      id="final-cta"
      className="py-20 md:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Siap Memulai Quest Anda?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Bergabunglah sekarang dan rasakan pengalaman interaktif yang tak
          terlupakan bersama ArunaQuest.
        </motion.p>

        <MotionLink
          href="/quest"
          className="cta-gradient text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg cta-button inline-block"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Mulai Quest
        </MotionLink>
      </div>
    </motion.section>
  );
}
