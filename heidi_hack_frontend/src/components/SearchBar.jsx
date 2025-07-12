import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import '../styles/colors.css';

function SearchBar({ input, setInput, handleSubmit, isStreaming }) {
  const [focused, setFocused] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const searchContainerRef = useRef(null);
  
  const placeholderData = [
    { text: "Reflect & Learn", icon: "🧠" },
    { text: "Recall", icon: "💭" },
    { text: "Pattern Clusters", icon: "🔍" }
  ];

  useEffect(() => {
    if (!focused && !input && !isStreaming) {
      // Reset to first text when restarting animation
      setCurrentTextIndex(0);
      
      const interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % placeholderData.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [focused, input, isStreaming]);

  // Reset animation when transitioning from streaming to not streaming
  useEffect(() => {
    if (!isStreaming && !focused && !input) {
      setCurrentTextIndex(0);
    }
  }, [isStreaming, focused, input]);

  // Handle click outside to reset focus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchContainerRef} style={{ 
      width: '100%', 
      maxWidth: '800px',
      position: 'relative',
      margin: '0 auto'
    }}>
      <Motion.div
        className="search-bar-wrapper"
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-surface)',
          borderRadius: '16px',
          border: `2px solid ${focused ? 'var(--color-primary)' : 'var(--color-border)'}`,
          boxShadow: focused 
            ? '0 20px 40px rgba(31, 77, 145, 0.15), 0 8px 16px rgba(31, 77, 145, 0.1)' 
            : '0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
        whileHover={{ 
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12), 0 6px 12px rgba(0, 0, 0, 0.08)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            padding: '0 24px',
            minHeight: '60px'
          }}>
            
            {/* Animated Icon */}
            <Motion.div
              style={{
                marginRight: '16px',
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px'
              }}
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧐
            </Motion.div>

            {/* Input Container */}
            <div style={{ 
              flex: 1, 
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder=""
                disabled={isStreaming}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '18px',
                  fontWeight: '400',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: '1.4'
                }}
              />
              
              {/* Animated Placeholder */}
              {!focused && !input && !isStreaming && (
                <div style={{ 
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <AnimatePresence mode="wait">
                    <Motion.div
                      key={currentTextIndex}
                      initial={{ opacity: 0, rotateX: -90, y: 20 }}
                      animate={{ opacity: 1, rotateX: 0, y: 0 }}
                      exit={{ opacity: 0, rotateX: 90, y: -20 }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '18px',
                        color: 'var(--color-text-muted)',
                        fontWeight: '400'
                      }}
                    >
                      <Motion.span
                        animate={{ 
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ fontSize: '20px' }}
                      >
                        {placeholderData[currentTextIndex].icon}
                      </Motion.span>
                      <span>{placeholderData[currentTextIndex].text}</span>
                    </Motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Streaming indicator */}
              {isStreaming && (
                <Motion.div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '18px',
                    color: 'var(--color-primary)',
                    fontWeight: '500'
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Motion.span
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    ⚡
                  </Motion.span>
                  <span>Thinking...</span>
                </Motion.div>
              )}
            </div>

            {/* Submit Button */}
            <Motion.button
              type="submit"
              disabled={isStreaming || !input.trim()}
              style={{
                marginLeft: '16px',
                padding: '12px 20px',
                backgroundColor: input.trim() ? 'var(--color-primary)' : 'var(--color-border)',
                color: input.trim() ? 'white' : 'var(--color-text-muted)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              whileHover={input.trim() ? { scale: 1.05 } : {}}
              whileTap={input.trim() ? { scale: 0.95 } : {}}
            >
              <Motion.span
                animate={input.trim() ? { x: [0, 2, 0] } : {}}
                transition={{ 
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </Motion.span>
              Ask Hindsight
            </Motion.button>
          </div>
        </form>
      </Motion.div>
    </div>
  )
}

export default SearchBar
