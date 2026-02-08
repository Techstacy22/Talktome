import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Brain, Heart, Calendar, Target, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getMoods, getJournalEntries, getConversations, getPatterns } from '../utils/localStorage';
import { format, subDays, parseISO } from 'date-fns';

export default function Dashboard() {
  const [moodData, setMoodData] = useState([]);
  const [stats, setStats] = useState({
    totalConversations: 0,
    totalJournalEntries: 0,
    averageMood: 0,
    streakDays: 0
  });
  const [insights, setInsights] = useState([]);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = () => {
    const moods = getMoods(timeRange);
    const journals = getJournalEntries();
    const conversations = getConversations();
    const patterns = getPatterns();

    // Process mood data for chart
    const moodByDay = {};
    for (let i = timeRange - 1; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'MMM dd');
      moodByDay[date] = { date, mood: null, count: 0 };
    }

    moods.forEach(mood => {
      const date = format(parseISO(mood.timestamp), 'MMM dd');
      if (moodByDay[date]) {
        if (moodByDay[date].mood === null) {
          moodByDay[date].mood = mood.score;
          moodByDay[date].count = 1;
        } else {
          moodByDay[date].mood = (moodByDay[date].mood * moodByDay[date].count + mood.score) / (moodByDay[date].count + 1);
          moodByDay[date].count++;
        }
      }
    });

    // Also include journal mood entries
    journals.forEach(entry => {
      if (entry.mood) {
        const date = format(parseISO(entry.createdAt), 'MMM dd');
        if (moodByDay[date]) {
          if (moodByDay[date].mood === null) {
            moodByDay[date].mood = entry.mood.score;
            moodByDay[date].count = 1;
          } else {
            moodByDay[date].mood = (moodByDay[date].mood * moodByDay[date].count + entry.mood.score) / (moodByDay[date].count + 1);
            moodByDay[date].count++;
          }
        }
      }
    });

    setMoodData(Object.values(moodByDay));

    // Calculate stats
    const avgMood = moods.length > 0
      ? moods.reduce((sum, m) => sum + m.score, 0) / moods.length
      : 0;

    // Calculate streak (simplified)
    let streak = 0;
    const today = new Date().toDateString();
    const entriesAndMoods = [...journals, ...moods].sort((a, b) =>
      new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp)
    );

    if (entriesAndMoods.length > 0) {
      const lastDate = new Date(entriesAndMoods[0].createdAt || entriesAndMoods[0].timestamp).toDateString();
      if (lastDate === today) streak = 1;
    }

    setStats({
      totalConversations: conversations.length,
      totalJournalEntries: journals.length,
      averageMood: avgMood,
      streakDays: streak
    });

    // Generate insights
    generateInsights(moods, journals, patterns);
  };

  const generateInsights = (moods, journals, patterns) => {
    const newInsights = [];

    // Mood trend insight
    if (moods.length >= 3) {
      const recentAvg = moods.slice(0, 3).reduce((sum, m) => sum + m.score, 0) / 3;
      const olderAvg = moods.slice(3, 6).reduce((sum, m) => sum + m.score, 0) / (moods.slice(3, 6).length || 1);

      if (recentAvg > olderAvg + 1) {
        newInsights.push({
          icon: TrendingUp,
          color: '#48bb78',
          title: 'Mood Improving',
          text: 'Your mood has been trending upward recently. Keep doing what works!'
        });
      } else if (recentAvg < olderAvg - 1) {
        newInsights.push({
          icon: Heart,
          color: '#fc8181',
          title: 'Check In With Yourself',
          text: 'Your mood has dipped recently. Consider what might be contributing to this.'
        });
      }
    }

    // Journaling insight
    if (journals.length > 0) {
      const recentEntries = journals.filter(j => {
        const daysDiff = (new Date() - new Date(j.createdAt)) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      });

      if (recentEntries.length >= 5) {
        newInsights.push({
          icon: Sparkles,
          color: '#667eea',
          title: 'Consistent Journaling',
          text: `You've written ${recentEntries.length} entries this week. Reflection is powerful!`
        });
      }
    }

    // Pattern insight
    if (patterns.length > 0) {
      const topPattern = patterns.sort((a, b) => b.frequency - a.frequency)[0];
      newInsights.push({
        icon: Brain,
        color: '#9f7aea',
        title: 'Pattern Detected',
        text: `"${topPattern.description}" appears frequently in your thoughts.`
      });
    }

    // Default insight if none generated
    if (newInsights.length === 0) {
      newInsights.push({
        icon: Target,
        color: '#667eea',
        title: 'Keep Going',
        text: 'Continue tracking your thoughts and mood to unlock personalized insights.'
      });
    }

    setInsights(newInsights);
  };

  const getMoodLabel = (score) => {
    if (score >= 8) return 'Great';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Okay';
    if (score >= 2) return 'Low';
    return 'Struggling';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto 30px',
      color: 'white'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1.1rem',
      opacity: 0.9
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '5px'
    },
    statLabel: {
      color: '#718096',
      fontSize: '0.95rem'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '25px'
    },
    chartCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '30px',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)'
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px'
    },
    chartTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#2d3748'
    },
    timeButtons: {
      display: 'flex',
      gap: '8px'
    },
    timeButton: {
      padding: '8px 16px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    timeButtonActive: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    timeButtonInactive: {
      background: '#f7fafc',
      color: '#4a5568'
    },
    insightsCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '30px',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)'
    },
    insightsTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '25px'
    },
    insightsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    },
    insightItem: {
      display: 'flex',
      gap: '15px',
      padding: '18px',
      borderRadius: '14px',
      background: '#f7fafc'
    },
    insightIcon: {
      width: '45px',
      height: '45px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    insightContent: {
      flex: 1
    },
    insightTitle: {
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '4px'
    },
    insightText: {
      color: '#718096',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    },
    emptyChart: {
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#a0aec0',
      flexDirection: 'column',
      gap: '15px'
    },
    '@media (max-width: 900px)': {
      mainGrid: {
        gridTemplateColumns: '1fr'
      }
    }
  };

  // Responsive grid fix
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <BarChart3 size={40} />
          Your Progress
        </h1>
        <p style={styles.subtitle}>
          Track your mental wellness journey
        </p>
      </div>

      <div style={styles.content}>
        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statValue, color: '#667eea' }}>
              {stats.totalConversations}
            </div>
            <div style={styles.statLabel}>Conversations</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statValue, color: '#9f7aea' }}>
              {stats.totalJournalEntries}
            </div>
            <div style={styles.statLabel}>Journal Entries</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statValue, color: '#48bb78' }}>
              {stats.averageMood > 0 ? stats.averageMood.toFixed(1) : '-'}
            </div>
            <div style={styles.statLabel}>Average Mood</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statValue, color: '#ed8936' }}>
              {stats.streakDays}
            </div>
            <div style={styles.statLabel}>Day Streak</div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ ...styles.mainGrid, gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr' }}>
          {/* Mood Chart */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h2 style={styles.chartTitle}>Mood Over Time</h2>
              <div style={styles.timeButtons}>
                {[7, 14, 30].map(days => (
                  <button
                    key={days}
                    style={{
                      ...styles.timeButton,
                      ...(timeRange === days ? styles.timeButtonActive : styles.timeButtonInactive)
                    }}
                    onClick={() => setTimeRange(days)}
                  >
                    {days}d
                  </button>
                ))}
              </div>
            </div>

            {moodData.some(d => d.mood !== null) ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={moodData}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#a0aec0" fontSize={12} />
                  <YAxis domain={[0, 10]} stroke="#a0aec0" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                    }}
                    formatter={(value) => [value ? `${value.toFixed(1)} - ${getMoodLabel(value)}` : 'No data', 'Mood']}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="#667eea"
                    strokeWidth={3}
                    fill="url(#moodGradient)"
                    connectNulls
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={styles.emptyChart}>
                <Calendar size={50} />
                <p>No mood data yet. Start tracking!</p>
              </div>
            )}
          </div>

          {/* Insights */}
          <div style={styles.insightsCard}>
            <h2 style={styles.insightsTitle}>Insights</h2>
            <div style={styles.insightsList}>
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} style={styles.insightItem}>
                    <div style={{
                      ...styles.insightIcon,
                      background: insight.color + '22'
                    }}>
                      <Icon size={22} color={insight.color} />
                    </div>
                    <div style={styles.insightContent}>
                      <div style={styles.insightTitle}>{insight.title}</div>
                      <div style={styles.insightText}>{insight.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
