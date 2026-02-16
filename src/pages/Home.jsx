import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, BookOpen, TrendingUp, Users, Heart,  Brain, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    // Hero Section
    hero: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '80px 20px 100px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    heroSubtitle: {
      fontSize: '1.4rem',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '40px',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto 40px'
    },
    heroButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    primaryButton: {
      background: 'white',
      color: '#667eea',
      border: 'none',
      borderRadius: '14px',
      padding: '18px 40px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    secondaryButton: {
      background: 'transparent',
      color: 'white',
      border: '2px solid rgba(255,255,255,0.5)',
      borderRadius: '14px',
      padding: '16px 35px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    // Features Section
    features: {
      padding: '80px 20px',
      background: '#f8fafc'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      textAlign: 'center',
      marginBottom: '15px'
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      color: '#718096',
      textAlign: 'center',
      marginBottom: '60px',
      maxWidth: '600px',
      margin: '0 auto 60px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featureCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '35px 30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer'
    },
    featureIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    featureTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '12px'
    },
    featureDescription: {
      fontSize: '1rem',
      color: '#718096',
      lineHeight: '1.6'
    },
    // How It Works Section
    howItWorks: {
      padding: '80px 20px',
      background: 'white'
    },
    stepsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      flexWrap: 'wrap',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    step: {
      textAlign: 'center',
      maxWidth: '280px'
    },
    stepNumber: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px'
    },
    stepTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '10px'
    },
    stepDescription: {
      fontSize: '1rem',
      color: '#718096',
      lineHeight: '1.6'
    },
    // Stats Section
    stats: {
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '80px',
      flexWrap: 'wrap',
      maxWidth: '900px',
      margin: '0 auto'
    },
    stat: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '5px'
    },
    statLabel: {
      fontSize: '1rem',
      color: 'rgba(255,255,255,0.8)'
    },
  
    // CTA Section
    cta: {
      padding: '80px 20px',
      background: 'white',
      textAlign: 'center'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '20px'
    },
    ctaText: {
      fontSize: '1.2rem',
      color: '#718096',
      marginBottom: '40px',
      maxWidth: '500px',
      margin: '0 auto 40px'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '14px',
      padding: '20px 50px',
      fontSize: '1.2rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
      transition: 'transform 0.2s'
    },
  
};

  const features = [
    {
      icon: <MessageCircle size={28} color="white" />,
      color: '#667eea',
      title: 'Talk It Out',
      description: 'Have meaningful conversations with an AI that listens, asks the right questions, and helps you understand your thoughts.',
      link: '/talkspace'
    },
    {
      icon: <Brain size={28} color="white" />,
      color: '#764ba2',
      title: 'See Your Mind',
      description: 'Watch your thoughts appear as an interactive mind map in real-time, revealing patterns and connections.',
      link: '/talkspace'
    },
    {
      icon: <BookOpen size={28} color="white" />,
      color: '#68d391',
      title: 'Private Journal',
      description: 'Write freely in your personal space. Track your mood, add tags, and reflect with guided prompts.',
      link: '/journal'
    },
    {
      icon: <TrendingUp size={28} color="white" />,
      color: '#f6ad55',
      title: 'Track Progress',
      description: 'See your emotional journey over time with beautiful charts and discover insights about your patterns.',
      link: '/dashboard'
    },
    {
      icon: <Users size={28} color="white" />,
      color: '#fc8181',
      title: 'Find Support',
      description: 'Connect with licensed therapists who specialize in what you need. You don\'t have to do this alone.',
      link: '/therapists'
    },
    {
      icon: <Sparkles size={28} color="white" />,
      color: '#b794f4',
      title: 'Daily Affirmations',
      description: 'Start each day with personalized affirmations that uplift and inspire your journey.',
      link: '/affirmation'
    }
  ];

  return (
    <div style={styles.container}>
  

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Your Mind Deserves to Be Heard</h1>
          <p style={styles.heroSubtitle}>
            TalkToMe is your safe space to explore thoughts, discover patterns,
            and find clarity. Talk, journal, and visualize your inner world.
          </p>
          <div style={styles.heroButtons}>
            <button
              style={styles.primaryButton}
              onClick={() => navigate('/talkspace')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
              }}
            >
              <MessageCircle size={22} />
              Start Talking
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => navigate('/journal')}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.borderColor = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
            >
              Write in Journal
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Everything You Need for Mental Wellness</h2>
        <p style={styles.sectionSubtitle}>
          Powerful tools designed to help you understand yourself better
        </p>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={styles.featureCard}
              onClick={() => navigate(feature.link)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{ ...styles.featureIcon, background: feature.color }}>
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <p style={styles.sectionSubtitle}>
          Three simple steps to start your journey
        </p>
        <div style={styles.stepsContainer}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>Share Your Thoughts</h3>
            <p style={styles.stepDescription}>
              Start a conversation or write in your journal. Express whatever's on your mind.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>Discover Patterns</h3>
            <p style={styles.stepDescription}>
              Watch as your thoughts are visualized and patterns emerge that you might not see on your own.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>Grow & Heal</h3>
            <p style={styles.stepDescription}>
              Use insights to understand yourself better. Connect with professionals when you're ready.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.statsContainer}>
          <div style={styles.stat}>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>Private & Secure</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>24/7</div>
            <div style={styles.statLabel}>Always Available</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>Free</div>
            <div style={styles.statLabel}>No Cost to Use</div>
          </div>
        </div>
      </section>

    
      {/* CTA Section */}
      <section style={styles.cta}>
        <Heart size={50} color="#667eea" style={{ marginBottom: '20px' }} />
        <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
        <p style={styles.ctaText}>
          Your thoughts matter. Your feelings are valid. Take the first step today.
        </p>
        <button
          style={styles.ctaButton}
          onClick={() => navigate('/AuthPage')}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Begin Now
        </button>
      </section>
    </div>
  );
}
