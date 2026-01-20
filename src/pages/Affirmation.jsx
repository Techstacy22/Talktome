import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Affirmation() {
    const affirmations = [
        "You are stronger than you know, braver than you believe, and worthy of all the good things coming your way.",
        "It's okay to take things one day at a time. You're doing better than you think.",
        "Your feelings are valid, and it's okay to ask for help.",
        "You don't have to be perfect. You just have to be you, and that's enough.",
        "Every step forward, no matter how small, is progress worth celebrating.",
        "You deserve kindness, especially from yourself.",
        "It's okay to rest. You don't have to earn your place in this world.",
        "Your story isn't over yet. Tomorrow is a new page.",
        "You are not a burden. Your presence matters.",
        "Even on your hardest days, you are worthy of love and care.",
        "I deserve a love that feels like home and uplifts my spirit.",
        "My capacity to love is a gift, and I choose to give it to those who are deserving.",
        "I am worthy of being chosen, cherished, and loved exactly as I am.",
        "I allow myself to be my authentic self while maintaining healthy boundaries.",
        "I release the need for external validation; my worth is inherent.",
        "It is safe for me to give and receive love in abundance.",
        "I honor my needs and prioritize my own peace of mind in every relationship.",
        "I am enough, and I don't have to change or fix anything to be worthy of love.",
        "I trust my intuition to guide me toward relationships built on mutual respect.",
        "I am valuable and worthy of respect, even when I am not productive.",
        "It is okay to feel sad today; tomorrow is a fresh start for me.",
        "I am overcoming this one step at a time, and I am proud of how I got through today.",
        "Asking for help is a sign of strength and self-respect, not weakness.",
        "I am resilient and have the inner strength to handle whatever this day brings.",
        "I choose to be gentle with myself as I navigate my healing journey.",
        "My self-worth is not determined by my grades or academic achievements.",
        "I am allowed to set boundaries that protect my peace and well-being.",
        "I forgive myself for the times I ignored red flags; I am learning to trust myself again.",
        "I am no longer available for toxic patterns and choose thoughts that empower me.",
        "My healing is not linear, and it is okay to struggle as I grow.",
        "I am a survivor, unyielding and strong, transforming pain into wisdom.",
        "I am free to live authentically and unapologetically, moving at my own pace.",
        "You are capable of amazing things",
        "Your potential is limitless",
        "You deserve love and happiness",
        "Today is full of possibilities",
        "You are stronger than you think",
        "Your dreams are within reach",
        "You radiate positivity and confidence",
        "You are exactly where you need to be",
        "Your journey is unique and beautiful",
        "You have the power to create change",
        "You are worthy of all good things",
        "Your presence makes a difference",
        "You are growing and evolving every day",
        "You attract positive energy",
        "You are enough, just as you are"
    ];

    const [currentAffirmation, setCurrentAffirmation] = useState(0);
    
    
    useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
        setCurrentAffirmation(randomIndex);
    }, [affirmations.length]);
    const navigate = useNavigate();
    const handleGetStarted = () => {
      navigate('/AuthPage');
    };

   

    const handleRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
        setCurrentAffirmation(randomIndex);
    };
    const styles = {
    container: {
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    
    // Card that contains the affirmation content
    card: {
      background: 'rgba(255, 255, 255, 0.95)', 
      borderRadius: '24px', 
      padding: '60px 40px', 
      maxWidth: '600px', 
      width: '100%', 
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', 
      textAlign: 'center' 
    },
    
    // Main heading style
    heading: {
      fontSize: '2.5rem', 
      fontWeight: 'bold', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      WebkitBackgroundClip: 'text', 
      backgroundClip: 'text', 
      WebkitTextFillColor: 'transparent', 
      marginBottom: '40px' 
    },
    
    // Container for the affirmation text
    affirmationBox: {
      minHeight: '120px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginBottom: '40px' 
    },

    // The affirmation text itself with fade animation
    affirmationText: {
      fontSize: '1.75rem', 
      color: '#2d3748', 
      lineHeight: '1.6', 
      fontWeight: '500',
      transition: 'opacity 0.3s ease-in-out' 
    },
    
    // Container for buttons to align them properly
    buttonContainer: {
      display: 'flex', 
      gap: '16px',
      justifyContent: 'center', 
      flexWrap: 'wrap' 
    },
    
    // Primary button style (Get Started / New Affirmation)
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white', 
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 32px', 
      fontSize: '1.1rem', 
      fontWeight: '600', 
      cursor: 'pointer', 
      transition: 'transform 0.2s, box-shadow 0.2s', 
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)' 
    },
    
    // Secondary button style (visible after getting started)
    secondaryButton: {
      background: 'white', 
      color: '#667eea', 
      border: '2px solid #667eea', 
      borderRadius: '12px', 
      padding: '16px 32px', 
      fontSize: '1.1rem',
      fontWeight: '600', 
      cursor: 'pointer', 
      transition: 'transform 0.2s, background 0.2s', 
    }
  };
    return (
        currentAffirmation ? (
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.heading}>Your Affirmation</h1>
            
            {/* Box containing the affirmation text */}
            <div style={styles.affirmationBox}>
              <p style={styles.affirmationText}>
                {affirmations[currentAffirmation]}
              </p>
            </div>
  
            <div style={styles.buttonContainer}>
               <button 
                style={styles.primaryButton}
                onClick={handleGetStarted}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                 GET STARTED
              </button> 
          
              {/* Button to get a new random affirmation */}
              <button 
                style={styles.primaryButton}
                onClick={handleRandomAffirmation}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                 MORE AFFIRMATIONS
              </button>
              </div>
              
             
            </div>
          </div>
       
      ) : null
    );
  }

    
       

