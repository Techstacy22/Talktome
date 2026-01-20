import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/AuthPage');

    };
    const styles = {
        Container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            justifyContent: 'center', 
            padding: '20px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        card:{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            padding: '60px 40px',
            maxWidth: '900px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
        },
         heading:{fontSize: '3.5rem',
            fontWeight: 'bold', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            WebkitBackgroundClip: 'text', 
            backgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            marginBottom: '20px', 
            lineHeight: '1.2'
        },
            
        subheading: {
           fontSize: '1.5rem',
           color: '#4a5568',
           marginBottom: '50px', 
           lineHeight: '1.6',
           fontWeight: '400',
        },
        featureCard: {
            flex: '1', 
            minWidth: '220px',
            padding: '30px 20px', 
            background: 'linear-gradient(135deg, #455168 0%, #688cb0 100%)',
            borderRadius: '16px',
            transition: 'transform 0.3s, box-shadow 0.3s', 
            cursor: 'pointer' 
        },
        featureIcon: {
            fontSize: '3.5rem', 
            marginBottom: '15px', 
            display: 'block' 
    },
    
    
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '600', 
      color: '#2d3748', 
      marginBottom: '10px' 
    },
    
    
    featureDescription: {
      fontSize: '1rem', 
      color: '#0b0b0b', 
      lineHeight: '1.5' 
    },
    
    featureContainer: {
      display: 'flex',
      gap: '30px',
      marginBottom: '50px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
  
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white', 
      border: 'none', 
      borderRadius: '12px', 
      padding: '18px 45px', 
      fontSize: '1.3rem', 
      fontWeight: '600', 
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s', 
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)' 
    },
    
    
    footer: {
      marginTop: '60px', 
      paddingTop: '40px', 
      borderTop: '1px solid #e2e8f0', 
      color: '#718096', 
      fontSize: '0.9rem' 
    },
};
    return (
        <div style={styles.Container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Welcome to TalkToMe</h1>
                <p style={styles.subheading}>Your AI-powered companion for seamless conversations.A space where your feelings are heard.</p>
                <div style={styles.featureContainer}>
                    <div style={styles.featureCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}

                    >
                        <div style={styles.featureIcon}>✨</div>
                        <h3 style={styles.featureTitle}>Daily Inspiration</h3>
                        <p style={styles.featureDescription}>Receive daily motivational messages and insights to keep you inspired.</p>
                    </div>
                    <div style={styles.featureCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    >
                        <div style={styles.featureIcon}>💬</div>
                        <h3 style={styles.featureTitle}>Natural Conversations</h3>
                        <p style={styles.featureDescription}>Engage in natural, human-like conversations with our advanced AI.</p>
                    </div>
                    <div style={styles.featureCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    >
                        <div style={styles.featureIcon}>🧠</div>
                        <h3 style={styles.featureTitle}>Talk and have someone listen </h3>
                        <p style={styles.featureDescription}>Have a space to vent and let the your hearts seem lighter</p>
                    </div>
                </div>
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
                    Get Started
                </button>
                <div style={styles.footer}>
                    <p>Talktome - Your AI Companion</p>
                </div>
            </div>
            
        </div>
    );
}
