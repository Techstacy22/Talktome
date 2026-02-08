// TalkToMe Pattern Analysis Engine
import { getConversations, getJournalEntries, savePattern } from './localStorage';

// Emotion keywords for detection
const emotionKeywords = {
  anxiety: ['worried', 'anxious', 'stressed', 'nervous', 'panic', 'overwhelmed', 'scared', 'fear', 'tense'],
  sadness: ['sad', 'depressed', 'down', 'lonely', 'hopeless', 'empty', 'crying', 'hurt', 'miserable'],
  anger: ['angry', 'frustrated', 'mad', 'annoyed', 'irritated', 'furious', 'rage', 'hate'],
  joy: ['happy', 'excited', 'grateful', 'content', 'peaceful', 'good', 'great', 'amazing', 'wonderful'],
  confusion: ['confused', 'lost', 'uncertain', 'unsure', 'stuck', 'unclear', 'puzzled']
};

// Cognitive distortion patterns
const cognitivePatterns = {
  catastrophizing: ['worst', 'disaster', 'terrible', 'horrible', 'never going to', 'always bad'],
  blackAndWhite: ['always', 'never', 'everyone', 'no one', 'completely', 'totally', 'nothing'],
  mindReading: ['they think', 'they hate', 'they don\'t like', 'everyone thinks', 'people judge'],
  shouldStatements: ['should', 'must', 'have to', 'need to', 'supposed to', 'ought to'],
  personalization: ['my fault', 'because of me', 'I caused', 'I made them', 'I\'m responsible']
};

// Common themes
const themeKeywords = {
  relationships: ['friend', 'family', 'parent', 'mom', 'dad', 'boyfriend', 'girlfriend', 'partner', 'relationship'],
  work: ['work', 'job', 'boss', 'career', 'office', 'coworker', 'meeting', 'deadline', 'project'],
  school: ['school', 'class', 'teacher', 'homework', 'exam', 'test', 'grade', 'college', 'study'],
  health: ['sick', 'tired', 'sleep', 'energy', 'health', 'body', 'eating', 'exercise'],
  selfWorth: ['worthless', 'not good enough', 'failure', 'loser', 'stupid', 'ugly', 'hate myself']
};

/**
 * Analyze all user data and extract patterns
 */
export const analyzePatterns = () => {
  const conversations = getConversations();
  const journals = getJournalEntries();

  // Combine all user text
  const allText = [];

  conversations.forEach(conv => {
    conv.messages
      .filter(m => m.sender === 'user')
      .forEach(m => allText.push({
        text: m.text,
        timestamp: m.timestamp,
        source: 'conversation'
      }));
  });

  journals.forEach(entry => {
    allText.push({
      text: entry.content,
      timestamp: entry.createdAt,
      source: 'journal'
    });
  });

  const analysis = {
    emotions: detectEmotions(allText),
    themes: detectThemes(allText),
    cognitivePatterns: detectCognitivePatterns(allText),
    timePatterns: analyzeTimePatterns(allText),
    keywords: extractFrequentKeywords(allText),
    insights: []
  };

  // Generate insights
  analysis.insights = generateInsights(analysis);

  // Save detected patterns
  saveDetectedPatterns(analysis);

  return analysis;
};

/**
 * Detect emotions across all text
 */
const detectEmotions = (textEntries) => {
  const emotionCounts = {};

  Object.keys(emotionKeywords).forEach(emotion => {
    emotionCounts[emotion] = 0;
  });

  textEntries.forEach(entry => {
    const lowerText = entry.text.toLowerCase();

    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          emotionCounts[emotion]++;
        }
      });
    });
  });

  // Calculate percentages
  const total = Object.values(emotionCounts).reduce((sum, count) => sum + count, 0) || 1;
  const emotionPercentages = {};

  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    emotionPercentages[emotion] = {
      count,
      percentage: Math.round((count / total) * 100)
    };
  });

  return emotionPercentages;
};

/**
 * Detect recurring themes
 */
const detectThemes = (textEntries) => {
  const themeCounts = {};

  Object.keys(themeKeywords).forEach(theme => {
    themeCounts[theme] = 0;
  });

  textEntries.forEach(entry => {
    const lowerText = entry.text.toLowerCase();

    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          themeCounts[theme]++;
        }
      });
    });
  });

  // Sort by frequency
  const sortedThemes = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count > 0);

  return sortedThemes.map(([theme, count]) => ({ theme, count }));
};

/**
 * Detect cognitive distortion patterns
 */
