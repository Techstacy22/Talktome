import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Send, ChevronLeft, AlertTriangle, Sparkles, Network, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';
import { saveConversation, saveMood, getConversations, getJournalEntries } from '../utils/localStorage';

export default function Talkspace() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const messagesEndRef = useRef(null);
  const graphRef = useRef();

  const emotionColors = {
    'Anxiety': '#f6ad55',
    'Sadness': '#63b3ed',
    'Anger': '#fc8181',
    'Joy': '#68d391',
    'Confusion': '#b794f4',
    'Neutral': '#a0aec0'
  };

  // Emotion detection keywords
  const emotions = {
    anxiety: {
      keywords: ['worried', 'anxious', 'stressed', 'nervous', 'panic', 'overwhelmed', 'scared', 'fear'],
      color: '#f6ad55',
      label: 'Anxiety'
    },
    sadness: {
      keywords: ['sad', 'depressed', 'down', 'lonely', 'hopeless', 'empty', 'crying', 'hurt'],
      color: '#63b3ed',
      label: 'Sadness'
    },
    anger: {
      keywords: ['angry', 'frustrated', 'mad', 'annoyed', 'irritated', 'furious', 'rage'],
      color: '#fc8181',
      label: 'Anger'
    },
    joy: {
      keywords: ['happy', 'excited', 'grateful', 'content', 'peaceful', 'good', 'great', 'amazing'],
      color: '#68d391',
      label: 'Joy'
    },
    confusion: {
      keywords: ['confused', 'lost', 'uncertain', 'unsure', 'stuck', 'don\'t know', 'unclear'],
      color: '#b794f4',
      label: 'Confusion'
    }
  };

  // Crisis keywords
  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self-harm', 'no point living', 'want to die'];

  // AI response patterns
  const aiResponses = {
    greeting: [
      "Hi there. I'm here to listen and help you explore what's on your mind. What's been weighing on you lately?",
      "Welcome to your safe space. Take a moment to breathe. When you're ready, tell me what's going on in your world.",
      "Hello. I'm glad you're here. What thoughts or feelings would you like to explore today?"
    ],
    anxiety: [
      "I hear that you're feeling anxious. That tension in your body and racing thoughts - they're real and valid. What specifically is triggering these feelings?",
      "Anxiety can feel overwhelming, but you're not alone in this. Let's slow down together. Can you describe what the anxiety feels like in your body?",
      "It sounds like worry is taking up a lot of space right now. What's the main thing your mind keeps returning to?"
    ],
    sadness: [
      "I'm sorry you're feeling this way. Sadness often comes when something important to us is hurting. What do you think is at the root of this feeling?",
      "It takes courage to acknowledge when we're sad. I'm here with you. Can you tell me more about when these feelings started?",
      "That heaviness you're describing - I want you to know it's okay to feel it. What would help you feel even a little lighter right now?"
    ],
    anger: [
      "It sounds like something has really upset you. Anger often protects us from deeper feelings. What's underneath this anger for you?",
      "Your frustration is completely valid. Let's explore what's driving it. What happened that sparked these feelings?",
      "I can sense the intensity of what you're feeling. Sometimes anger is a messenger. What is it trying to tell you?"
    ],
    joy: [
      "It's wonderful to hear you're feeling positive! What's contributing to this good energy?",
      "I love that you're experiencing joy. Let's capture this moment. What made today special?",
      "That happiness you're feeling - it's worth celebrating. What else in your life brings you this kind of peace?"
    ],
    confusion: [
      "Feeling uncertain is uncomfortable, but it's also where growth happens. What decision or situation is causing this confusion?",
      "Being stuck can feel frustrating. Let's untangle this together. What are the different parts of what you're trying to figure out?",
      "Not knowing is okay. Sometimes clarity comes from exploring. What would help you see things more clearly?"
    ],
    deepening: [
      "Tell me more about that. What comes up for you when you think about it?",
      "That's really insightful. How long have you been carrying this feeling?",
      "I'm curious - when you imagine this situation resolved, what does that look like?",
      "What would you say to a friend going through the same thing?",
      "Where do you feel this emotion in your body right now?"
    ],
    patterns: [
      "I notice this theme coming up again. Do you see a pattern here?",
      "It sounds like this connects to something deeper. What do you think is at the core?",
      "This reminds me of something you mentioned earlier. Do you see a connection?",
      "I'm noticing a thread here. What belief about yourself might be underneath this?"
    ],
    validation: [
      "That makes complete sense given what you've been through.",
      "Your feelings are valid. Anyone in your situation would feel similarly.",
      "Thank you for sharing that with me. It takes courage to be this open.",
      "I hear you. What you're experiencing is real and it matters."
    ]
  };

  // Load existing data for thought map on session start
  useEffect(() => {
    if (sessionStarted) {
      loadExistingThoughts();
    }
  }, [sessionStarted]);

  const loadExistingThoughts = () => {
    const conversations = getConversations();
    const journals = getJournalEntries();

    const nodes = [];
    const links = [];
    const keywords = {};

    // Process past conversations
    conversations.forEach((conv, convIndex) => {
      conv.messages
        .filter(m => m.sender === 'user')
        .forEach((msg, msgIndex) => {
          const emotion = detectEmotionLabel(msg.text);
          const node = {
            id: `past-${convIndex}-${msgIndex}`,
            text: msg.text.substring(0, 60) + (msg.text.length > 60 ? '...' : ''),
            fullText: msg.text,
            emotion: emotion || 'Neutral',
            color: emotionColors[emotion] || emotionColors['Neutral'],
            source: 'past',
            size: 6
          };
          nodes.push(node);

          const words = extractKeywords(msg.text);
          words.forEach(word => {
            if (!keywords[word]) keywords[word] = [];
            keywords[word].push(node.id);
          });
        });
    });

    // Process journals
    journals.forEach((entry, index) => {
      const emotion = entry.mood?.label || detectEmotionLabel(entry.content) || 'Neutral';
      const node = {
        id: `journal-${index}`,
        text: entry.content.substring(0, 60) + (entry.content.length > 60 ? '...' : ''),
        fullText: entry.content,
        emotion,
        color: emotionColors[emotion] || emotionColors['Neutral'],
        source: 'journal',
        size: 6
      };
      nodes.push(node);

      const words = extractKeywords(entry.content);
      words.forEach(word => {
        if (!keywords[word]) keywords[word] = [];
        keywords[word].push(node.id);
      });
    });

    // Create links between related thoughts
    Object.values(keywords).forEach(nodeIds => {
      if (nodeIds.length > 1) {
        for (let i = 0; i < nodeIds.length - 1; i++) {
          for (let j = i + 1; j < nodeIds.length; j++) {
            const existingLink = links.find(l =>
              (l.source === nodeIds[i] && l.target === nodeIds[j]) ||
              (l.source === nodeIds[j] && l.target === nodeIds[i])
            );
            if (!existingLink) {
              links.push({ source: nodeIds[i], target: nodeIds[j] });
            }
          }
        }
      }
    });

    setGraphData({ nodes, links });
  };

  const detectEmotionLabel = (text) => {
    const lowerText = text.toLowerCase();
    for (const [, emotionData] of Object.entries(emotions)) {
      if (emotionData.keywords.some(keyword => lowerText.includes(keyword))) {
        return emotionData.label;
      }
    }
    return null;
  };

  const extractKeywords = (text) => {
    const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
      'this', 'that', 'these', 'those', 'and', 'but', 'or', 'so', 'because',
      'if', 'when', 'where', 'what', 'which', 'who', 'how', 'to', 'from', 'in',
      'on', 'at', 'for', 'with', 'about', 'of', 'by', 'as', 'not', 'just', 'like',
      'really', 'very', 'can', 'get', 'got', 'feel', 'feeling', 'think', 'know'];

    const words = text.toLowerCase()
      .replace(/[^a-zA-Z\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));

    return [...new Set(words)];
  };

  // Add new thought to graph in real-time
  const addThoughtToGraph = (message) => {
    const emotion = detectEmotionLabel(message);
    const newNode = {
      id: `current-${Date.now()}`,
      text: message.substring(0, 60) + (message.length > 60 ? '...' : ''),
      fullText: message,
      emotion: emotion || 'Neutral',
      color: emotionColors[emotion] || emotionColors['Neutral'],
      source: 'current',
      size: 10 // Larger for current session
    };

    const newKeywords = extractKeywords(message);

    setGraphData(prev => {
      const newNodes = [...prev.nodes, newNode];
      const newLinks = [...prev.links];

      // Find connections to existing nodes
      prev.nodes.forEach(existingNode => {
        const existingKeywords = extractKeywords(existingNode.fullText);
        const hasCommon = newKeywords.some(k => existingKeywords.includes(k));
        if (hasCommon) {
          newLinks.push({ source: newNode.id, target: existingNode.id });
        }
      });

      return { nodes: newNodes, links: newLinks };
    });
  };

  // Detect emotion from message
  const detectEmotion = (text) => {
    const lowerText = text.toLowerCase();

    // Check for crisis first
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return { type: 'crisis', color: '#e53e3e', label: 'Crisis' };
    }

    // Check each emotion
    for (const [emotionType, emotionData] of Object.entries(emotions)) {
      if (emotionData.keywords.some(keyword => lowerText.includes(keyword))) {
        return { type: emotionType, ...emotionData };
      }
    }

    return null;
  };

  // Generate AI response
  const generateResponse = (userMessage, messageHistory) => {
    const emotion = detectEmotion(userMessage);
    setDetectedEmotion(emotion);

    if (emotion?.type === 'crisis') {
      setShowCrisisModal(true);
      return "I'm really concerned about what you've shared. You're not alone, and there are people who want to help. Please reach out to a crisis line - you matter and your life has value.";
    }

    if (messageHistory.length === 0) {
      return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
    }

    const messageCount = messageHistory.filter(m => m.sender === 'user').length;

    if (messageCount % 3 === 0 && messageCount > 0) {
      const validation = aiResponses.validation[Math.floor(Math.random() * aiResponses.validation.length)];
      const followUp = getEmotionResponse(emotion);
      return `${validation} ${followUp}`;
    }

    if (messageCount > 4 && Math.random() > 0.6) {
      return aiResponses.patterns[Math.floor(Math.random() * aiResponses.patterns.length)];
    }

    if (emotion) {
      return getEmotionResponse(emotion);
    }

    return aiResponses.deepening[Math.floor(Math.random() * aiResponses.deepening.length)];
  };

  const getEmotionResponse = (emotion) => {
    if (!emotion || emotion.type === 'crisis') return aiResponses.deepening[0];
    const responses = aiResponses[emotion.type];
    if (responses) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    return aiResponses.deepening[Math.floor(Math.random() * aiResponses.deepening.length)];
  };

  // Send message
  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    addThoughtToGraph(inputMessage);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiText = generateResponse(inputMessage, messages);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiText,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  // Start session
  const startSession = () => {
    setSessionStarted(true);
    const greeting = {
      id: Date.now(),
      text: aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)],
      sender: 'ai',
      timestamp: new Date().toISOString()
    };
    setMessages([greeting]);
  };

  // End session
  const endSession = () => {
    if (messages.length > 1) {
      const detectedEmotions = messages
        .filter(m => m.sender === 'user')
        .map(m => detectEmotion(m.text)?.label)
        .filter(Boolean);

      saveConversation(messages, detectedEmotions, []);

      if (detectedEmotion) {
        saveMood(
          detectedEmotion.type === 'joy' ? 8 : detectedEmotion.type === 'sadness' ? 3 : 5,
          detectedEmotion.label
        );
      }
    }
    setMessages([]);
    setGraphData({ nodes: [], links: [] });
    setSessionStarted(false);
    setDetectedEmotion(null);
    setSelectedNode(null);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(2.5, 1000);
    }
  }, []);

  const handleZoomIn = () => {
    if (graphRef.current) graphRef.current.zoom(graphRef.current.zoom() * 1.5, 300);
  };

  const handleZoomOut = () => {
    if (graphRef.current) graphRef.current.zoom(graphRef.current.zoom() / 1.5, 300);
  };

  const handleReset = () => {
    if (graphRef.current) graphRef.current.zoomToFit(400);
    setSelectedNode(null);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    welcomeCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '32px',
      padding: '60px 50px',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)'
    },
    welcomeIcon: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 30px'
    },
    welcomeTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '15px'
    },
    welcomeText: {
      fontSize: '1.1rem',
      color: '#4a5568',
      lineHeight: '1.7',
      marginBottom: '40px'
    },
    startButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      padding: '18px 50px',
      fontSize: '1.2rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
      transition: 'all 0.3s ease'
    },
    mainLayout: {
      display: 'flex',
      gap: '20px',
      width: '100%',
      maxWidth: '1600px',
      height: '85vh'
    },
    chatContainer: {
      background: 'white',
      borderRadius: '24px',
      flex: '1',
      minWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden'
    },
    mapContainer: {
      background: 'white',
      borderRadius: '24px',
      flex: '1',
      minWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
      position: 'relative'
    },
    mapHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    mapTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    mapControls: {
      display: 'flex',
      gap: '8px'
    },
    mapControlBtn: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      borderRadius: '8px',
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    },
    graphArea: {
      flex: 1,
      position: 'relative',
      background: '#f8fafc'
    },
    legend: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '12px',
      padding: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 10,
      fontSize: '0.8rem'
    },
    legendTitle: {
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '8px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px',
      color: '#4a5568'
    },
    legendDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%'
    },
    nodeDetails: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '12px',
      padding: '15px',
      maxWidth: '250px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 10
    },
    chatHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px 25px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    backButton: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      borderRadius: '10px',
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    },
    headerTitle: {
      fontSize: '1.3rem',
      fontWeight: '600'
    },
    emotionBadge: {
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600'
    },
    messagesArea: {
      flex: 1,
      overflowY: 'auto',
      padding: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: '#f8fafc'
    },
    messageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    userMessage: {
      alignSelf: 'flex-end',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '14px 20px',
      borderRadius: '20px 20px 4px 20px',
      maxWidth: '85%',
      fontSize: '1rem',
      lineHeight: '1.5',
      boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
    },
    aiMessage: {
      alignSelf: 'flex-start',
      background: 'white',
      color: '#2d3748',
      padding: '14px 20px',
      borderRadius: '20px 20px 20px 4px',
      maxWidth: '85%',
      fontSize: '1rem',
      lineHeight: '1.6',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    },
    typingIndicator: {
      alignSelf: 'flex-start',
      background: 'white',
      padding: '14px 20px',
      borderRadius: '20px 20px 20px 4px',
      display: 'flex',
      gap: '6px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
    },
    typingDot: {
      width: '8px',
      height: '8px',
      background: '#667eea',
      borderRadius: '50%',
      animation: 'bounce 1.4s infinite ease-in-out'
    },
    inputArea: {
      borderTop: '1px solid #e2e8f0',
      padding: '20px 25px',
      background: 'white',
      display: 'flex',
      gap: '15px',
      alignItems: 'flex-end'
    },
    textInput: {
      flex: 1,
      border: '2px solid #e2e8f0',
      borderRadius: '16px',
      padding: '14px 20px',
      fontSize: '1rem',
      fontFamily: 'inherit',
      resize: 'none',
      minHeight: '52px',
      maxHeight: '150px',
      outline: 'none',
      transition: 'border-color 0.3s ease'
    },
    sendButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '14px',
      padding: '14px 20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s ease'
    },
    crisisModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    crisisCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '40px',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center'
    },
    crisisIcon: {
      width: '70px',
      height: '70px',
      background: '#fed7d7',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 25px'
    },
    crisisTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#c53030',
      marginBottom: '15px'
    },
    crisisText: {
      color: '#4a5568',
      lineHeight: '1.6',
      marginBottom: '25px'
    },
    hotline: {
      background: '#f7fafc',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '25px'
    },
    hotlineNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#667eea',
      marginBottom: '5px'
    },
    closeButton: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '14px 30px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    emptyMap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: '#a0aec0',
      textAlign: 'center',
      padding: '20px'
    }
  };

  // Welcome screen
  if (!sessionStarted) {
    return (
      <div style={styles.container}>
        <div style={styles.welcomeCard}>
          <div style={styles.welcomeIcon}>
            <Sparkles size={40} color="white" />
          </div>
          <h1 style={styles.welcomeTitle}>Welcome to TalkSpace</h1>
          <p style={styles.welcomeText}>
            This is your safe space to explore your thoughts and feelings.
            As you talk, watch your thoughts appear on the mind map -
            seeing connections you might not notice on your own.
            <br /><br />
            <strong>Everything you share stays private.</strong>
          </p>
          <button
            style={styles.startButton}
            onClick={startSession}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Start Talking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainLayout}>
        {/* Chat Section */}
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <div style={styles.headerLeft}>
              <button style={styles.backButton} onClick={endSession}>
                <ChevronLeft size={20} color="white" />
              </button>
              <div>
                <div style={styles.headerTitle}>TalkSpace</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                  Your thinking partner
                </div>
              </div>
            </div>
            {detectedEmotion && (
              <div style={{
                ...styles.emotionBadge,
                background: detectedEmotion.color + '33',
                color: detectedEmotion.color
              }}>
                {detectedEmotion.label}
              </div>
            )}
          </div>

          <div style={styles.messagesArea}>
            {messages.map((message) => (
              <div key={message.id} style={styles.messageWrapper}>
                <div style={message.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={styles.typingIndicator}>
                <div style={{ ...styles.typingDot, animationDelay: '0s' }} />
                <div style={{ ...styles.typingDot, animationDelay: '0.2s' }} />
                <div style={{ ...styles.typingDot, animationDelay: '0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputArea}>
            <textarea
              style={styles.textInput}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              placeholder="Share what's on your mind..."
              rows={1}
            />
            <button
              style={styles.sendButton}
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Send size={22} />
            </button>
          </div>
        </div>

        {/* Mind Map Section */}
        <div style={styles.mapContainer}>
          <div style={styles.mapHeader}>
            <div style={styles.mapTitle}>
              <Network size={20} />
              Mind Map
            </div>
            <div style={styles.mapControls}>
              <button style={styles.mapControlBtn} onClick={handleZoomIn}>
                <ZoomIn size={18} color="white" />
              </button>
              <button style={styles.mapControlBtn} onClick={handleZoomOut}>
                <ZoomOut size={18} color="white" />
              </button>
              <button style={styles.mapControlBtn} onClick={handleReset}>
                <RotateCcw size={18} color="white" />
              </button>
            </div>
          </div>

          <div style={styles.graphArea}>
            {graphData.nodes.length === 0 ? (
              <div style={styles.emptyMap}>
                <Network size={50} />
                <p style={{ marginTop: '15px' }}>
                  Your thoughts will appear here as you talk.
                  <br />Watch patterns emerge in real-time.
                </p>
              </div>
            ) : (
              <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                nodeLabel={node => node.text}
                nodeColor={node => node.color}
                nodeVal={node => node.size || 8}
                linkColor={() => '#e2e8f0'}
                linkWidth={1.5}
                onNodeClick={handleNodeClick}
                nodeCanvasObject={(node, ctx) => {
                  const size = node.size || 8;
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                  ctx.fillStyle = node.color;
                  ctx.fill();
                  if (node.source === 'current') {
                    ctx.strokeStyle = '#2d3748';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                  }
                }}
                cooldownTicks={100}
                d3AlphaDecay={0.02}
                d3VelocityDecay={0.3}
              />
            )}

            {/* Legend */}
            <div style={styles.legend}>
              <div style={styles.legendTitle}>Emotions</div>
              {Object.entries(emotionColors).slice(0, 5).map(([emotion, color]) => (
                <div key={emotion} style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, background: color }} />
                  {emotion}
                </div>
              ))}
            </div>

            {/* Selected Node Details */}
            {selectedNode && (
              <div style={styles.nodeDetails}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: '#2d3748' }}>
                  {selectedNode.emotion}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: '1.5' }}>
                  {selectedNode.fullText}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a0aec0', marginTop: '10px' }}>
                  {selectedNode.source === 'current' ? 'Current session' :
                   selectedNode.source === 'journal' ? 'From journal' : 'Past conversation'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div style={styles.crisisModal}>
          <div style={styles.crisisCard}>
            <div style={styles.crisisIcon}>
              <AlertTriangle size={35} color="#c53030" />
            </div>
            <h2 style={styles.crisisTitle}>You're Not Alone</h2>
            <p style={styles.crisisText}>
              I'm concerned about what you've shared. Please know that you matter,
              and there are people who want to help you through this.
            </p>
            <div style={styles.hotline}>
              <div style={styles.hotlineNumber}>988</div>
              <div style={{ color: '#4a5568' }}>
                Suicide & Crisis Lifeline (24/7)
              </div>
            </div>
            <p style={{ color: '#718096', fontSize: '0.95rem', marginBottom: '20px' }}>
              Call or text 988 to speak with someone who cares.
            </p>
            <button style={styles.closeButton} onClick={() => setShowCrisisModal(false)}>
              Continue Conversation
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
