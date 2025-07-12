import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import hindsightLogo from '../assets/hindsight_logo.svg'
import './LandingPage.css'

function RotatingWords() {
  const words = ['Recall.', 'Reflect.', 'Evolve.']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="rotating-words-container">
      <motion.div
        key={currentWordIndex}
        initial={{ opacity: 0, y: 20, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: -20, rotateX: 90 }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.8
        }}
        className="rotating-word"
      >
        {words[currentWordIndex]}
      </motion.div>
    </div>
  )
}

function LandingPage({ onReveal }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="landing-page">
      <div className="landing-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="logo-container"
        >
          <img src={hindsightLogo} alt="Hindsight Logo" className="landing-logo" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="landing-title"
          >
            Hindsight
          </motion.h1>
          <RotatingWords />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="reveal-button-container"
        >
          <motion.button
            className="reveal-button"
            onClick={onReveal}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isHovered 
                ? '0 25px 60px rgba(139, 92, 246, 0.4)' 
                : '0 15px 35px rgba(139, 92, 246, 0.3)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="button-content"
              animate={{
                y: isHovered ? -2 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="button-text">Reveal</span>
              <motion.div
                className="button-arrow"
                animate={{
                  x: isHovered ? 8 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </motion.div>
            
            <motion.div
              className="button-glow"
              animate={{
                opacity: isHovered ? 0.8 : 0.5,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="floating-particles"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                left: `${20 + i * 12}%`,
                top: `${60 + Math.sin(i) * 10}%`,
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
        className="background-gradient"
      />
    </div>
  )
}

export default LandingPage 