const detectCognitivePatterns = (textEntries) => {
  const patternCounts = {};

  Object.keys(cognitivePatterns).forEach(pattern => {
    patternCounts[pattern] = 0;
  });

  textEntries.forEach(entry => {
    const lowerText = entry.text.toLowerCase();

    Object.entries(cognitivePatterns).forEach(([pattern, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          patternCounts[pattern]++;
        }
      });
    });
  });

  return Object.entries(patternCounts)
    .filter(([, count]) => count > 0)
    .map(([pattern, count]) => ({ pattern, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Analyze patterns by time (day of week, time of day)
 */
const analyzeTimePatterns = (textEntries) => {
  const dayOfWeekCounts = {
    Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0,
    Thursday: 0, Friday: 0, Saturday: 0
  };

  const timeOfDayCounts = {
    morning: 0,  // 6am - 12pm
    afternoon: 0, // 12pm - 6pm
    evening: 0,   // 6pm - 10pm
    night: 0      // 10pm - 6am
  };

  textEntries.forEach(entry => {
    const date = new Date(entry.timestamp);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[date.getDay()];
    dayOfWeekCounts[dayName]++;

    const hour = date.getHours();
    if (hour >= 6 && hour < 12) timeOfDayCounts.morning++;
    else if (hour >= 12 && hour < 18) timeOfDayCounts.afternoon++;
    else if (hour >= 18 && hour < 22) timeOfDayCounts.evening++;
    else timeOfDayCounts.night++;
  });

  return {
    byDayOfWeek: dayOfWeekCounts,
    byTimeOfDay: timeOfDayCounts
  };
};

/**
 * Extract frequently used keywords
 */
const extractFrequentKeywords = (textEntries) => {
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
    'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
    'this', 'that', 'these', 'those', 'and', 'but', 'or', 'so', 'because',
    'if', 'when', 'where', 'what', 'which', 'who', 'how', 'to', 'from', 'in',
    'on', 'at', 'for', 'with', 'about', 'of', 'by', 'as', 'not', 'just', 'like',
    'really', 'very', 'can', 'get', 'got', 'feel', 'feeling', 'think', 'know',
    'want', 'need', 'going', 'been', 'dont', 'im', 'its', 'ive', 'cant', 'thats'
  ]);

  const wordCounts = {};

  textEntries.forEach(entry => {
    const words = entry.text.toLowerCase()
      .replace(/[^a-zA-Z\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word));

    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  });

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));
};

/**
 * Generate human-readable insights from analysis
 */
const generateInsights = (analysis) => {
  const insights = [];

  // Emotion insights
  const emotionEntries = Object.entries(analysis.emotions)
    .filter(([, data]) => data.count > 0)
    .sort((a, b) => b[1].count - a[1].count);

  if (emotionEntries.length > 0) {
    const [topEmotion, data] = emotionEntries[0];
    if (data.percentage > 40) {
      insights.push({
        type: 'emotion',
        title: `${topEmotion.charAt(0).toUpperCase() + topEmotion.slice(1)} is prominent`,
        description: `${data.percentage}% of your expressions relate to ${topEmotion}. This is a strong pattern worth exploring.`
      });
    }
  }

  // Theme insights
  if (analysis.themes.length > 0) {
    const topTheme = analysis.themes[0];
    insights.push({
      type: 'theme',
      title: `${topTheme.theme.charAt(0).toUpperCase() + topTheme.theme.slice(1)} is on your mind`,
      description: `You've mentioned ${topTheme.theme}-related topics ${topTheme.count} times. This seems important to you.`
    });
  }

  // Cognitive pattern insights
  if (analysis.cognitivePatterns.length > 0) {
    const topPattern = analysis.cognitivePatterns[0];
    const patternDescriptions = {
      catastrophizing: 'You tend to expect the worst. Try challenging these thoughts with evidence.',
      blackAndWhite: 'You may think in extremes. Consider the gray areas and nuances.',
      mindReading: 'You might assume you know what others think. Try asking instead of assuming.',
      shouldStatements: 'You put pressure on yourself with "should" statements. Be kinder to yourself.',
      personalization: 'You may take too much responsibility. Not everything is about you.'
    };

    if (topPattern.count >= 3) {
      insights.push({
        type: 'cognitive',
        title: `Thought pattern detected: ${topPattern.pattern.replace(/([A-Z])/g, ' $1').trim()}`,
        description: patternDescriptions[topPattern.pattern] || 'This is a common thinking pattern worth examining.'
      });
    }
  }

  // Time pattern insights
  const timeData = analysis.timePatterns.byTimeOfDay;
  const maxTime = Object.entries(timeData).sort((a, b) => b[1] - a[1])[0];
  if (maxTime[1] > 0) {
    insights.push({
      type: 'time',
      title: `Most active in the ${maxTime[0]}`,
      description: `You tend to reflect and journal most during the ${maxTime[0]}. This might be when you have the most mental space.`
    });
  }

  return insights;
};

/**
 * Save detected patterns to localStorage
 */
const saveDetectedPatterns = (analysis) => {
  // Save top emotion as pattern
  const emotionEntries = Object.entries(analysis.emotions)
    .filter(([, data]) => data.count > 2);

  emotionEntries.forEach(([emotion, data]) => {
    savePattern('emotion', `Frequent ${emotion} expressions`, data.count);
  });

  // Save top themes as patterns
  analysis.themes.slice(0, 3).forEach(({ theme, count }) => {
    if (count > 2) {
      savePattern('theme', `${theme} is a recurring topic`, count);
    }
  });

  // Save cognitive patterns
  analysis.cognitivePatterns.forEach(({ pattern, count }) => {
    if (count > 2) {
      savePattern('cognitive', `${pattern} thinking pattern`, count);
    }
  });
};

/**
 * Get a summary for the dashboard
 */
export const getPatternSummary = () => {
  const analysis = analyzePatterns();

  return {
    topEmotion: Object.entries(analysis.emotions)
      .sort((a, b) => b[1].count - a[1].count)[0],
    topTheme: analysis.themes[0],
    topCognitivePattern: analysis.cognitivePatterns[0],
    insightCount: analysis.insights.length,
    keywordCloud: analysis.keywords.slice(0, 10)
  };
};
