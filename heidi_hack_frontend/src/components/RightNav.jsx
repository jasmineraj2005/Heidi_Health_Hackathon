import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dashboardAPI } from '../api/dashboardAPI'
import { recommendationAPI } from '../api/recommendationAPI'
import './RightNav.css'

// Mock data for reasoning & reflection cards
const reasoningCards = [
  {
    id: "ref_001",
    icon: "💊",
    tag: "Pattern",
    title: "3 patients stopped statins due to GI upset",
    back: {
      text: "Consider switching to rosuvastatin or XR formulation. Add to QI tracker?",
      cta: "Flag for Audit"
    }
  },
  {
    id: "ref_002",
    icon: "📉",
    tag: "Deviation",
    title: "2 referrals delayed beyond 4 weeks",
    back: {
      text: "Check triage backlog or patient contact issues. Worth logging for review.",
      cta: "Open Case Timeline"
    }
  },
  {
    id: "ref_003",
    icon: "🧠",
    tag: "Insight",
    title: "6 diabetes patients with no med change in 12+ months",
    back: {
      text: "Might indicate therapeutic inertia. Consider reviewing treatment plans.",
      cta: "View Patients"
    }
  }
]

// Mock data for recommended reading
const recommendedReading = [
  {
    title: "ADA 2024: Early Statin Use in Diabetes",
    source: "americanheart.org",
    summary: "Starting statins earlier in patients with long FHx and elevated LDL reduces events by 22%.",
    url: "https://www.americanheart.org/article123"
  },
  {
    title: "BMJ Review: Polypharmacy in CKD",
    source: "bmj.com",
    summary: "Examines risks of polypharmacy in chronic kidney disease and strategies for deprescribing.",
    url: "https://www.bmj.com/polypharmacy-ckd"
  },
  {
    title: "NEJM: Managing Therapeutic Inertia",
    source: "nejm.org",
    summary: "How delayed adjustments in treatment plans contribute to poor chronic disease outcomes.",
    url: "https://www.nejm.org/therapeutic-inertia"
  }
]

function FlippableCard({ card, show }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`reasoning-card ${show ? 'card-visible' : 'card-hidden'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="card-front">
          <div className="card-header">
            <span className="card-icon">{card.icon}</span>
            <span className="card-tag">{card.tag}</span>
          </div>
          <h4 className="card-title">{card.title}</h4>
          <div className="flip-hint">Click to reflect</div>
        </div>
        <div className="card-back">
          <p className="card-back-text">{card.back.text}</p>
          <button className="card-cta" onClick={(e) => {
            e.stopPropagation()
            console.log('CTA clicked:', card.back.cta)
          }}>
            {card.back.cta}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ReadingLink({ item }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="reading-link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="reading-title">
        {item.title}
      </a>
      <div className="reading-source">{item.source}</div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="reading-summary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {item.summary}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ReasoningReflection({ sentQuery }) {
  const [selectedCards, setSelectedCards] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sentQuery) {
      setShow(false)
      // Simulate API call to get reasoning insights
      dashboardAPI(sentQuery).then(val => {
        // Select cards based on API response
        const cardIndices = val ? [0, 1, 2].slice(0, val) : []
        setSelectedCards(cardIndices)
        setTimeout(() => setShow(true), 100)
      })
    }
  }, [sentQuery])

  const visibleCards = selectedCards.map(index => reasoningCards[index])

  return (
    <div className="reasoning-section">
      <div className="section-header">
        <h2 className="panel-title">
          <span className="icon">🧠</span>
          Reasoning
        </h2>
      </div>
      <div className="reasoning-cards">
        {visibleCards.map((card) => (
          <FlippableCard
            key={card.id}
            card={card}
            show={show}
          />
        ))}
      </div>
      <motion.button
        className="add-reflection-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="btn-icon">➕</span>
        Add your reflection
      </motion.button>
    </div>
  )
}

function RecommendedReading({ sentQuery }) {
  const [selectedReading, setSelectedReading] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sentQuery) {
      setShow(false)
      // Simulate API call to get recommended reading
      recommendationAPI(sentQuery).then(val => {
        // Select reading based on API response
        const readingIndices = val ? [0, 1, 2].slice(0, val) : []
        setSelectedReading(readingIndices)
        setTimeout(() => setShow(true), 100)
      })
    }
  }, [sentQuery])

  const visibleReading = selectedReading.map(index => recommendedReading[index])

  return (
    <div className="reading-section">
      <div className="section-header">
        <h2 className="panel-title">
          <span className="icon">📚</span>
          Recommendations
        </h2>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="reading-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
                         {visibleReading.map((item) => (
               <ReadingLink key={item.title} item={item} />
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RightNav({ sentQuery }) {
  return (
    <div className="right-nav">
      <ReasoningReflection sentQuery={sentQuery} />
      <RecommendedReading sentQuery={sentQuery} />
    </div>
  )
}

export default RightNav
