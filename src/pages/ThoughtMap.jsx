import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, Sparkles, MessageCircle } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';
import { getConversations, getJournalEntries, saveThoughtMap } from '../utils/localStorage';

export default function ThoughtMap() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const graphRef = useRef();

  const emotionColors = useMemo(() => ({
    'Anxiety': '#f6ad55',
    'Sadness': '#63b3ed',
    'Anger': '#fc8181',
    'Joy': '#68d391',
    'Confusion': '#b794f4',
    'Neutral': '#a0aec0'
  }), []);

  const loadThoughtData = useCallback(() => {
    const conversations = getConversations();
    const journals = getJournalEntries();

    const nodes = [];
    const links = [];
    const keywords = {};

    // Process conversations
    conversations.forEach((conv, convIndex) => {
      conv.messages
        .filter(m => m.sender === 'user')
        .forEach((msg, msgIndex) => {
          const emotion = detectEmotion(msg.text);
          const node = {
            id: `conv-${convIndex}-${msgIndex}`,
            text: msg.text.substring(0, 80) + (msg.text.length > 80 ? '...' : ''),
            fullText: msg.text,
            type: 'thought',
            emotion: emotion || 'Neutral',
            color: emotionColors[emotion] || emotionColors['Neutral'],
            source: 'conversation',
            timestamp: msg.timestamp
          };
          nodes.push(node);

          // Extract keywords for linking
          const words = extractKeywords(msg.text);
          words.forEach(word => {
            if (!keywords[word]) keywords[word] = [];
            keywords[word].push(node.id);
          });
        });
    });

    // Process journal entries
    journals.forEach((entry, index) => {
      const emotion = entry.mood?.label || detectEmotion(entry.content) || 'Neutral';
      const node = {
        id: `journal-${index}`,
        text: entry.content.substring(0, 80) + (entry.content.length > 80 ? '...' : ''),
        fullText: entry.content,
        type: 'journal',
        emotion,
        color: emotionColors[emotion] || emotionColors['Neutral'],
        source: 'journal',
        timestamp: entry.createdAt
      };
      nodes.push(node);

      // Extract keywords for linking
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
            // Avoid duplicate links
            const existingLink = links.find(l =>
              (l.source === nodeIds[i] && l.target === nodeIds[j]) ||
              (l.source === nodeIds[j] && l.target === nodeIds[i])
            );
            if (!existingLink) {
              links.push({
                source: nodeIds[i],
                target: nodeIds[j],
                value: 1
              });
            }
          }
        }
      }
    });

    // Detect patterns
    detectPatterns(nodes, links);

    setGraphData({ nodes, links });

    if (nodes.length > 0) {
      saveThoughtMap(nodes, links);
    }
  }, [emotionColors]);

  useEffect(() => {
    loadThoughtData();
  }, [loadThoughtData]);

  const detectEmotion = (text) => {
    const lowerText = text.toLowerCase();
    const emotionKeywords = {
      'Anxiety': ['worried', 'anxious', 'stressed', 'nervous', 'panic', 'overwhelmed'],
      'Sadness': ['sad', 'depressed', 'down', 'lonely', 'hopeless', 'empty'],
      'Anger': ['angry', 'frustrated', 'mad', 'annoyed', 'irritated'],
      'Joy': ['happy', 'excited', 'grateful', 'content', 'peaceful', 'good'],
      'Confusion': ['confused', 'lost', 'uncertain', 'unsure', 'stuck']
    };

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return emotion;
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

  const detectPatterns = (nodes, links) => {
    // Mark nodes that are highly connected (potential patterns)
    const connectionCount = {};
    links.forEach(link => {
      connectionCount[link.source] = (connectionCount[link.source] || 0) + 1;
      connectionCount[link.target] = (connectionCount[link.target] || 0) + 1;
    });

    nodes.forEach(node => {
      const connections = connectionCount[node.id] || 0;
      if (connections >= 3) {
        node.isPattern = true;
        node.patternType = 'recurring';
      }
    });
  };

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    // Center on node
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(2, 1000);
    }
  }, []);

  const handleZoomIn = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() * 1.5, 300);
    }
  };

  const handleZoomOut = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() / 1.5, 300);
    }
  };

  const handleReset = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
    setSelectedNode(null);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      padding: '30px 40px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    controls: {
      display: 'flex',
      gap: '10px'
    },
    controlButton: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      borderRadius: '12px',
      padding: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    graphContainer: {
      background: 'white',
      margin: '0 20px 20px',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      height: 'calc(100vh - 150px)',
      position: 'relative'
    },
    legend: {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '14px',
      padding: '18px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      zIndex: 10
    },
    legendTitle: {
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '12px',
      fontSize: '0.95rem'
    },
    legendItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.9rem',
      color: '#4a5568'
    },
    legendDot: {
      width: '14px',
      height: '14px',
      borderRadius: '50%'
    },
    nodeDetails: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '16px',
      padding: '22px',
      maxWidth: '350px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      zIndex: 10
    },
    nodeTitle: {
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    nodeEmotion: {
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    nodeText: {
      color: '#4a5568',
      lineHeight: '1.6',
      fontSize: '0.95rem'
    },
    nodeSource: {
      marginTop: '15px',
      fontSize: '0.85rem',
      color: '#a0aec0'
    },
    intro: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#718096',
      zIndex: 5
    },
    introIcon: {
      marginBottom: '20px'
    },
    introTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '12px'
    },
    introText: {
      lineHeight: '1.6',
      maxWidth: '400px'
    },
    startButton: {
      marginTop: '25px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '14px 30px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Network size={35} />
          Thought Map
        </h1>
        <div style={styles.controls}>
          <button
            style={styles.controlButton}
            onClick={handleZoomIn}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            <ZoomIn size={22} color="white" />
          </button>
          <button
            style={styles.controlButton}
            onClick={handleZoomOut}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            <ZoomOut size={22} color="white" />
          </button>
          <button
            style={styles.controlButton}
            onClick={handleReset}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            <RotateCcw size={22} color="white" />
          </button>
        </div>
      </div>

      <div style={styles.graphContainer}>
        {graphData.nodes.length === 0 ? (
          <div style={styles.intro}>
            <div style={styles.introIcon}>
              <Network size={70} color="#cbd5e0" />
            </div>
            <h2 style={styles.introTitle}>Your Thought Map is Empty</h2>
            <p style={styles.introText}>
              Start conversations or write journal entries to see your thoughts
              visualized as an interactive map. Watch patterns emerge as you explore
              your mind.
            </p>
            <button
              style={styles.startButton}
              onClick={() => window.location.href = '/talkspace'}
            >
              <MessageCircle size={18} style={{ marginRight: '8px', display: 'inline' }} />
              Start a Conversation
            </button>
          </div>
        ) : (
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeLabel={node => node.text}
            nodeColor={node => node.color}
            nodeVal={node => node.isPattern ? 12 : 8}
            linkColor={() => '#e2e8f0'}
            linkWidth={1.5}
            onNodeClick={handleNodeClick}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const size = node.isPattern ? 12 : 8;

              // Draw node circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
              ctx.fillStyle = node.color;
              ctx.fill();

              // Draw border for pattern nodes
              if (node.isPattern) {
                ctx.strokeStyle = '#2d3748';
                ctx.lineWidth = 2;
                ctx.stroke();
              }

              // Draw label on hover (handled by tooltip)
            }}
            cooldownTicks={100}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
          />
        )}

        {/* Legend */}
        <div style={styles.legend}>
          <div style={styles.legendTitle}>Emotions</div>
          <div style={styles.legendItems}>
            {Object.entries(emotionColors).map(([emotion, color]) => (
              <div key={emotion} style={styles.legendItem}>
                <div style={{ ...styles.legendDot, background: color }} />
                {emotion}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div style={styles.nodeDetails}>
            <div style={styles.nodeTitle}>
              <Sparkles size={18} color="#667eea" />
              Thought Details
              <span style={{
                ...styles.nodeEmotion,
                background: selectedNode.color + '33',
                color: selectedNode.color
              }}>
                {selectedNode.emotion}
              </span>
            </div>
            <div style={styles.nodeText}>
              {selectedNode.fullText}
            </div>
            <div style={styles.nodeSource}>
              Source: {selectedNode.source === 'conversation' ? 'Conversation' : 'Journal'}
              {selectedNode.isPattern && ' • Recurring Pattern'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
