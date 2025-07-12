import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import '../styles/colors.css';

function PromptAssistant({ onPromptSelect }) {
  const [currentCategoryIndex, setCategoryIndex] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const promptCategories = [
    {
      title: "Recalls",
      icon: "🔁",
      description: "Real-time retrieval across meds, referrals, and past events",
      color: "var(--color-primary)",
      prompts: [
        "Why did we stop Mr. Ahmed's statin?",
        "What triggered the referral for Ms. Li last month?",
        "Was there a reason we didn't follow up on the abnormal LFT?"
      ]
    },
    {
      title: "Reflect & Learn",
      icon: "🧠",
      description: "Decision review, reasoning visibility, and peer contrast",
      color: "#8B5CF6",
      prompts: [
        "Summarize Jane's decisions over past 3 visits.",
        "How did I handle similar cases to this one before?",
        "Compare my migraine referrals to my peers."
      ]
    },
    {
      title: "Patterns & Clusters",
      icon: "📊",
      description: "Detect themes, common conditions, bottlenecks, and care gaps",
      color: "#10B981",
      prompts: [
        "What kind of patients did I see last week?",
        "Who stopped statins in the last 3 months?",
        "Which cases involved delayed imaging?"
      ]
    },
    {
      title: "General Assistant",
      icon: "🤖",
      description: "System-initiated reflection, summarization, and nudge prompts",
      color: "#F59E0B",
      prompts: [
        "Hey Hindsight, what should I reflect on this week?",
        "What's one thing I might be missing in my practice?",
        "Any patients that stand out for deeper review?",
        "What trends should I be aware of in my caseload?",
        "Summarize deviations in care from this month.",
        "Create a reflection report for my last 10 diabetic patients.",
        "List patients who need follow-up scheduling.",
        "Give me a weekly digest of my prescribing behavior.",
        "Suggest reading based on my current patient patterns.",
        "Flag cases suitable for trainee discussion."
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex((prev) => {
        const nextCategory = (prev + 1) % promptCategories.length;
        setCurrentPromptIndex(0); // Reset prompt index when category changes
        return nextCategory;
      });
    }, 8000); // Change category every 8 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentCategory = promptCategories[currentCategoryIndex];
    if (currentCategory.prompts.length > 1) {
      const interval = setInterval(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % currentCategory.prompts.length);
      }, 3000); // Change prompt every 3 seconds

      return () => clearInterval(interval);
    }
  }, [currentCategoryIndex]);

  const currentCategory = promptCategories[currentCategoryIndex];
  const currentPrompt = currentCategory.prompts[currentPromptIndex];

  const handleCategoryClick = (index) => {
    setCategoryIndex(index);
    setCurrentPromptIndex(0); // Reset prompt index when manually switching
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '800px',
      margin: '24px auto 0',
      position: 'relative'
    }}>
      <Motion.div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
                {/* Category Indicator */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {promptCategories.map((_, index) => (
            <Motion.div
              key={index}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index === currentCategoryIndex 
                  ? currentCategory.color 
                  : 'var(--color-border)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              animate={{ 
                scale: index === currentCategoryIndex ? 1.2 : 1 
              }}
              whileHover={{ 
                scale: 1.4,
                backgroundColor: promptCategories[index].color
              }}
              onClick={() => handleCategoryClick(index)}
            />
          ))}
        </div>

        {/* Category Title */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={currentCategoryIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <Motion.span
              style={{
                fontSize: '20px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
              animate={{ 
                rotate: [0, 15, -15, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {currentCategory.icon}
            </Motion.span>
            <div>
              <h4 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                color: currentCategory.color
              }}>
                {currentCategory.title}
              </h4>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                opacity: 0.8
              }}>
                {currentCategory.description}
              </p>
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Rotating Prompt */}
        <div style={{
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
          <AnimatePresence mode="wait">
            <Motion.div
              key={`${currentCategoryIndex}-${currentPromptIndex}`}
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: 90 }}
              transition={{ 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                width: '100%',
                cursor: 'pointer',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                borderColor: currentCategory.color
              }}
              onClick={() => onPromptSelect && onPromptSelect(currentPrompt)}
            >
              <p style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--color-text-primary)',
                lineHeight: '1.4'
              }}>
                "{currentPrompt}"
              </p>
              
              <Motion.div
                style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span>Click to use this prompt</span>
                <Motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </Motion.span>
              </Motion.div>
            </Motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div style={{
          marginTop: '20px',
          height: '3px',
          backgroundColor: 'var(--color-border)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <Motion.div
            style={{
              height: '100%',
              backgroundColor: currentCategory.color,
              borderRadius: '2px'
            }}
            animate={{ 
              width: `${((currentPromptIndex + 1) / currentCategory.prompts.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Motion.div>
    </div>
  );
}

export default PromptAssistant; 